import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { API_URL } from "../../../config";
import axios from "axios";

//Components
import { Button } from "@/components/ui/button";
import { Pencil, LockKeyhole, Terminal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const ProfilePage = () => {
  //Setters
  const { user, isLoggedIn } = useContext(AuthContext);
  const [userInfos, setUserInfos] = useState({});
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("***");

  const [errorMessage, setErrorMessage] = useState(null);

  //For dialog & drawer
  const [openEditProfile, setOpenEditProfile] = useState(false);
  const [openUpdatePassword, setOpenUpdatePassword] = useState(false);

  //Functions
  //to get the user information
  const getUserInfos = async () => {
    try {
      const response = await axios.get(`${API_URL}/user/${user._id}`);
      // console.log("Full response:", response.data);
      setUserInfos(response.data.oneUser);
      setUsername(response.data.oneUser.username);
      setEmail(response.data.oneUser.email);
    } catch (error) {
      console.log("Didn't manage to get user infos", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userToUpdate = {
      username,
      email,
    };

    try {
      const respopnse = await axios.put(
        `${API_URL}/user/update/${user._id}`,
        userToUpdate
      );
      setUserInfos({
        ...userInfos,
        username: userToUpdate.username,
        email: userToUpdate.email,
      });
      getUserInfos();
      setOpenEditProfile(false);
      console.log("user updated");
    } catch (error) {
      console.log("failed to update user", error);
    }
  };

  const handleSubmitPassword = async (e) => {
    e.preventDefault();
    const passwordToUpdate = {
      email,
      oldPassword,
      newPassword,
    };

    try {
      const response = await axios.put(
        `${API_URL}/user/update-password/${user._id}`,
        {
          oldPassword,
          newPassword,
        }
      );
      console.log(response.data.message);
      alert("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);
      console.log(error.response.data.message);
      setErrorMessage(error.response.data.message);
    }
  };

  //Hooks
  useEffect(() => {
    if (isLoggedIn && user) {
      getUserInfos();
    }
  }, [isLoggedIn, user]);

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl p-7 font-semibold uppercase">My Profile</h1>
      <div className="flex justify-center items-center">
        <img
          className="w-40 h-40 rounded-full border-2 object-cover border-gray-300"
          src={userInfos.image}
          alt={userInfos.username}
        />

        <div className="flex flex-col h-40 items-start justify-around ml-4">
          <h2 className="text-2xl font-semibold p-2font-semibold">
            {userInfos.username}
          </h2>
          <h2 className="text-xl">{userInfos.email}</h2>

          {/* Mobile version */}
          {/* Edit profile */}
          <div>
            <Drawer
              open={openEditProfile}
              onOpenChange={setOpenEditProfile}
              className=""
            >
              <DrawerTrigger asChild>
                <Button className="mr-2">
                  <Pencil /> Edit Profile
                </Button>
              </DrawerTrigger>
              <DrawerContent className="mx-2 p-4">
                <DrawerHeader>
                  <DrawerTitle>Edit profile</DrawerTitle>
                  <DrawerDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DrawerDescription>
                </DrawerHeader>
                <form onSubmit={handleSubmit}>
                  <div className="flex justify-center items-center my-4">
                    <Label className="mx-2 p-4">Name</Label>
                    <Input
                      type="text"
                      id="username"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center items-center my-4">
                    <Label className="mx-2 p-4">Email</Label>
                    <Input
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="my-2 flex justify-end">
                    <Button>Save changes</Button>
                  </div>
                </form>
              </DrawerContent>
            </Drawer>

            {/* Edit password */}
            <Drawer
              open={openUpdatePassword}
              onOpenChange={setOpenUpdatePassword}
            >
              <DrawerTrigger asChild>
                <Button variant="destructive">
                  <LockKeyhole /> Update Password
                </Button>
              </DrawerTrigger>
              <DrawerContent className="mx-2 p-4">
                <DrawerHeader>
                  <DrawerTitle>Change password</DrawerTitle>
                  <DrawerDescription>
                    You can update your password below...
                  </DrawerDescription>
                </DrawerHeader>
                <form onSubmit={handleSubmitPassword}>
                  <div className="flex justify-center items-center my-4">
                    <Label className="mx-4 w-1/6">Old password</Label>
                    <Input
                      type="password"
                      id="oldPassword"
                      placeholder="Old password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center items-center my-4">
                    <Label className="mx-4 w-1/6">New Password</Label>
                    <Input
                      type="password"
                      id="newPassword"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center items-center my-4">
                    <Label className="mx-4 w-1/6">Confirmation</Label>
                    <Input
                      type="password"
                      id="confirmPassword"
                      placeholder="Confirm your new Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  {errorMessage && (
                    <Alert variant="destructive">
                      <Terminal className="h-4 w-4" />
                      <AlertTitle>Oups!</AlertTitle>
                      <AlertDescription>{errorMessage}</AlertDescription>
                    </Alert>
                  )}
                  <div className="my-2 flex justify-end">
                    <Button disabled={newPassword !== confirmPassword}>
                      Change Password
                    </Button>
                  </div>
                </form>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-3xl p-7 font-semibold uppercase">My Friends</h1>
      </div>
    </div>
  );
};

export default ProfilePage;
