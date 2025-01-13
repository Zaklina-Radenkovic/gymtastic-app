'use server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

import { db, auth } from '../_lib/firebase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn, signOut } from './auth';

import { signInSchema, signUpSchema } from '@/app/_utils/schemas/authSchema';
import { AuthError } from 'next-auth';

interface AuthResponse {
  success: boolean;
  errors?: Record<string, string[] | undefined>;
  error?: string;
}

//user sign up
export async function signUpAction(
  formState: AuthResponse,
  formData: { get: (arg0: string) => any },
): Promise<AuthResponse> {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    repeatPassword: formData.get('repeatPassword'),
  };

  const result = signUpSchema.safeParse(data);

  if (!result.success) {
    console.log('error', result.error.flatten().fieldErrors);
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  try {
    const userRecord = await auth.createUser({
      displayName: data.name,
      email: data.email,
      password: data.password,
    });

    const hashedPassword = await bcrypt.hash(data.password, 10);

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

    await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirectTo: '/',
    });

    return { success: true };
  } catch (error) {
    //console.log('Error:', error);
    if (error instanceof Error) {
      return {
        success: false,
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        success: false,
        errors: {
          _form: ['An unexpected error occurred. Please try again.'],
        },
      };
    }
  } finally {
    redirect('/');
  }
}

//user sign in with Google
export async function signInWithGoogle() {
  await signIn('google', { redirectTo: '/account' });
}

//user sign in
export async function signInAction(
  formState: AuthResponse,
  formData: FormData,
): Promise<AuthResponse> {
  const result = signInSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  try {
    const { email, password } = result.data;

    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    });

    return { success: true };
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

    if (error instanceof Error) {
      return {
        success: false,
        errors: {
          _form: [error.message],
        },
      };
    } else {
      return {
        success: false,
        errors: {
          _form: ['An unexpected error occurred. Please try again.'],
        },
      };
    }
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
