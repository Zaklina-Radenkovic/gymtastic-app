import FormRow from './FormRow';
import Input from './Input';
import Button from './Button';
import SubmitButton from './SubmitButton';

const intervalOptions = ['day', 'month'];

function AddSubscriptionForm({ subscriptionId = {} }) {
  return (
    <form className="max-w-xs overflow-hidden rounded-md border border-primary-200 bg-primary-50 px-5 py-6 text-sm">
      <h3 className="mb-5 border-b border-primary-400 pb-2 text-center text-lg font-medium">
        Add New Subscription
      </h3>
      <FormRow className="grid-cols-[1fr_1fr] items-center">
        <Input
          type="number"
          name="count"
          label="Interval Count"
          className="w-full"
        />
        <Input
          type="dropdown"
          name="interval"
          label="Interval"
          dropdownSelections={intervalOptions}
        />
      </FormRow>

      <FormRow className="grid-cols-[1fr_1fr] items-center">
        <Input type="number" name="price" className="w-full" label="Price" />
        <Input
          type="number"
          name="trainings"
          label="Total trainings"
          className="w-full"
        />
      </FormRow>

      <FormRow className="mt-6">
        <Button type="reset" variation="secondary">
          Cancel
        </Button>
        <SubmitButton pendingLabel="Save...">Save</SubmitButton>
      </FormRow>
    </form>
  );
}

export default AddSubscriptionForm;
