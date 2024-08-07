interface InputProps {
  type?: string;
  //   label: string | null;
  value?: string;
  disabled?: boolean;
  onChange?: () => void;
  id?: string;
  accept?: string;
  // dropdownSelections: string[];
}

const Input: React.FC<InputProps> = ({
  type,
  value,
  disabled,
  onChange,
  id,
  accept,
  // dropdownSelections,
}) => {
  return (
    <>
      {type === 'text' ||
        (type === 'password' && (
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            disabled={disabled}
            className="rounded-tiny border border-primary-400 bg-primary-50 px-4 py-2"
          />
        ))}

      {type === 'file' && (
        <input
          className="rounded-sm text-xs file:mr-4 file:cursor-pointer file:rounded-sm file:border-none file:bg-indigo-600 file:px-4 file:py-2 file:font-medium file:text-primary-50 file:transition-colors file:duration-200 file:hover:bg-indigo-700"
          type="file"
        />
      )}

      {/* {type === 'dropdown' && (
          <div>
            <label className="block pb-5" htmlFor="search">
              {label}
            </label>
  
            <select
              onChange={onChange}
              value={value}
              id="search"
              className="mb-6 w-full rounded-lg bg-gray-light px-2.5 py-3 focus:outline-1 focus:outline-primary sm:px-5"
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
        )} */}

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
