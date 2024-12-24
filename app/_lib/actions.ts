'use server';
import { cookies } from 'next/headers';
import { db, auth } from '../_lib/firebase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from './auth';

//user sign up
export async function signUpAction(formData: { get: (arg0: string) => any }) {
  // Retrieve email and password from formData
  const displayName = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  console.log(email, password, displayName);

  if (!email || !password || !displayName) {
    throw new Error('Email and password and name are required.');
  }

  // Validate email and password types
  if (
    typeof email !== 'string' ||
    typeof password !== 'string' ||
    typeof displayName !== 'string'
  ) {
    throw new Error('Invalid input types.');
  }

  try {
    // Use Firebase Admin SDK to create a new user
    const userRecord = await auth.createUser({
      displayName,
      email,
      password,
    });

    console.log('Successfully created new user:', userRecord);

    // Write user data to Firestore or Realtime Database
    const userData = {
      fullName: userRecord.displayName,
      id: userRecord.uid,
      email: userRecord.email,
      timestamp: new Date().toISOString(),
    };

    await db.collection('users').doc(userRecord.uid).set(userData);
    console.log('User data written to database:', userData);

    // Authenticate the user via NextAuth credentials provider
    const signInResult = await signIn('credentials', {
      email,
      password,
      redirect: false, // Set to false to handle the result programmatically
    });

    console.log('Sign-in result:', signInResult);

    if (!signInResult?.ok) {
      throw new Error('Failed to sign in after user creation.');
    }

    // Redirect after successful sign-up
    console.log('About to redirect...');
    // redirect('/');
  } catch (error) {
    console.error('Error creating new user:', error);
    throw new Error('Failed to create a new user. Please try again.');
  }
}

// export async function signUpAction(formData: { get: (arg0: string) => any }) {
//   const email = formData.get('email');
//   const password = formData.get('password');
//   console.log(email, password);

//   try {
//     await SignUp(email, password);
//   } catch {
//     throw new Error('Something went wrong');
//   }
//   redirect(`/`);
// }

//user sign in
export async function signInWithGoogle() {
  await signIn('google', { redirectTo: '/account' });
}

//user sign up
export async function signInAction(formData: { get: (arg0: string) => any }) {
  // Retrieve email and password from formData
  const displayName = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  console.log(email, password, displayName);

  if (!email || !password || !displayName) {
    throw new Error('Email and password and name are required.');
  }

  // Validate email and password types
  if (typeof email !== 'string' || typeof password !== 'string') {
    throw new Error('Invalid input types.');
  }

  try {
    // Use Firebase Admin SDK to create a new user
    const userRecord = await auth.createUser({
      email,
      password,
    });

    console.log('Successfully created new user:', userRecord);

    // Write user data to Firestore or Realtime Database
    const userData = {
      id: userRecord.uid,
      email: userRecord.email,
      timestamp: new Date().toISOString(),
    };

    await db.collection('users').doc(userRecord.uid).set(userData);
    console.log('User data written to database:', userData);
    // Redirect after successful sign-up
    console.log('About to redirect...');
    // redirect('/');
  } catch (error) {
    console.error('Error creating new user:', error);
    throw new Error('Failed to create a new user. Please try again.');
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

  // Revalidate the path after the update
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
