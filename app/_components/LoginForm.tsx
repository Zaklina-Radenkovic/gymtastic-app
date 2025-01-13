'use client';
import Form from './Form';
import Input from './Input';
import FormRowVertical from './FormRowVertical';
import Button from './Button';

import { signInAction } from '@/app/_lib/actions';
import { useFormState } from 'react-dom';

type FormState = {
  errors: Record<string, string>;
};

function LoginForm() {
  //@ts-ignore
  const [formState, action] = useFormState<FormState>(signInAction, {
    errors: {},
  });

  return (
    <Form action={action}>
      <FormRowVertical label="Email address" error={formState.errors?.email}>
        <Input type="email" name="email" />
      </FormRowVertical>

      <FormRowVertical label="Password" error={formState.errors?.password}>
        <Input type="password" name="password" />
      </FormRowVertical>

      <FormRowVertical>
        <Button size="large">Login</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
