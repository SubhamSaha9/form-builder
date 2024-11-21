import React from "react";
import { Button } from "../ui/button";
import logo from "../../assets/logo.svg";

const Header = () => {
  return (
    <div className="p-5 border-b shadow-sm">
      <div className="flex justify-between items-center">
        <img src={logo} alt="logo" width={35} height={35} />
        <Button>Get Started</Button>
      </div>
    </div>
  );
};

export default Header;
