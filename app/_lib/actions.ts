'use server';
import { cookies } from 'next/headers';

import { addDoc, collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../_lib/firebase';
import { revalidatePath } from 'next/cache';

//updating customer data
export async function updateCustomer(formData: any) {
  const name = formData.get('name');
  const email = formData.get('email');
  const id = formData.get('id');

  const updateData = { name, email, id };

  try {
    const docRef = doc(db, 'users', id);
    await updateDoc(docRef, updateData);
  } catch {
    throw new Error('Customer could not be updated');
  }

  revalidatePath(`/customers/${id}/edit`);
}

export async function setThemeCookies(theme: string) {
  cookies().set('theme', theme, { path: '/', maxAge: 7 * 24 * 60 * 60 });
}
