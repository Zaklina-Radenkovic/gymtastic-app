import NextAuth from 'next-auth';
import { FirestoreAdapter } from '@next-auth/firebase-adapter';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { db } from '@/app/_lib/firebase';
import { getFirestore, collection, addDoc } from 'firebase-admin/firestore';
import GoogleProvider from 'next-auth/providers/google';

export const authConfig = {
  adapter: FirestoreAdapter(db),
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
    async authorized({ auth, request }) {
      return !!auth?.user;
    },
    // async session({ session, token, user }) {
    //   // Add user data to the session object
    //   session.user.id = user.uid;
    //   session.user.email = user.email;
    //   // ... other user data you want to include
    //   return session;
    // },
    // async signIn({ user, account, profile, isNewUser }) {
    //   // Create a new user document in Firestore if it's a new user
    //   if (isNewUser) {
    //     await addDoc(collection(db, 'users'), {
    //       uid: user.uid,
    //       email: user.email,
    //       fullName: user.name,
    //       image: user.image,
    //       role: 'member',
    //       status: 'inactive',
    //       // ... other user data
    //     });
    //   }
    //   return true;
    // },
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
