import NextAuth from 'next-auth';
import { NextAuthConfig } from 'next-auth';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import GoogleProvider from 'next-auth/providers/google';

import { db } from '@/app/_lib/firebase';

export const authConfig: NextAuthConfig = {
  // adapter: FirestoreAdapter(db),
  providers: [
    //from firebase AI
    // CredentialsProvider({
    //   name: 'Credentials',
    //   credentials: {
    //     email: { label: 'Email', type: 'text', placeholder: 'john.doe@example.com' },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   async authorize(credentials, req) {
    //     try {
    //       const { email, password } = credentials;
    //       const user = await firebaseAuth.signInWithEmailAndPassword(email, password);
    //       return user;
    //     } catch (error) {
    //       console.error('Firebase Authentication Error:', error);
    //       return null;
    //     }
    //   },
    // }),
    ////////////
    // Configure your desired authentication providers
    // Example: Email/Password
    // EmailProvider({
    //   server: process.env.EMAIL_SERVER,
    //   from: process.env.EMAIL_FROM,
    // }),
    // Example: Google Sign-In
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.id) {
        return false;
      }

      const userRef = db.collection('users').doc(user.id);
      try {
        await userRef.set(
          {
            id: user.id,
            role: 'member',
            status: 'inactive',
            email: user.email,
            fullName: user.name || profile?.name,
            image: user.image || profile?.picture,
            timestamp: new Date().toISOString(),
          },
          { merge: true },
        );

        return true;
      } catch (error) {
        return false;
      }
    },
    async jwt({ token, user }) {
      // Adding user.id to the token during initial sign-in
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      console.log('Session callback triggered:', session);
      try {
        //@ts-ignore
        const userRef = db.collection('users').doc(token.id);
        const userDoc = await userRef.get();

        if (userDoc.exists) {
          const userData = userDoc.data();
          session.user = {
            ...session.user,
            //@ts-ignore
            id: token.id,
            fullName: userData?.fullName || userData?.name,
            email: userData?.email,
            timestamp: userData?.timestamp,
          };
        } else {
          console.error('User document does not exist.');
        }
      } catch (error) {
        console.error('Error fetching updated user data:', error);
      }

      return session;
    },
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
