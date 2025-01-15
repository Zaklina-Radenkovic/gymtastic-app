export function isRedirectError(error: Error & { digest?: string }): boolean {
  return !!error.digest?.startsWith('NEXT_REDIRECT');
}

export class CustomError extends Error {
  code = 'custom_error';

  constructor(message: string) {
    super(message);
    this.name = 'CustomError';
    this.message = message;
  }
}
