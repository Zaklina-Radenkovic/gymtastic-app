import Form from './Form';
import Input from './Input';
import FormRowVertical from './FormRowVertical';
import Button from './Button';

function LoginForm() {
  return (
    <Form>
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
