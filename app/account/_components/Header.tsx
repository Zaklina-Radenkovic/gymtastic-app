import Logo from "./Logo";

const Header = () => {
  return (
    <header className="border-b border-blue-900 px-8 py-5 bg-red-800">
      <div className="flex justify-between items-center max-w-7xl mx-auto ">
        <Logo />
        {/*<Navigation /> */}
      </div>
    </header>
  );
};

export default Header;
