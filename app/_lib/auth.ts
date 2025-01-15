import NextAuth, { CredentialsSignin } from 'next-auth';
import bcrypt from 'bcryptjs';
import { NextAuthConfig } from 'next-auth';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';

import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import { db, auth as firebaseAuth } from '@/app/_lib/firebase';
import { User } from 'next-auth';
import { AdapterSession, AdapterUser } from 'next-auth/adapters';
import { JWT } from 'next-auth/jwt';
import { signInSchema } from '../_utils/schemas/authSchema';
import { CustomError } from '../_utils/errors';

export const authConfig: NextAuthConfig = {
  adapter: FirestoreAdapter(db),

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {},

      async authorize(
        credentials: Partial<Record<'email' | 'password', string>>,
        req: Request,
      ): Promise<User | null> {
        const { email, password } = signInSchema.parse({
          email: credentials?.email as string,
          password: credentials?.password as string,
        });

        if (!email || !password) {
          throw new CustomError('Email and Password are required');
        }

        try {
          const userRecord = await firebaseAuth.getUserByEmail(email);

          if (!userRecord) {
            throw new CustomError('No user found with this email.');
          }
          // Retrieve the stored hash and compare it with the provided password
          const userDoc = await db
            .collection('users')
            .doc(userRecord.uid)
            .get();

          if (!userDoc.exists) {
            throw new CustomError('User data not found in Firestore.');
          }

          const userData = userDoc.data();

          if (!userData || !userData.passwordHash) {
            throw new CustomError('Invalid credentials.');
          }

          // 3. Verify the provided password against the stored hash
          const isPasswordValid = await bcrypt.compare(
            password as string,
            userData.passwordHash,
          );

          if (!isPasswordValid) {
            throw new CustomError('Email/Password mismatched.');
          }
          // Return user object
          return {
            id: userData.id,
            email: userData.email,
            name: userData.name || userData.fullName || null,
            image: userData.photoURL || null,
            uid: userData.uid,
            //fullName: userData.fullName || userData.name || null,
            timestamp: userData.timestamp || new Date().toISOString(),
            passwordHash: userData.passwordHash,
          };
        } catch (error) {
          // console.error('Error during email/password authentication:', error);

          // throw new Error(error.message || 'Authentication failed.');
          if (error instanceof CustomError) {
            console.error('Custom error:', error.message);
            throw error;
          } else if (error instanceof Error) {
            console.error('Error:', error.message);
            throw new CustomError('Authentication failed.');
          } else {
            console.error('Unknown error:', error);
            throw new CustomError('An unexpected error occurred.');
          }
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, credentials }) {
      // console.log('User:', user);
      // console.log('Profile:', profile);
      if (!user.id) {
        return false;
      }
      if (account?.provider === 'google') {
        try {
          const userRef = db.collection('users').doc(user.id);
          await userRef.set(
            {
              id: user.id,
              role: 'member',
              email: user.email,
              name: user.name || profile?.name,
              image: user.image || profile?.picture,
              timestamp: new Date().toISOString(),
            },
            { merge: true },
          );

          return true;
        } catch (error) {
          console.error('Error during Google sign-in with Firebase:', error);
          return false;
        }
      }

      return true;
    },

    // async signIn({ user, account, profile, credentials }) {
    //   console.log('CREDENTIALS IN SIGNIN CALLBACK ', credentials);
    //   if (!user.id) {
    //     return false;
    //   }

    //   try {
    //     const userRef = firestore().collection('users').doc(user.id);

    //     if (account?.provider === 'credentials') {
    //       const { email, password } = credentials || {};

    //       if (!email || !password) {
    //         console.error('Email or password is missing in credentials');
    //         return false;
    //       }
    //       // Handle email/password sign-in
    //       const userSnapshot = await userRef.get();

    //       if (!userSnapshot.exists) {
    //         // Create user in Firestore if it doesn't exist
    //         await userRef.set({
    //           id: user.id,
    //           email: user.email,
    //           name: user.name || 'Unnamed User' || null,
    //           //image: user.image || null,
    //           role: 'member', // Default role
    //           timestamp: firestore.FieldValue.serverTimestamp(),
    //           passwordHash: null,
    //         });
    //       }

    //       // Optionally: Validate the password (if needed)
    //       // You can compare the provided password with the stored hashed password here
    //       const userData = userSnapshot?.data();
    //       if (!userData || !userData.passwordHash) {
    //         throw new Error('Password hash is missing.');
    //       }
    //       const isValidPassword = await verifyPassword(
    //         password as string,
    //         userData.passwordHash,
    //       );

    //       if (!isValidPassword) {
    //         return false; // Password mismatch
    //       }
    //     } else if (account?.provider === 'google') {
    //       // Handle Google sign-in
    //       const userSnapshot = await userRef.get();

    //       if (!userSnapshot.exists) {
    //         // Create user in Firestore if it doesn't exist
    //         await userRef.set({
    //           id: user.id,
    //           email: user.email,
    //           name: user.name || profile?.name || 'Google User',
    //           //image: user.image || profile?.picture || null,
    //           role: 'member', // Default role
    //           timestamp: firestore.FieldValue.serverTimestamp(),
    //           passwordHash: null,
    //         });
    //       } else {
    //         // Update existing user with the latest data
    //         await userRef.update({
    //           name: user.name || profile?.name,
    //           // image: user.image || profile?.picture,
    //           lastLoginAt: firestore.FieldValue.serverTimestamp(),
    //         });
    //       }
    //     }

    //     return true;
    //   } catch (error) {
    //     console.error('Error in signIn callback:', error);
    //     return false;
    //   }
    // },

    async jwt({ token, user }) {
      console.log('JWT callback:', token);
      console.log('User in JWT callback:', user);
      // Adding user.id to the token during initial sign-in
      if (user) {
        token.id = user.id as string;

        token.email = user.email;
        token.name = user?.name || 'Unknown User';

        token.image = user.image || null;
      }

      return token;
    },

    async session({ session, token, user }) {
      //console.log('Session before modification:', session);

      if (token) {
        session.user = {
          ...session.user,
          id: token.id as string,
          name: token.name ? String(token.name) : 'Unknown User',
          email: token.email || session.user.email || '',
          image: token.image ? String(token.image) : null,
          timestamp: new Date() ?? null,
        };
      }

      try {
        if (token?.id) {
          const userRef = db.collection('users').doc(token.id as string);
          const userDoc = await userRef.get();

          if (userDoc.exists) {
            const userData = userDoc.data();

            session.user = {
              ...session.user,

              id: session.user.id as string,
              name: userData?.name || user?.name || null,
              email: userData?.email || user.email,
              image: userData?.image || user?.image || null,
              timestamp: userData?.timestamp || session.user?.timestamp,
            };
          } else {
            console.error('User document does not exist.');
          }
        }
      } catch (error) {
        console.error('Error fetching updated user data:', error);
      }
      console.log('Session after modification:', session);
      return session;
    },
  },

  events: {
    async signOut(message) {
      const token = 'token' in message ? message.token : null;
      console.log('User signed out:', token);

      if (token && token.sub) {
        try {
          await firebaseAuth.revokeRefreshTokens(token.sub);
          console.log(
            `Refresh tokens for user ${token.sub} have been revoked.`,
          );
        } catch (error) {
          console.error('Error revoking refresh tokens:', error);
        }
      }
    },
  },

  pages: {
    signIn: '/sign-in', // Update with your actual sign-in page
    //error: '/sign-in', // Redirect to sign-in on error
    // newUser: '/',
  },
  session: {
    strategy: 'jwt',
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
