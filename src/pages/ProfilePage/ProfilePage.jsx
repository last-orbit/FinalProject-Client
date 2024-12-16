import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { API_URL } from "../../../config";
import axios from "axios";

//Components
import { Button } from "@/components/ui/button";
import { Pencil, LockKeyhole } from "lucide-react";

const ProfilePage = () => {
  //Setters
  const { user, isLoggedIn } = useContext(AuthContext);
  const [userInfos, setUserInfos] = useState({});

  //Hooks
  useEffect(() => {
    if (isLoggedIn && user) {
      //to get the user information
      const getUserInfos = async () => {
        try {
          const response = await axios.get(`${API_URL}/user/${user._id}`);
          console.log("Full response:", response.data);
          setUserInfos(response.data.oneUser);
        } catch (error) {
          console.log("Didn't manage to get user infos", error);
        }
      };
      getUserInfos();
    }
  }, [isLoggedIn]);

  return (
    <div>
      <h1 className="text-3xl p-7 font-semibold uppercase">My Profile</h1>
      <div className="flex justify-center items-center">
        <img
          className="w-40 rounded-full border-2  border-gray-300"
          src={userInfos.image}
          alt={userInfos.username}
        />

        <div className="flex flex-col w-3/5 h-40 items-start justify-around ml-4">
          <h2 className="text-2xl font-semibold p-2font-semibold">
            {userInfos.username}
          </h2>
          <h2 className="text-xl">{userInfos.email}</h2>

          <div>
            <Button className="mr-2">
              <Pencil /> Edit Profile
            </Button>
            <Button variant="destructive">
              <LockKeyhole /> Update Password
            </Button>
          </div>
        </div>
      </div>
      <h1 className="text-3xl p-7 font-semibold uppercase">My Friends</h1>
    </div>
  );
};

export default ProfilePage;
