import NavLinks from "./NavLinks";
import { GiHamburgerMenu } from "react-icons/gi";
import Button from "../Global/Button";

const Nav = ({
  mobileNavIsOpen,
  handleMobileNavIsOpenChange,
}: {
  mobileNavIsOpen: boolean;
  handleMobileNavIsOpenChange: () => void;
}) => {
  return (
    <nav className="flex items-center flex-col">
      <div className="hidden gap-2 sm:flex sm:items-center sm:justify-center">
        <NavLinks />
      </div>
      <Button
        className={"sm:hidden"}
        onClick={handleMobileNavIsOpenChange}
        variant="ghost"
      >
        <GiHamburgerMenu
          className={`sm:hidden text-3xl ${
            mobileNavIsOpen ? "text-primary" : "text-eerieBlack"
          }`}
        />
      </Button>
    </nav>
  );
};

export default Nav;
