import FormRow from './FormRow';
import Input from './Input';
import Button from './Button';
import SubmitButton from './SubmitButton';

import { DocumentData } from 'firebase/firestore';

import { updateCustomer } from '../_lib/actions';

interface UpdateUserDataFormProps {
  user: DocumentData;
  id: string;
}

function UpdateUserDataForm({ user, id }: UpdateUserDataFormProps) {
  const { fullName, image, email } = user;

  return (
    <form
      className="overflow-hidden rounded-md border border-primary-200 bg-primary-50 px-10 py-6 text-sm"
      action={updateCustomer}
    >
      <FormRow label="Full name">
        <Input defaultValue={fullName} name="name" type="text" />
      </FormRow>
      <FormRow label="Email address">
        <Input type="text" name="email" defaultValue={email} />
      </FormRow>
      <input hidden name="id" value={id} readOnly />
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
        <SubmitButton pendingLabel="Updating...">Update account</SubmitButton>
        {/* <Button variation="danger">Delete</Button> */}
      </FormRow>
    </form>
  );
}
export default UpdateUserDataForm;
