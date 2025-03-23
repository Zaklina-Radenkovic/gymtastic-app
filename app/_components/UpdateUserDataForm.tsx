'use client';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import Form from './Form';
import FormRow from './FormRow';
import Input from './Input';
import Button from './Button';
import SubmitButton from './SubmitButton';

import { DocumentData } from 'firebase/firestore';
import { updateCustomer } from '../_lib/actions';

function UpdateUserDataForm({ user }: DocumentData) {
  const [formState, action] = useFormState(updateCustomer, {
    success: true,
    errors: {},
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = (formData: FormData) => {
    if (selectedFile) formData.append('image', selectedFile);
    action(formData);
  };

  return (
    <Form action={handleSubmit}>
      <FormRow label="Full name" error={formState?.errors?.name}>
        <Input defaultValue={user.name} name="name" type="text" />
      </FormRow>
      <FormRow label="Email address">
        <Input
          type="email"
          name="email"
          defaultValue={user.email}
          readOnly
          className="bg-primary-400 text-primary-600 focus:outline-none"
        />
      </FormRow>
      <input hidden name="id" value={user.id} readOnly />
      <FormRow label="Avatar image" error={formState?.errors?.image}>
        <Input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            setSelectedFile(file || null);
          }}
        />
      </FormRow>

      {formState?.errors?._form && (
        <p className="text-sm text-red-500">{formState.errors._form[0]}</p>
      )}
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
        <SubmitButton pendingLabel="Updating...">Update account</SubmitButton>
      </FormRow>
    </Form>
  );
}
export default UpdateUserDataForm;
