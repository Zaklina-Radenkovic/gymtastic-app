import Button from './Button';
import FormRow from './FormRow';
import Input from './Input';

function UpdateCustomerData({ email }: any) {
  return (
    <form className="overflow-hidden rounded-md border border-primary-200 bg-primary-50 px-14 py-9 text-sm">
      <FormRow label="Email address">
        <Input value={email} disabled type="text" />
      </FormRow>
      <FormRow label="Full name">
        <Input type="text" value="" id="" />
      </FormRow>
      <FormRow label="Avatar image">
        <Input
          type="file"
          // id="avatar"
          accept="image/*"
          //   onChange={(e) => setAvatar(e.target.files[0])}
        />
      </FormRow>
      <FormRow>
        <Button type="reset" variation="secondary">
          Cancel
        </Button>
        <Button>Update account</Button>
        <Button variation="danger">Delete</Button>
      </FormRow>
    </form>
  );
}
export default UpdateCustomerData;
