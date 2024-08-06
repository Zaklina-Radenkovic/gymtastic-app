function ButtonIcon({ children }: any) {
  return (
    <button className="rounded-sm border-none bg-none px-2 py-2 transition-all duration-200 hover:bg-primary-200">
      {children}
    </button>
  );
}

export default ButtonIcon;
