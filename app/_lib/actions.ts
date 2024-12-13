'use server';
import { cookies } from 'next/headers';
import { db } from '../_lib/firebase';
import { revalidatePath } from 'next/cache';

import { signIn } from './auth';

//user sign up
// export async function signUpAction(formData: { get: (arg0: string) => any }) {
//   const email = formData.get('email');
//   const password = formData.get('password');
//   console.log(email, password);

//   // try {
//   //   await SignUp(email, password);
//   // } catch {
//   //   throw new Error('Something went wrong');
//   // }
//   redirect(`/`);
// }

//user sign in
export async function signInAction() {
  await signIn('google', { redirectTo: '/account' });
}

//updating customer data

export async function updateCustomer(formData: { get: (arg0: string) => any }) {
  const fullName = formData.get('name');
  const email = formData.get('email');
  const id = formData.get('id');

  const updateData = {
    fullName,
    email,
    id,
    timestamp: new Date().toISOString(),
  };
  console.log('update user from action ', updateData);
  try {
    const userRef = db.collection('users').doc(id);

    await userRef.update(updateData);
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
