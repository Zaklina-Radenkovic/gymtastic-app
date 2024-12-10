// next-auth.d.ts

import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      // Add other properties you need
    };
  }

  interface User {
    uid: string;
    email: string;
    // Add other properties you need
  }
}
