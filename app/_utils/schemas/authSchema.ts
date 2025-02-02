import { z } from 'zod';

export const signUpSchema = z
  .object({
    name: z.string().trim().min(3, { message: 'Name is required' }),
    email: z.string().trim().email({ message: 'Invalid email address' }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' })
      .max(100, { message: 'Password is too long' }),
    repeatPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long' }),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'Passwords do not match',
    path: ['repeatPassword'],
  });

export const signInSchema = z.object({
  email: z.string().trim().email({ message: 'Invalid email address' }),
  password: z
    .string({ required_error: 'Invalid password' })
    .trim()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

export const updateCustomerSchema = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .trim()
    .min(3, { message: 'Name must be at least 3 characters long' }),
});
