// next-auth.d.ts

import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultUser {
    firebaseToken?: string;
    user: {
      id: string;
      fullName: string;
      email: string;
      image?: string | null;
      timestamp: Date | null;
      passwordHash: string;
    };
  }

  interface JWT {
    id: string;
    email: string;
    fullName: string;
    image?: string | null;
    timestamp: Date | null;
    passwordHash: string;
  }

  interface User {
    uid: string;
    email: string;
    fullName: string;
    timestamp: Date | null;
    passwordHash: string;
  }
}
