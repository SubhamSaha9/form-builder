import React from "react";
import { Button } from "../ui/button";
import logo from "../../assets/logo.svg";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="p-3 border-b shadow-sm">
      <div className="flex justify-between items-center">
        <Link to={"/"}>
          <img src={logo} alt="logo" width={35} height={35} className="ml-5" />
        </Link>
        <Button onClick={() => navigate("/auth")}>Get Started</Button>
      </div>
    </div>
  );
};

export default Header;
