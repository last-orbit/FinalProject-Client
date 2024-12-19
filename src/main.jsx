import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextWrapper } from "./contexts/AuthContext";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ParallaxProvider>
      <BrowserRouter>
        <AuthContextWrapper>
          <App />
        </AuthContextWrapper>
      </BrowserRouter>
    </ParallaxProvider>
  </StrictMode>
);
