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

function App() {
  return (
    <main>
      <ThemeProvider>
        <Navbar />
        <Routes>
          <Route path="/i'm-going-on-an-adventure" element={<SignupPage />} />
          <Route path="/you-shall-not-pass" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route
            path="/for-frodo"
            element={
              <ProtectedRoute>
                <ImagePage />
              </ProtectedRoute>
            }
          />

          <Route path="/fellowship" element={<AboutUs />} />
          <Route
            path="/the-shire"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-precious"
            element={
              <ProtectedRoute>
                <MyCollection />
              </ProtectedRoute>
            }
          />
          <Route
            path="/the-eagles-are-coming"
            element={
              <ProtectedRoute>
                <ShufflePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/whats-up"
            element={
              <ProtectedRoute>
                <MyFeedPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
      <Footer />
    </main>
  );
}

export default App;
