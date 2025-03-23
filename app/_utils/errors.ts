import { CredentialsSignin } from 'next-auth';

export function isRedirectError(error: Error & { digest?: string }): boolean {
  return !!error.digest?.startsWith('NEXT_REDIRECT');
}

export class CustomError extends CredentialsSignin {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
  code = 'custom_error';
}

export const isSupabaseConnectionError = (error: unknown): boolean => {
  if (
    error instanceof Error &&
    error.message.includes('fetch failed') &&
    error.cause &&
    typeof error.cause === 'object' &&
    'code' in error.cause &&
    'syscall' in error.cause &&
    'hostname' in error.cause
  ) {
    const { code, syscall } = error.cause as {
      code: string;
      syscall: string;
    };

    return code === 'ENOTFOUND' && syscall === 'getaddrinfo';
  }

  return false;
};
