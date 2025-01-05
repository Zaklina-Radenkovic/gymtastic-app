'use server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { db, auth } from '../_lib/firebase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn, signOut } from './auth';

import { AuthError } from 'next-auth';
import { NextResponse } from 'next/server';

//user sign up
export async function signUpAction(formData: {
  get: (arg0: string) => any;
}): Promise<void> {
  const displayName = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  console.log(email, password, displayName);

  if (!email || !password || !displayName) {
    throw new Error('Email, password, and name are required.');
  }

  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof displayName !== 'string'
  ) {
    throw new Error('Invalid input types.');
  }

  try {
    const userRecord = await auth.createUser({
      displayName,
      email,
      password,
    });

    //console.log('Successfully created new user:', userRecord);

    // Hash the password before storing it in Firestore
    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name: userRecord.displayName,
      id: userRecord.uid,
      email: userRecord.email,
      timestamp: new Date().toISOString(),
      image: userRecord.photoURL || null,
      role: 'member',
      passwordHash: hashedPassword,
    };

    await db.collection('users').doc(userRecord.uid).set(userData);
    //console.log('User data written to database:', userData);

    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    });
  } catch (error) {
    //console.error('Error creating new user:', error);
    throw new Error('Failed to create a new user. Please try again.');
  } finally {
    redirect('/');
  }
}

//user sign in
export async function signInWithGoogle() {
  await signIn('google', { redirectTo: '/account' });
}

//user sign in
export async function signInAction(formData: { get: (arg0: string) => any }) {
  try {
    const email = formData.get('email');
    const password = formData.get('password');

    if (!email || !password) {
      throw new Error('Email and password are required.');
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      throw new Error('Invalid input types.');
    }

    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    });
  } catch (error) {
    //console.error('Error:', error);
    // let errorMessage = '';
    // if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
    //   redirect('/');
    //   // window.location.href = '/';
    // } else if (error instanceof AuthError) {
    //   errorMessage = error.message;
    // } else {
    //   errorMessage = (error as any).message;
    // }

    //console.error('Error creating new user:', error);
    throw new Error('Failed to create a new user. Please try again.');
  } finally {
    redirect('/');
  }
}

//updating customer data
export async function updateCustomer(formData: { get: (arg0: string) => any }) {
  const name = formData.get('name');
  const email = formData.get('email');
  const id = formData.get('id');

  const updateData = {
    name,
    email,
    id,
    timestamp: new Date().toISOString(),
  };
  console.log('update user from action ', updateData);

  try {
    const userRef = db.collection('users').doc(id);

    await userRef.update(updateData);

    // // Trigger session refresh on client
    // if (typeof window !== 'undefined') {
    //   const { refreshSession } = await import('@/app/_utils/auth');
    //   await refreshSession();
    // }
  } catch (error) {
    throw new Error('Customer could not be updated');
  }

  revalidatePath(`/customers/${id}/edit`);
}

// export async function updateCustomer(formData: { get: (arg0: string) => any }) {
//   const fullName = formData.get('name');
//   const email = formData.get('email');
//   const id = formData.get('id');

//   const updateData = { fullName, email, id, timestamp: serverTimestamp() };

//   try {
//     const docRef = doc(db, 'users', id);
//     await updateDoc(docRef, updateData);
//   } catch {
//     throw new Error('Customer could not be updated');
//   }

//   revalidatePath(`/customers/${id}/edit`);
// }

export async function setThemeCookies(theme: string) {
  cookies().set('theme', theme, { path: '/', maxAge: 7 * 24 * 60 * 60 });
}

/// upload customers data - one time////
// export const uploadCustomers = async function (
//   collectionKey: string,
//   data: DocumentData[],
// ) {
//   const batch = writeBatch(db);
//   const collectionRef = collection(db, collectionKey);

//   data.forEach((obj) => {
//     const docRef = doc(collectionRef, obj.id);
//     batch.set(docRef, obj);
//   });

//   await batch.commit();
//   console.log('done');
// };

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
