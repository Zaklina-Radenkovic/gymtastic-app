'use client';

import { useState } from 'react';
import Form from './Form';
import FormRow from './FormRow';
import Input from './Input';
import Button from './Button';
import SubmitButton from './SubmitButton';
import { signUpAction } from '../_lib/actions';

function SignupForm() {
  return (
    <Form action={signUpAction}>
      <FormRow label="Full name">
        <Input type="text" name="name" />
      </FormRow>

      <FormRow label="Email address">
        <Input
          type="email"
          name="email"
          // value={email}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)">
        <Input
          type="password"
          name="password"
          // value={password}
        />
      </FormRow>

      <FormRow label="Repeat password">
        <Input type="password" />
      </FormRow>

      <FormRow>
        <Button variation="secondary">Cancel</Button>
        {/* <Button size="large">Login</Button> */}
        <SubmitButton>Sign up</SubmitButton>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
