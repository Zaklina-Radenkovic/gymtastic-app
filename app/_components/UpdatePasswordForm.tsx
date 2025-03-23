'use client';
import { useFormState } from 'react-dom';
import Button from './Button';
import Form from './Form';
import FormRow from './FormRow';
import Input from './Input';
import SubmitButton from './SubmitButton';
import { updatePassword } from '../_lib/actions';

function UpdatePasswordForm() {
  const [formState, action] = useFormState(updatePassword, undefined);

  return (
    <Form action={action}>
      <FormRow
        label="New password (min 8 chars)"
        error={formState?.errors?.newPassword}
      >
        <Input type="password" name="newPassword" />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={formState?.errors?.repeatPassword}
      >
        <Input type="password" name="repeatPassword" />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          onClick={(e) => {
            e.preventDefault();
            e.currentTarget.form?.reset();
          }}
        >
          Cancel
        </Button>
        <SubmitButton pendingLabel="Updating...">Update password</SubmitButton>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
