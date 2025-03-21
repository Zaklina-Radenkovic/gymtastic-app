'use server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

import { db, auth } from '../_lib/firebase';
import { signIn, signOut, auth as nextAuth } from './auth';
import supabase from '../_lib/supabase';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import {
  signInSchema,
  signUpSchema,
  updateCustomerSchema,
  updatePasswordSchema,
} from '@/app/_utils/schemas/authSchema';
import { AuthError } from 'next-auth';

import { CustomError, isRedirectError } from '../_utils/errors';

interface AuthResponse {
  success: boolean;
  errors?: Record<string, string[] | undefined>;
  error?: string;
  message?: string;
  redirect?: boolean;
}

//user sign up
export async function signUpAction(
  formState: AuthResponse | undefined,
  formData: FormData,
): Promise<AuthResponse> {
  const data = {
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    repeatPassword: formData.get('repeatPassword'),
  };

  const result = signUpSchema.safeParse(data);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  try {
    const userRecord = await auth.createUser({
      displayName: result.data.name,
      email: result.data.email,
      password: result.data.password,
    });

    const hashedPassword = await bcrypt.hash(result.data.password, 10);

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
  formState: AuthResponse | undefined,
  formData: FormData,
): Promise<AuthResponse> {
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };
  const result = signInSchema.safeParse(data);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  try {
    const { email, password } = result.data;

    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    //console.log('response from action ', response);

    redirect('/');
    return { success: true };
  } catch (error) {
    if (isRedirectError(error as Error & { digest?: string })) {
      console.error('Redirect error:', error);
      // redirects to the app in case of success
      throw error;
    }

    if (error instanceof CustomError) {
      return { success: false, errors: { _form: [error.message] } };
    }

    if (error instanceof AuthError) {
      return {
        success: false,
        errors: {
          _form: [`Authentication Error: ${error.message}`],
        },
      };
    }

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
  }
}

//updating customer data
export async function updateCustomer(formState: any, formData: FormData) {
  // const formDataEntries = Array.from(formData?.entries());
  // console.log('FormData entries:', formDataEntries);
  try {
    const parsedName = updateCustomerSchema.safeParse({
      name: formData.get('name') || undefined,
    });

    if (!parsedName.success) {
      const errors = parsedName.error.flatten().fieldErrors;
      return {
        success: false,
        errors: {
          name: errors.name ?? [], // Ensuring `name` key exists
        },
      };
    }

    const { name } = parsedName.data;

    const email = formData.get('email');
    const id = formData.get('id') as string | null;

    if (!id) {
      return {
        success: false,
        errors: {
          _form: ['ID is required'],
        },
      };
    }
    const file = formData.get('image') as File | null;

    let imageUrl = null;

    if (file) {
      const fileExt = file.name.split('.').pop();
      const fileName = `avatar-${id}-${Math.random()}.${fileExt}`;

      const { error: storageError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { contentType: file.type });

      // if (storageError) throw new Error('Upload failed');
      if (storageError) {
        return {
          success: false,
          errors: {
            image: [
              'Image upload failed. This might be due to an inactive Supabase project. Please try again later.',
            ],
          },
        };
      }

      imageUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/avatars/${fileName}`;
    }

    const data = {
      name,
      email,
      id,
      image: imageUrl,
      timestamp: new Date().toISOString(),
    };

    const userRef = db.collection('users').doc(id);

    await userRef.update(data);

    revalidatePath(`/`);
    return { success: true, errors: {} };
  } catch (error) {
    // if (error.message.includes('getaddrinfo ENOTFOUND')) {
    //   return {
    //     success: false,
    //     errors: {
    //       image: [
    //         'Image upload failed. This might be due to an inactive Supabase project. Please try again later.',
    //       ],
    //     },
    //   };
    // }
    console.error('Update error:', error);
    return {
      success: false,
      errors: {
        _form: ['Customer could not be updated'],
      },
    };
  }
}

///  DELETE ACCOUNT  ////
export const deleteAccount = async (userId: string) => {
  try {
    await db.collection('users').doc(userId).delete();

    try {
      await auth.getUser(userId);
      await auth.deleteUser(userId);
    } catch (authError: any) {
      if (authError.code === 'auth/user-not-found') {
        console.warn(
          `User ${userId} not found in Firebase Auth, skipping deletion.`,
        );
      } else {
        throw authError;
      }
    }

    await signOut({ redirect: false });

    return { success: true };
  } catch (error) {
    console.error('Error deleting account:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};

////// UPDATE PASSWORD //////
export async function updatePassword(
  formState: AuthResponse | undefined,
  formData: FormData,
): Promise<AuthResponse> {
  const data = {
    newPassword: formData.get('newPassword')?.toString() || '',
    repeatPassword: formData.get('repeatPassword')?.toString() || '',
  };

  const result = updatePasswordSchema.safeParse(data);

  const session = await nextAuth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  if (!result.success) {
    console.log('Validation failed:', result.error.flatten().fieldErrors); // Debugging
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  const { newPassword, repeatPassword } = data;

  if (newPassword !== repeatPassword) {
    console.log('Passwords do not match'); // Debugging
    return {
      success: false,
      errors: { _form: ['Passwords do not match'] },
    };
  }

  try {
    const userId = session.user.id;

    const hashedPassword = await bcrypt.hash(result.data.newPassword, 10);

    await db.collection('users').doc(userId).update({
      passwordHash: hashedPassword,
    });
    console.log('Password updated successfully'); // Debugging
    // await signOut();
    // redirect('/sign-in'); // 🔥 Redirect only after successful password update
    if (session) {
      await signOut({ redirectTo: '/sign-in' });
    }
    return { success: true };
  } catch (error) {
    if (isRedirectError(error as Error & { digest?: string })) {
      console.error('Redirect error:', error);
      // redirects to the app in case of success
      throw error;
    }
    console.error('Error updating password:', error); // Debugging
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
  }
}

export async function setThemeCookies(theme: string) {
  cookies().set('theme', theme, { path: '/', maxAge: 7 * 24 * 60 * 60 });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}

// async function testStorageConnection() {
//   const { data, error } = await supabase.storage
//     .from('avatars') // Specify your bucket name
//     .list(); // List all objects in the bucket

//   if (error) {
//     console.error('Error accessing bucket:', error);
//   } else {
//     console.log('Files in bucket:', data);
//   }
// }

// testStorageConnection();
