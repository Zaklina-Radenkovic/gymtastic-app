'use client';

import { useState } from 'react';
import Form from './Form';
import FormRow from './FormRow';
import Input from './Input';
import Button from './Button';
import SubmitButton from './SubmitButton';

function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Form>
      <FormRow label="Full name">
        <Input type="text" name="name" />
      </FormRow>

      <FormRow label="Email address">
        <Input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)">
        <Input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>

      <FormRow label="Repeat password">
        <Input type="password" />
      </FormRow>

      <FormRow>
        <Button variation="secondary">Cancel</Button>

        <SubmitButton>Sign up</SubmitButton>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
