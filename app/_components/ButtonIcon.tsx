function ButtonIcon({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      className="rounded-sm border-none bg-none px-2 py-2 transition-all duration-200 hover:bg-primary-200"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default ButtonIcon;
