import Form from './Form';
import Input from './Input';
import FormRowVertical from './FormRowVertical';
import Button from './Button';

import { signInAction } from '@/app/_lib/actions';

function LoginForm() {
  return (
    <Form action={signInAction}>
      <FormRowVertical label="Email address">
        <Input type="email" />
      </FormRowVertical>

      <FormRowVertical label="Password">
        <Input type="password" />
      </FormRowVertical>

      <FormRowVertical>
        <Button size="large">Login</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
