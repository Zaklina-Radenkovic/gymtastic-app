'use client';
import Link from 'next/link';
import Form from './Form';
import Input from './Input';
import FormRowVertical from './FormRowVertical';
import SubmitButton from './SubmitButton';

import { signInAction } from '@/app/_lib/actions';
import { useFormState } from 'react-dom';

function LoginForm() {
  const [formState, action] = useFormState(signInAction, undefined);

  return (
    <Form action={action} error={formState?.errors?._form}>
      <FormRowVertical label="Email address" error={formState?.errors?.email}>
        <Input type="email" name="email" />
      </FormRowVertical>

      <FormRowVertical label="Password" error={formState?.errors?.password}>
        <Input type="password" name="password" />
      </FormRowVertical>

      <FormRowVertical>
        <SubmitButton pendingLabel="Signing in..." className="self-center">
          Sign in
        </SubmitButton>
      </FormRowVertical>
      <p className="text-center text-sm text-primary-700">
        Don&apos;t have an account?{' '}
        <Link className="p-1 font-bold text-indigo-700" href="/sign-up">
          Sign Up
        </Link>
      </p>
    </Form>
  );
}

export default LoginForm;
