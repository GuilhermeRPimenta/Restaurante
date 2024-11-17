import logoOrange from "../../assets/logo-orange.png";

const Header = () => {
  return (
    <header className=" bg-gray-100 shadow-md flex items-center p-1 justify-center">
      <img src={logoOrange} alt="" className="w-12" />
      <h1 className="font-pacifico text-3xl text-primary">Prato Bom</h1>
    </header>
  );
};

export default Header;
