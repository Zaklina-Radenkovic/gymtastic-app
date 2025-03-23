'use server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { AuthError } from 'next-auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { db, auth } from '../_lib/firebase';
import supabase from '../_lib/supabase';
import { signIn, signOut, auth as nextAuth } from './auth';
import {
  signInSchema,
  signUpSchema,
  updateCustomerSchema,
  updatePasswordSchema,
} from '@/app/_utils/schemas/authSchema';
import {
  CustomError,
  isRedirectError,
  isSupabaseConnectionError,
} from '../_utils/errors';

interface AuthResponse {
  success: boolean;
  errors?: Record<string, string[] | undefined>;
  error?: string;
  message?: string;
  redirect?: boolean;
}

//user sign up ////
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
    const existingUser = await auth
      .getUserByEmail(result.data.email)
      .catch(() => null);
    if (existingUser) {
      return {
        success: false,
        errors: { email: ['Email is already in use.'] },
      };
    }

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
    if (isRedirectError(error as Error & { digest?: string })) {
      console.error('Redirect error:', error);
      // redirects to the app in case of success
      throw error;
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

//// user sign in with Google ////
export async function signInWithGoogle() {
  await signIn('google', { redirectTo: '/account' });
}

/// user sign in  ////
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
      redirectTo: '/',
    });
    //console.log('response from action ', response);

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

//// updating customer data ///
export async function updateCustomer(formState: any, formData: FormData) {
  try {
    const parsedName = updateCustomerSchema.safeParse({
      name: formData.get('name') || undefined,
    });

    if (!parsedName.success) {
      const errors = parsedName.error.flatten().fieldErrors;
      return {
        success: false,
        errors: {
          name: errors.name ?? [],
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
    //console.error('Update error:', error);

    if (isSupabaseConnectionError(error)) {
      return {
        success: false,
        errors: {
          _form: [
            `Connection to Supabase failed. This might be due to an inactive project or network issues. Please check your Supabase status and try again later.`,
          ],
        },
      };
    }

    return {
      success: false,
      errors: {
        _form: ['Customer could not be updated'],
      },
    };
  }
}

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
    const fieldErrors = result.error.flatten().fieldErrors;
    const orderedErrors: Record<string, string[]> = {};

    // Prioritize required errors first
    if (fieldErrors.newPassword?.some((msg) => msg.includes('required'))) {
      orderedErrors.newPassword = ['New password is required'];
    } else if (fieldErrors.newPassword) {
      orderedErrors.newPassword = fieldErrors.newPassword;
    }

    if (fieldErrors.repeatPassword?.some((msg) => msg.includes('required'))) {
      orderedErrors.repeatPassword = ['Repeat password is required'];
    } else if (fieldErrors.repeatPassword) {
      orderedErrors.repeatPassword = fieldErrors.repeatPassword;
    }

    // Check for mismatch error last
    if (fieldErrors.repeatPassword?.some((msg) => msg.includes('match'))) {
      orderedErrors._form = ['Passwords do not match'];
    }

    return { success: false, errors: orderedErrors };
  }

  const { newPassword } = result.data;

  try {
    const userId = session.user.id;

    const hashedPassword = await bcrypt.hash(result.data.newPassword, 10);

    await db.collection('users').doc(userId).update({
      passwordHash: hashedPassword,
    });

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
    //console.error('Error deleting account:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};

export async function setThemeCookies(theme: string) {
  cookies().set('theme', theme, { path: '/', maxAge: 7 * 24 * 60 * 60 });
}

export async function signOutAction() {
  await signOut({ redirectTo: '/' });
}
