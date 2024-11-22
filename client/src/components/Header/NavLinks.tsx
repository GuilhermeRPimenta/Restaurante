import { FaUserAlt } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import { IoHomeSharp } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const NavLinks = ({
  className,
  handleNavLinkClick,
}: {
  className?: string;
  handleNavLinkClick?: () => void;
}) => {
  const baseStyle = `${className} flex items-center justify-center p-2 rounded-md font-semibold hover:bg-gray-200 hover:text-primary`;
  return (
    <>
      <NavLink
        onClick={handleNavLinkClick}
        to="/"
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? "text-primary" : "text-eerieBlack"}`
        }
      >
        <IoHomeSharp />
        Início
      </NavLink>
      <NavLink
        onClick={handleNavLinkClick}
        to={"/user"}
        className={({ isActive }) =>
          `${baseStyle} ${isActive ? "text-primary" : "text-eerieBlack"}`
        }
      >
        <FaUserAlt />
        Usuário
      </NavLink>
      <NavLink
        onClick={handleNavLinkClick}
        to={"/admin"}
        className={({ isActive }) =>
          `${baseStyle} ${baseStyle} ${
            isActive ? "text-primary" : "text-eerieBlack"
          }`
        }
      >
        <GrUserAdmin />
        Admin
      </NavLink>
    </>
  );
};

export default NavLinks;
