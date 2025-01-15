type FormProps = {
  children: React.ReactNode;
  action?: (payload: FormData) => void;
  className?: string;
  error: string[] | undefined;
};

function Form({ children, className, action, error }: FormProps) {
  return (
    <form
      className={`overflow-hidden rounded-md border border-primary-200 bg-primary-50 px-10 py-6 text-sm ${className}`}
      action={action}
    >
      <>
        {error && (
          <div className="mb-4 text-base text-red-700">
            <p>{error}</p>
          </div>
        )}
        {children}
      </>
    </form>
  );
}

export default Form;
