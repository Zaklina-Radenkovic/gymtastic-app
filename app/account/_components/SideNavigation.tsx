function SideNavigation() {
  return (
    <nav className="border-r border-blue-900 bg-blue-600">
      <ul className="flex flex-col gap-2 h-full text-lg">
        <li>Calendar</li>
        <li>Customers</li>
        <li>Account</li>
      </ul>
    </nav>
  );
}

export default SideNavigation;
