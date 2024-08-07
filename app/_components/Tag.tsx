function Tag({
  color,
  background,
  children,
}: {
  color: String;
  background: String;
  children: String;
}) {
  return (
    <span
      className={`max-w-fit rounded-full px-3 py-1 text-[11px] font-semibold uppercase ${color} ${background}`}
    >
      {children}
    </span>
  );
}
export default Tag;
