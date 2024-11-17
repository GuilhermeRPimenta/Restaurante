import React from "react";

const Button = ({
  children,
  variant,
  className,
  onClick,
}: {
  children?: React.ReactNode;
  variant?: "constructive" | "desctructive" | "ghost";
  className?: string;
  onClick?: () => void;
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
    <button
      onClick={onClick}
      className={`${className} ${baseStyle} ${
        variant ? variantStyles[variant] : variantStyles["primary"]
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
