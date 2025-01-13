type FormProps = {
  children: React.ReactNode;
  action?: () => void;
  className?: string;
};

function Form({ children, className, action }: FormProps) {
  return (
    <form
      className={`overflow-hidden rounded-md border border-primary-200 bg-primary-50 px-10 py-6 text-sm ${className}`}
      action={action}
    >
      {children}
    </form>
  );
}

export default Form;
