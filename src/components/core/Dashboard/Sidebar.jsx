import { Button } from "@/components/ui/button";
import { sideBarMenu } from "@/utils/Constants";
import { PlusIcon } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import { useSelector } from "react-redux";
import CreateForm from "./Form/CreateForm";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="h-screen shadow-md border">
      <div className="p-5">
        {sideBarMenu.map((menu, i) => (
          <Link
            key={i}
            to={menu.path}
            className={`flex items-center gap-3 p-4 mb-3 hover:bg-primary hover:text-white rounded-lg cursor-pointer text-gray-500 ${
              pathname === menu.path && "bg-primary text-white"
            }`}
          >
            <menu.icon />
            {menu.name}
          </Link>
        ))}
      </div>
      <div className="fixed bottom-10 p-6 w-64">
        {/* <Button className="flex items-center gap-3 w-full mb-4">
          <PlusIcon />
          Create Form
        </Button> */}
        <div className="w-full mb-4">
          <CreateForm />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex gap-2 bg-gray-100 hover:bg-gray-200 shadow-sm p-2 rounded cursor-pointer">
              <img src={user.image} alt="profile" className="rounded h-8" />
              <div className="flex flex-col items-start justify-center text-xs">
                <b>
                  {user.firstName} {user.lastName}
                </b>
                <p className="text-gray-500 18">
                  {user.email.split("").splice(0, 19).join("")}...
                </p>
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" sideOffset={10} className="w-60">
            <DropdownMenuLabel>
              <div className="flex gap-2 shadow-sm p-2 rounded cursor-pointer">
                <img src={user.image} alt="profile" className="rounded h-8" />
                <div className="flex flex-col items-start justify-center text-xs">
                  <b>
                    {user.firstName} {user.lastName}
                  </b>
                  <p className="text-gray-500 18">{user.email} </p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings />
                <span>Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserPlus />
                  <span>Invite users</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>
                      <Mail />
                      <span>Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <MessageSquare />
                      <span>Message</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <PlusCircle />
                      <span>More...</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                <Plus />
                <span>New Form</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Github />
              <span>GitHub</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LifeBuoy />
              <span>Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Sidebar;
