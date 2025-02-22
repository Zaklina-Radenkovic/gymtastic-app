interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  name?: string;
  defaultValue?: string;
  className?: string;
  dropdownSelections?: string[];
  label?: string;
}

const Input: React.FC<InputProps> = ({
  type,
  value,
  disabled,
  onChange,
  name,
  defaultValue,
  className,
  dropdownSelections,
  label,
  ...otherProps
}) => {
  return (
    <>
      {(type === 'text' || type === 'password' || type === 'email') && (
        <input
          type={type}
          {...otherProps}
          name={name}
          defaultValue={defaultValue}
          value={value}
          disabled={disabled}
          onChange={onChange}
          className={`rounded-tiny border border-primary-400 bg-primary-50 px-4 py-2 ${className}`}
        />
      )}

      {type === 'file' && (
        <input
          className="rounded-sm text-xs file:mr-4 file:cursor-pointer file:rounded-sm file:border-none file:bg-indigo-600 file:px-4 file:py-2 file:font-medium file:text-primary-50 file:transition-colors file:duration-200 file:hover:bg-indigo-700"
          type="file"
          onChange={onChange}
        />
      )}

      {type === 'dropdown' && (
        <div className="flex flex-col gap-3">
          <label htmlFor="search" className="leading-4">
            {label}
          </label>

          <select
            onChange={onChange}
            value={value}
            id="search"
            className="bg-gray-light focus:outline-primary w-full rounded-lg px-2.5 py-3 focus:outline-1 sm:px-5"
          >
            {dropdownSelections &&
              dropdownSelections.map((s) => {
                return (
                  <option key={s} value={s}>
                    {s}
                  </option>
                );
              })}
          </select>
        </div>
      )}

      {type === 'number' && (
        <div className="flex flex-col gap-3">
          <label className="leading-4">{label}</label>
          <input
            type={type}
            {...otherProps}
            name={name}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            // disabled={disabled}
            className={`rounded-tiny border border-primary-400 bg-primary-50 px-4 py-2 ${className}`}
          />
        </div>
      )}

      {/* {type === 'textarea' && (
        <>
          <label className="pb-5 leading-4">{label}</label>
          <textarea
            onChange={onChange}
            id="message"
            rows={3}
            value={value}
            className="bg-gray-light focus:outline-primary mb-[1.87rem] block w-full rounded-lg p-2.5 text-base text-gray-900 focus:outline-1 sm:p-5"
          ></textarea>
        </>
      )} */}
    </>
  );
};

export default Input;
