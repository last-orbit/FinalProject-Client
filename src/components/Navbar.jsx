import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { API_URL } from "../../config";
import axios from "axios";
import { Link, NavLink } from "react-router-dom";

//Medias
import LogoLight from "../assets/LogoLight.png";
import LogoDark from "../assets/LogoDark.png";

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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const { user, isLoggedIn, handleLogout } = useContext(AuthContext);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    if (isLoggedIn && user) {
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
    <div className="flex justify-center md:justify-between items-center shadow-md w-full p-2 ">
      <Link to="/">
        <img
          className=" w-10 h-10 md:w-16 md:h-16"
          src={LogoLight}
          alt="Logo"
        />
      </Link>
      <div className="flex justify-center items-start ">
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
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                </Link>
                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
