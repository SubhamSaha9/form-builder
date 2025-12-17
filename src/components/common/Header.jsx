import React from "react";
import { Button } from "../ui/button";
import logo from "../../assets/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { navMenuDash, navMenuHome } from "@/utils/Constants";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { setToken, setUser } from "@/slice/authSlice";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);
  const { pathname } = useLocation();
  console.log(pathname);
  const handleNavMenuClick = (menu) => {
    if (menu.name === "Logout") {
      dispatch(setToken(null));
      dispatch(setUser(null));
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success("Logged Out successfully");
      navigate("/");
    } else if (menu.name === "GitHub") {
      window.open(menu.to, "_blank");
    } else {
      navigate(menu.to);
    }
  };
  return (
    <div className="p-3 border-b shadow-sm">
      <div className="flex justify-between items-center">
        <Link to={"/"}>
          <img src={logo} alt="logo" width={35} height={35} className="ml-5" />
        </Link>
        {token ? (
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-gray-100 p-2.5 w-11 rounded-full cursor-pointer transition hover:bg-gray-200 flex items-center justify-center mr-6 border-primary border-b">
              {/* <img src={user.image} alt="img" /> */}
              <div className=" flex items-center justify-between">
                {user.firstName.split("")[0]}
                {user.lastName.split("")[0]}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {pathname.includes("dashboard")
                ? navMenuDash.map((item, index) => (
                    <DropdownMenuItem
                      className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm"
                      key={index}
                      onClick={() => handleNavMenuClick(item)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </DropdownMenuItem>
                  ))
                : navMenuHome.map((item, index) => (
                    <DropdownMenuItem
                      className="flex gap-2 items-center p-2 hover:bg-gray-100 rounded-lg cursor-pointer text-sm"
                      key={index}
                      onClick={() => handleNavMenuClick(item)}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </DropdownMenuItem>
                  ))}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button onClick={() => navigate("/auth")}>Get Started</Button>
        )}
      </div>
    </div>
  );
};

export default Header;
