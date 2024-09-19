interface Option {
  value: string;
  label: string;
}

type SelectProps = {
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

function Select({ options, value, onChange, ...props }: SelectProps) {
  return (
    <select
      name="sort"
      className="rounded-sm border border-primary-200 bg-primary-50 px-3 py-4 shadow-sm"
      {...props}
      value={value}
      onChange={onChange}
    >
      {options.map((option: Option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
