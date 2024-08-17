'use client';

const sizes = {
  small: 'text-xs py-1 px-3 uppercase font-semibold text-center',
  medium: 'text-sm py-3 px-4 font-medium',
  large: 'text-lg py-1 px-2 font-medium',
};

const variations = {
  primary: 'text-indigo-50 bg-indigo-600 hover:bg-indigo-700',
  secondary:
    'text-primary-700 bg-primary-50 hover:bg-primary-100 border border-primary-100',
  danger: 'text-red-100 bg-red-700 hover:bg-red-800',
};

function Button({
  size = 'medium',
  variation = 'primary',
  children,
  disabled,
  className,
  type,
  ...otherProps
}: {
  type?: 'button' | 'submit' | 'reset' | undefined;
  size?: string;
  variation?: string;
  children: string | any;
  disabled?: boolean;
  className?: string;
}): JSX.Element {
  return (
    <button
      //@ts-ignore
      className={`${variations[variation]} rounded-sm border-none shadow-sm ${sizes[size]} ${className} disabled:cursor-not-allowed disabled:bg-primary-500 disabled:text-primary-300`}
      {...otherProps}
    >
      {children}
    </button>
  );
}

export default Button;
