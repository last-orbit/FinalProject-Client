import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { API_URL } from "../config/apiUrl.config";
import axios from "axios";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Footer.css";
import { useTheme } from "@/components/ThemeProvider";
//Component
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight, Shuffle, Library, Newspaper } from "lucide-react";
import { ThemeProvider } from "./ThemeProvider";

const Footer = () => {
  //Setters
  const { user, isLoggedIn, handleLogout } = useContext(AuthContext);
  const userImage = user?.image;

  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const nav = useNavigate();

  const isProfilePage = location.pathname.startsWith("/the-shire");
  const isCollectionPage = location.pathname.startsWith("/my-precious");
  const isMyFeedPage = location.pathname.startsWith("/whats-up");
  const isShufflePage = location.pathname.startsWith("/the-eagles-are-coming");

  //Hooks
  useEffect(() => {
    if (isLoggedIn && user) {
      // //to get the user image for the avatar
      // const getUserImage = async () => {
      //   try {
      //     const response = await axios.get(`${API_URL}/user/${user._id}`);
      //     // console.log("Full response:", response.data.image);
      //     setUserImage(response.data.oneUser.image);
      //     // console.log(response.data.oneUser.image);
      //   } catch (error) {
      //     console.log("Didn't manage to get user image", error);
      //   }
      // };
      // getUserImage();
    }
  }, [isLoggedIn, userImage]);

  return (
    <div>
      <div
        className={`w-full fixed h-12 bottom-0 flex justify-around items-center shadow-top md:hidden ${
          theme === "dark" ? "bg-black" : "bg-white"
        } `}
      >
        <Button
          variant={isShufflePage ? "default" : "outline"}
          size="icon"
          onClick={() => nav("/the-eagles-are-coming")}
        >
          <Shuffle />
        </Button>
        <Button
          variant={isCollectionPage ? "default" : "outline"}
          size="icon"
          onClick={() => nav("/my-precious")}
        >
          <Library />
        </Button>
        <Button
          variant={isMyFeedPage ? "default" : "outline"}
          size="icon"
          onClick={() => nav("/whats-up")}
        >
          <Newspaper />
        </Button>
        <Link to="the-shire">
          <Avatar>
            <AvatarImage
              className={
                isProfilePage
                  ? "rounded-full border-2  border-gray-500 object-cover"
                  : "rounded-full border-2  border-gray-100 object-cover"
              }
              src={
                userImage ||
                "https://www.creativefabrica.com/wp-content/uploads/2022/09/15/Black-ink-drop-mark-Paint-stain-splatte-Graphics-38548553-1-1-580x387.png"
              }
            />
            <AvatarFallback>??</AvatarFallback>
          </Avatar>
        </Link>
      </div>
      <div className="hidden md:w-full md:h-12  md:bottom-0 md:flex md:justify-around md:items-center shadow-top ">
        Follow this project on github !
      </div>
    </div>
  );
};

export default Footer;
