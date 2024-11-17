import React from "react";

const Button = ({
  children,
  variant,
  onClick,
}: {
  children?: React.ReactNode;
  variant?: "constructive" | "desctructive" | "ghost";
  onClick?: () => void;
}) => {
  const baseStyle =
    "flex items-center justify-center p-2 rounded-md font-semibold";
  const variantStyles = {
    constructive: "bg-green-500 text-white hover:bg-green-700",
    desctructive: "bg-red-500 text-white hover:bg-red-700",
    ghost:
      "bg-transparent text-eerieBlack hover:bg-gray-200 hover:text-primary",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyle} ${
        variant ? variantStyles[variant] : variantStyles["ghost"]
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
