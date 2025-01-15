'use client';
import Form from './Form';
import Input from './Input';
import FormRowVertical from './FormRowVertical';
import Button from './Button';

import { signInAction } from '@/app/_lib/actions';
import { useFormState } from 'react-dom';
import SubmitButton from './SubmitButton';

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
    </Form>
  );
}

export default LoginForm;
