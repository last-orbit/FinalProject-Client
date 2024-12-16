import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { API_URL } from "../../../config";
import axios from "axios";

//Components
import { Button } from "@/components/ui/button";
import { Pencil, LockKeyhole } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
      console.error(error.response?.data?.message || "Error updating password");
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  //Hooks
  useEffect(() => {
    if (isLoggedIn && user) {
      getUserInfos();
    }
  }, [isLoggedIn, user]);

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

          {/* Desktop edit buttons */}
          {/* Edit profile */}
          <div className="hidden md:block">
            <Dialog open={openEditProfile} onOpenChange={setOpenEditProfile}>
              <DialogTrigger asChild>
                <Button className="mr-2">
                  <Pencil /> Edit Profile
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                  <form onSubmit={handleSubmit}>
                    <div className="flex justify-center items-center my-4">
                      <Label className="mr-2">Name</Label>
                      <Input
                        type="text"
                        id="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-center items-center my-4">
                      <Label className="mr-2">Email</Label>
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
                </DialogHeader>
              </DialogContent>
            </Dialog>

            {/* Edit password */}
            <Dialog
              open={openUpdatePassword}
              onOpenChange={setOpenUpdatePassword}
            >
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <LockKeyhole /> Update Password
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                  <form onSubmit={handleSubmitPassword}>
                    <div className="flex justify-center items-center my-4">
                      <Label className="mr-2">Old password</Label>
                      <Input
                        type="password"
                        id="oldPassword"
                        placeholder="Old password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-center items-center my-4">
                      <Label className="mr-2">New Password</Label>
                      <Input
                        type="password"
                        id="newPassword"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>
                    <div className="flex justify-center items-center my-4">
                      <Label className="mr-2">Confirmation</Label>
                      <Input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm your new Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <div className="my-2 flex justify-end">
                      <Button disabled={newPassword !== confirmPassword}>
                        Change Password
                      </Button>
                    </div>
                  </form>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-3xl p-7 font-semibold uppercase">My Friends</h1>
      </div>
      {/* Drawer */}

      {/* Dialog */}
    </div>
  );
};

export default ProfilePage;
