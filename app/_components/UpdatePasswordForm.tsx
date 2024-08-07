import Button from './Button';
import FormRow from './FormRow';
import Input from './Input';

function UpdatePasswordForm() {
  return (
    <form className="overflow-hidden rounded-md border border-primary-200 bg-primary-50 px-14 py-9 text-sm">
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
    </form>
  );
}

export default UpdatePasswordForm;
