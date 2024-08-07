type FormRow = {
  label?: String;
  children: React.ReactNode;
};

function FormRow({ label, children }: FormRow) {
  return (
    <div className="grid grid-cols-[15rem_1fr_1.2fr] items-center gap-8 border-b border-primary-200 px-0 py-4 first:pt-0 last:border-none last:pb-0 has-[button]:flex has-[button]:justify-end has-[button]:gap-4">
      {label && (
        <label htmlFor="" className="font-medium">
          {label}
        </label>
      )}
      {children}
      {/* {error && <span className="text-sm text-red-700">{error}</span>} */}
    </div>
  );
}

export default FormRow;
