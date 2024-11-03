type FormRowVerticalProps = {
  label?: string;
  error?: React.JSX.Element;
  children: React.JSX.Element;
};

function FormRowVertical({ label, error, children }: FormRowVerticalProps) {
  return (
    <div className="flex flex-col gap-3 px-0 py-4">
      {label && (
        <label htmlFor="" className="font-medium">
          {label}
        </label>
      )}
      {children}
      {error && <span className="text-base text-red-700">{error}</span>}
    </div>
  );
}

export default FormRowVertical;
