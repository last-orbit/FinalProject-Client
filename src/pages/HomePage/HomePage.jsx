import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import Hero from "@/components/Hero";
//Components

const HomePage = () => {
  const nav = useNavigate();
  return (
    <>
      <div className="min-h-screen">
        <Hero />
        <p
          className="p-2 mt-6
        "
        >
          Discover Art, Swipe Pieces, Build your collection
        </p>
        <Button
          className="m-4 w-52"
          onClick={() => nav("/the-eagles-are-coming")}
        >
          Start Swipe
        </Button>
      </div>
    </>
  );
};

export default HomePage;
