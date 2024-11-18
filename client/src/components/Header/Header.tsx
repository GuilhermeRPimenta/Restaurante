import { useState } from "react";
import logoOrange from "../../assets/logo-orange.png";
import Nav from "./Nav";
import NavLinks from "./NavLinks";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [mobileNavIsOpen, setMobileNavIsOpen] = useState(false);
  const handleMobileNavIsOpenChange = () => {
    setMobileNavIsOpen(!mobileNavIsOpen);
  };
  const handleNavLinkClick = () => {
    setMobileNavIsOpen(false);
  };
  return (
    <header className="bg-gray-100 sticky top-0 z-[10]">
      <div className="p-1 sm:px-6 justify-between shadow-lg flex items-center  ">
        <NavLink
          to={"/"}
          onClick={handleMobileNavIsOpenChange}
          className="flex items-center mb-auto"
        >
          <img src={logoOrange} alt="" className="w-12" />
          <h1 className="font-pacifico  text-3xl text-primary">Bom Prato</h1>
        </NavLink>

        <div className="flex items-center justify-center">
          <Nav
            mobileNavIsOpen={mobileNavIsOpen}
            handleMobileNavIsOpenChange={handleMobileNavIsOpenChange}
          />
        </div>
      </div>
      {mobileNavIsOpen && (
        <div className="sm:hidden bg-gray-100 shadow-md">
          <NavLinks
            className="text-xl"
            handleNavLinkClick={handleNavLinkClick}
          />
        </div>
      )}
    </header>
  );
};

export default Header;
