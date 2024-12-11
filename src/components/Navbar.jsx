import { useState, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

import LogoLight from "../assets/LogoLight.png";
import LogoDark from "../assets/LogoDark.png";

import { Link } from "react-router-dom";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const Navbar = () => {
  return (
    <div class="flex justify-between">
      <img src={LogoLight} alt="Logo" />
      <div class="flex">
        <Menubar>
          <Link to="/the-eagles-are-coming">
            <MenubarMenu>
              <MenubarTrigger>Shuffle</MenubarTrigger>
            </MenubarMenu>
          </Link>
          <Link to="/my-precious">
            <MenubarMenu>
              <MenubarTrigger>My Collection</MenubarTrigger>
            </MenubarMenu>
          </Link>
        </Menubar>
        <div class="ml-2">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
