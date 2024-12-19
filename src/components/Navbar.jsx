import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { API_URL } from "../config/apiUrl.config";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@/components/ThemeProvider";

//Medias
import LogoLight from "../assets/LogoLight.png";
import LogoDark from "../assets/LogoDark.png";
import { Moon, Sun, Menu, SunMoon } from "lucide-react";

//Components

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
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";

const Navbar = () => {
  //Setters
  const { user, isLoggedIn, handleLogout, isLoading } = useContext(AuthContext);

  const userImage = user?.image;
  const { theme, setTheme } = useTheme();

  //this variable is true if the dark mode is activated
  const isDarkMode = theme === "dark";

  const nav = useNavigate();
  //Functions
  //These functions toggle the mode depending on the current mode
  const handleLight = () => {
    if (isDarkMode) {
      setTheme("light");
    }
  };
  const handleDark = () => {
    if (!isDarkMode) {
      setTheme("dark");
    }
  };
  if (isLoading) {
    return <p>Loading</p>;
  }

  return (
    <div className="flex justify-between items-center shadow-md w-full p-2 ">
      <Link to="/">
        <img
          className=" w-10 h-10 md:w-16 md:h-16"
          src={isDarkMode ? LogoDark : LogoLight}
          alt="Logo"
        />
      </Link>
      <div className="flex justify-center items-start ">
        {/* desktop top menu */}
        <div className="hidden md:flex">
          <Menubar>
            <Link to="/the-eagles-are-coming">
              <MenubarMenu>
                <MenubarTrigger>Swipe</MenubarTrigger>
              </MenubarMenu>
            </Link>
            <Link to="/my-precious">
              <MenubarMenu>
                <MenubarTrigger>My Collection</MenubarTrigger>
              </MenubarMenu>
            </Link>
            <Link to="/whats-up">
              <MenubarMenu>
                <MenubarTrigger>My Feed</MenubarTrigger>
              </MenubarMenu>
            </Link>
          </Menubar>
          {isLoggedIn && (
            <div className="ml-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar>
                    <AvatarImage
                      className="rounded-full border-2  border-gray-100 object-cover"
                      src={
                        userImage ||
                        "https://www.creativefabrica.com/wp-content/uploads/2022/09/15/Black-ink-drop-mark-Paint-stain-splatte-Graphics-38548553-1-1-580x387.png"
                      }
                    />
                    <AvatarFallback>??</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Link to="/the-shire">
                    <DropdownMenuItem>My Account</DropdownMenuItem>
                  </Link>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuRadioGroup
                          value={theme}
                          onValueChange={setTheme}
                        >
                          <DropdownMenuRadioItem value="light">
                            <Sun className="mr-2 h-4" /> Light
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="dark">
                            <Moon className="mr-2 h-4" /> Dark
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="system">
                            <SunMoon className="mr-2 h-4" />
                            System
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <Link to="/fellowship">
                    <DropdownMenuItem>About Us</DropdownMenuItem>
                  </Link>

                  <DropdownMenuSeparator />

                  <DropdownMenuLabel onClick={handleLogout}>
                    Logout
                  </DropdownMenuLabel>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {!isLoggedIn && (
            <Button className="ml-4" onClick={() => nav("/you-shall-not-pass")}>
              Login
            </Button>
          )}
        </div>
        {/* mobile top menu */}
        {isLoggedIn && (
          <div className="ml-2 flex md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link to="/the-shire">
                  <DropdownMenuItem>My Account</DropdownMenuItem>
                </Link>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup
                        value={theme}
                        onValueChange={setTheme}
                      >
                        <DropdownMenuRadioItem value="light">
                          <Sun className="mr-2 h-4" /> Light
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="dark">
                          <Moon className="mr-2 h-4" /> Dark
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="system">
                          <SunMoon className="mr-2 h-4" />
                          System
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <Link to="/fellowship">
                  <DropdownMenuItem>About Us</DropdownMenuItem>
                </Link>

                <DropdownMenuSeparator />
                <DropdownMenuLabel onClick={handleLogout}>
                  Logout
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        {!isLoggedIn && (
          <div className="ml-2 flex md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <Link to="/the-shire">
                  <DropdownMenuItem>My Account</DropdownMenuItem>
                </Link>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuRadioGroup
                        value={theme}
                        onValueChange={setTheme}
                      >
                        <DropdownMenuRadioItem value="light">
                          <Sun className="mr-2 h-4" /> Light
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="dark">
                          <Moon className="mr-2 h-4" /> Dark
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="system">
                          <SunMoon className="mr-2 h-4" />
                          System
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <Link to="/fellowship">
                  <DropdownMenuItem>About Us</DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
