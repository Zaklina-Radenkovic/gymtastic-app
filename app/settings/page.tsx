import SettingsForm from '../_components/SettingsForm';

export const metadata = {
  title: 'Settings',
};

export default function Page() {
  return (
    <>
      <h1 className="text-3xl font-bold">Settings</h1>
      <SettingsForm
        title="Show participants of event"
        label1="All users"
        label2="Admins only"
      />

      <SettingsForm
        title="Waitlist on events"
        label1="enabled"
        label2="disabled"
      />

      <SettingsForm
        title="Allow users to join more than one event per day"
        label1="enabled"
        label2="disabled"
      />

      <form
        action=""
        className="mx-36 overflow-hidden rounded-md border border-primary-200 bg-primary-50 px-10 py-6 text-sm"
      >
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base font-medium">
            Default number of participants in new event
          </h3>

          <input
            type="number"
            className="w-20 rounded-tiny border border-primary-400 bg-primary-50 px-4 py-2"
          />
        </div>
      </form>

      <div className="flex flex-wrap justify-center">
        <form
          action=""
          className="mx-10 overflow-hidden rounded-md border border-primary-200 bg-primary-50 px-8 py-6 text-sm"
        >
          <h3 className="mb-5 border-b border-primary-400 pb-2 text-center text-base font-medium">
            Calendar starting hour
          </h3>

          <div className="w-full">
            <div className="mb-5">
              <label htmlFor="time" className="mb-3 block">
                Time
              </label>
              <input
                type="time"
                name="time"
                id="time"
                className="w-full rounded-md border border-[#e0e0e0] bg-primary-100 px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
        </form>

        <form
          action=""
          className="mx-10 overflow-hidden rounded-md border border-primary-200 bg-primary-50 px-8 py-6 text-sm"
        >
          <h3 className="mb-5 border-b border-primary-400 pb-2 text-center text-base font-medium">
            Calendar ending hour
          </h3>

          <div className="w-full">
            <div className="mb-5">
              <label htmlFor="time" className="mb-3 block">
                Time
              </label>
              <input
                type="time"
                name="time"
                id="time"
                className="w-full rounded-md border border-[#e0e0e0] bg-primary-100 px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
              />
            </div>
          </div>
        </form>
      </div>

      <form
        action=""
        className="mx-36 overflow-hidden rounded-md border border-primary-200 bg-primary-50 px-10 py-6 text-sm"
      >
        <h3 className="mb-5 border-b border-primary-400 pb-2 text-base font-medium">
          Other languages besides English. Check with admin for adding more
          options.
        </h3>
        <div className="flex justify-around">
          <div className="me-4 flex items-center">
            <input
              id="inline-checkbox"
              type="checkbox"
              value=""
              className="h-4 w-4 border-gray-300 bg-gray-100 text-indigo-600 focus:outline-none focus:ring-indigo-600"
            />
            <label
              htmlFor="inline-checkbox"
              className="ms-2 text-sm font-medium"
            >
              Serbian
            </label>
          </div>
          <div className="me-4 flex items-center">
            <input
              id="inline-2-checkbox"
              type="checkbox"
              value=""
              className="h-4 w-4 border-gray-300 bg-gray-100 text-indigo-600 focus:outline-none focus:ring-indigo-600"
            />
            <label
              htmlFor="inline-2-checkbox"
              className="ms-2 text-sm font-medium"
            >
              Slovenian
            </label>
          </div>
        </div>
      </form>
    </>
  );
}
