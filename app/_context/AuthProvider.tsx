'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => (
  <SessionProvider>{children}</SessionProvider>
);

// import { createContext } from 'react';
// import { auth } from '../_lib/auth';

// const AuthContext = createContext({});

// const AuthProvider = ({ chilren }) => {
//   const session = auth();

//   return <AuthContext.Provider value={{}}>{chilren}</AuthContext.Provider>;
// };
