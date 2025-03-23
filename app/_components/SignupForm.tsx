'use client';
import Link from 'next/link';
import { useFormState } from 'react-dom';
import Form from './Form';
import FormRow from './FormRow';
import Input from './Input';
import Button from './Button';
import SubmitButton from './SubmitButton';

import { signUpAction } from '../_lib/actions';

function SignupForm() {
  const [formState, action] = useFormState(signUpAction, undefined);

  return (
    <Form action={action} error={formState?.errors?._form}>
      <FormRow label="Full name" error={formState?.errors?.name}>
        <Input type="text" name="name" />
      </FormRow>

      <FormRow label="Email address" error={formState?.errors?.email}>
        <Input type="email" name="email" />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={formState?.errors?.password}
      >
        <Input type="password" name="password" />
      </FormRow>

      <FormRow
        label="Repeat password"
        error={formState?.errors?.repeatPassword}
      >
        <Input type="password" name="repeatPassword" />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          onClick={(e) => {
            e.preventDefault();
            e.currentTarget.form?.reset();
          }}
        >
          Cancel
        </Button>
        <SubmitButton pendingLabel="Signing up...">Sign up</SubmitButton>
      </FormRow>

      <p className="text-center text-sm text-primary-700">
        Already have an account?{' '}
        <Link className="p-1 font-bold text-indigo-700" href="/sign-in">
          Sign In
        </Link>
      </p>
    </Form>
  );
}

export default SignupForm;
