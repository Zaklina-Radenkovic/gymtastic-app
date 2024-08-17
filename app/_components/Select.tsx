type SelectProps = {
  options: any;
  value: string;
  onChange: (e: any) => void;
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
      {options.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
