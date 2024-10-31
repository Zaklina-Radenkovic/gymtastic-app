import Form from './Form';

type SettingsFormProps = {
  title: string;
  label1: string;
  label2: string;
};

function SettingsForm({ title, label1, label2 }: SettingsFormProps) {
  return (
    <Form className="mx-36 text-base">
      <h3 className="mb-5 border-b border-primary-400 pb-2 text-center text-base font-medium">
        {title}
      </h3>

      <div className="flex justify-around">
        <div className="me-4 flex items-center">
          <input
            id="users"
            type="radio"
            value=""
            name="participants"
            className="h-4 w-4 border-gray-300 bg-gray-100 text-indigo-600 focus:outline-none focus:ring-indigo-600"
          />
          <label htmlFor="users" className="ms-2 text-sm font-medium">
            {label1}
          </label>
        </div>

        <div className="me-4 flex items-center">
          <input
            id="admins"
            type="radio"
            value=""
            name="participants"
            className="h-4 w-4 border-gray-300 bg-gray-100 text-indigo-600 focus:outline-none focus:ring-indigo-600"
          />
          <label htmlFor="admins" className="ms-2 text-sm font-medium">
            {label2}
          </label>
        </div>
      </div>
    </Form>
  );
}

export default SettingsForm;
