import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { API_URL } from "../../config";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";
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

const Navbar = () => {
  //Setters
  const { user, isLoggedIn, handleLogout } = useContext(AuthContext);
  const [userImage, setUserImage] = useState(null);
  const { theme, setTheme } = useTheme();

  //Hooks
  useEffect(() => {
    if (isLoggedIn && user) {
      //to get the user image for the avatar
      const getUserImage = async () => {
        try {
          const response = await axios.get(`${API_URL}/user/${user._id}`);
          console.log("Full response:", response.data.image);
          setUserImage(response.data.oneUser.image);
          console.log(response.data.oneUser.image);
        } catch (error) {
          console.log("Didn't manage to get user image", error);
        }
      };
      getUserImage();
    }
  }, [isLoggedIn, userImage]);

  return (
    <div className="flex justify-between items-center shadow-md w-full p-2 ">
      <Link to="/">
        <img
          className=" w-10 h-10 md:w-16 md:h-16"
          src={theme === "dark" ? LogoDark : LogoLight}
          alt="Logo"
        />
      </Link>
      <div className="flex justify-center items-start ">
        {/* desktop top menu */}
        <div className="hidden md:flex">
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
            <Link to="/whats-up">
              <MenubarMenu>
                <MenubarTrigger>My Feed</MenubarTrigger>
              </MenubarMenu>
            </Link>
          </Menubar>
          <div className="ml-2">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    className="rounded-full border-2  border-gray-100"
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
                          <Sun className="mr-2 h-4" />
                          Light
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="dark">
                          <Moon className="mr-2 h-4" />
                          Dark
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="system">
                          <SunMoon className="mr-2 h-4" />
                          System
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>

                <DropdownMenuSeparator />

                <DropdownMenuLabel>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout{" "}
                  </DropdownMenuItem>
                </DropdownMenuLabel>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* mobile top menu */}

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
                        <SunMoon className="mr-2 h-4" /> System
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>

              <DropdownMenuSeparator />

              <DropdownMenuLabel onClick={handleLogout}>
                Logout
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
