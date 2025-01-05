import Form from './Form';
import FormRow from './FormRow';
import Input from './Input';
import Button from './Button';
import SubmitButton from './SubmitButton';

import { DocumentData } from 'firebase/firestore';

import { updateCustomer } from '../_lib/actions';

function UpdateUserDataForm({ user }: DocumentData) {
  const { name, image, email, id } = user;

  return (
    <Form action={updateCustomer}>
      <FormRow label="Full name">
        <Input defaultValue={user.name} name="name" type="text" />
      </FormRow>
      <FormRow label="Email address">
        <Input type="email" name="email" defaultValue={user.email} />
      </FormRow>
      <input hidden name="id" value={user.id} readOnly />
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
      </FormRow>
    </Form>
  );
}
export default UpdateUserDataForm;
