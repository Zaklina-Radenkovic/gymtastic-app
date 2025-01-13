'use client';
import { useFormState } from 'react-dom';
import Form from './Form';
import FormRow from './FormRow';
import Input from './Input';
import Button from './Button';
import SubmitButton from './SubmitButton';

import { signUpAction } from '../_lib/actions';

type FormState = {
  errors: Record<string, string>;
};

function SignupForm() {
  //@ts-ignore
  const [formState, action] = useFormState<FormState>(signUpAction, {
    errors: {},
  });

  return (
    <Form action={action}>
      <FormRow label="Full name" error={formState.errors?.name}>
        <Input type="text" name="name" />
      </FormRow>

      <FormRow label="Email address" error={formState.errors?.email}>
        <Input type="email" name="email" />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={formState.errors?.password}
      >
        <Input type="password" name="password" />
      </FormRow>

      <FormRow label="Repeat password" error={formState.errors?.repeatPassword}>
        <Input type="password" name="repeatPassword" />
      </FormRow>

      <FormRow>
        <Button variation="secondary">Cancel</Button>
        <SubmitButton pendingLabel="Signing up...">Sign up</SubmitButton>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
