import Button from './Button';
import Form from './Form';
import FormRow from './FormRow';
import Input from './Input';

function UpdatePasswordForm() {
  return (
    <Form>
      <FormRow
        label="New password (min 8 chars)"
        // error={errors?.password?.message}
      >
        <Input
          type="password"
          //   id="password"
          //   autoComplete="current-password"
        />
      </FormRow>

      <FormRow label="Confirm password">
        <Input
          type="password"
          // autoComplete="new-password"
          id=""
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary">
          Cancel
        </Button>
        <Button>Update password</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
