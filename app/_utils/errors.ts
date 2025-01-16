import { CredentialsSignin } from 'next-auth';

export function isRedirectError(error: Error & { digest?: string }): boolean {
  return !!error.digest?.startsWith('NEXT_REDIRECT');
}

export class CustomError extends CredentialsSignin {
  constructor(message: string) {
    super(message); // Call the parent class constructor
    this.message = message; // Set the error name
  }
  code = 'custom_error';
}
