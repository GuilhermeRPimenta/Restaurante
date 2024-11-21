import React from "react";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-grow justify-center py-6 px-6">{children}</div>
  );
};

export default Main;
