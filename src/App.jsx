import { Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import AboutUs from "./pages/AboutUs/AboutUs";
import ImagePage from "./pages/ImagePage/ImagePage";
import MyCollection from "./pages/CollectionPage/MyCollection";
import { ProtectedRoute } from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound/NotFound";
import SignupPage from "./pages/SignUpPage/SignUp";
import Navbar from "./components/Navbar";
import ShufflePage from "./pages/ShuffePage/ShufflePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Footer from "./components/Footer";
import MyFeedPage from "./pages/MyFeed/MyFeedPage";
import { ThemeProvider } from "./components/ThemeProvider";
import axios from "axios";
import { API_URL } from "./config/apiUrl.config";
import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import FriendProfilePage from "./pages/FriendProfilPage/FriendProfilePage";

// import { Toaster } from "@/components/ui/toaster";

function App() {
  const { user } = useContext(AuthContext);
  //FUNCTIONS TO PASS AS PROPS
  //Adding an image to collection (need the user from the useContext)
  const addImageToCollection = async (imageId) => {
    try {
      const response = await axios.post(
        `${API_URL}/collection/addtocollection`,
        {
          userId: user._id,
          imageId: imageId,
        }
      );
    } catch (error) {
      console.log("did not manage to add image to collection", error);
    }
  };

  //removing an image from collection (need the user from the useContext)
  const deleteImageToCollection = async (imageId) => {
    try {
      const response = await axios.delete(
        `${API_URL}/collection/removefromcollection`,
        {
          data: {
            userId: user._id,
            imageId: imageId,
          },
        }
      );
    } catch (error) {
      console.log("did not manage to delete image to collection", error);
    }
  };

  return (
    <main>
      <ThemeProvider>
        <Navbar />
        <Routes>
          <Route path="/i'm-going-on-an-adventure" element={<SignupPage />} />
          <Route path="/you-shall-not-pass" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />

          {/* Use the imageId */}
          <Route
            path="/for-frodo/:imageId"
            element={
              // <ProtectedRoute>
              <ImagePage
                deleteImageToCollection={deleteImageToCollection}
                addImageToCollection={addImageToCollection}
              />
              // </ProtectedRoute>
            }
          />

          <Route path="/fellowship" element={<AboutUs />} />

          {/* Use the token to access to the user ID */}
          <Route
            path="/the-shire"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          {/* Use the token to access to the user ID */}
          <Route
            path="/my-precious"
            element={
              <ProtectedRoute>
                <MyCollection />
              </ProtectedRoute>
            }
          />
          {/* Use the token to access to the user ID */}
          <Route
            path="//a-boromir-to-trust/:friendId"
            element={
              <ProtectedRoute>
                <FriendProfilePage />
              </ProtectedRoute>
            }
          />
          {/* Use the token to access to the user ID */}
          <Route
            path="/the-eagles-are-coming"
            element={
              <ProtectedRoute>
                <ShufflePage
                  deleteImageToCollection={deleteImageToCollection}
                  addImageToCollection={addImageToCollection}
                />
              </ProtectedRoute>
            }
          />
          {/* Use the token to access to the user ID */}
          <Route
            path="/whats-up"
            element={
              <ProtectedRoute>
                <MyFeedPage
                  deleteImageToCollection={deleteImageToCollection}
                  addImageToCollection={addImageToCollection}
                />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Toaster /> */}
        <Footer />
      </ThemeProvider>
    </main>
  );
}

export default App;
