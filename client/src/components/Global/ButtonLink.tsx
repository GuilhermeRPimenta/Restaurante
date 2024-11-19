import React from "react";
import { Link } from "react-router-dom";

const ButtonLink = ({
  children,
  variant,
  className,
  to,
}: {
  children?: React.ReactNode;
  variant?: "constructive" | "desctructive" | "ghost";
  className?: string;
  to: string;
}) => {
  const baseStyle =
    "flex items-center justify-center p-2 rounded-md font-semibold";
  const variantStyles = {
    primary: "bg-primary text-white hover:bg-orange-700",
    constructive: "bg-green-500 text-white hover:bg-green-700",
    desctructive: "bg-red-500 text-white hover:bg-red-700",
    ghost:
      "bg-transparent text-eerieBlack hover:bg-gray-200 hover:text-primary",
  };
  return (
    <Link
      to={to}
      className={`${className} ${baseStyle} ${
        variant ? variantStyles[variant] : variantStyles["primary"]
      }`}
    >
      {children}
    </Link>
  );
};

export default ButtonLink;
