import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { API_URL } from "@/config/apiUrl.config";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import { Blurhash } from "react-blurhash";

//Components
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
const Hero = () => {
  //Setters
  const [isLoading, setIsLoading] = useState(true);
  const [imageSample, setImageSample] = useState([]);

  //Functions
  //Get 4 images
  const getImageSample = async () => {
    try {
      setIsLoading(true);

      // Calling for 10 images
      const response = await axios.get(`${API_URL}/image/random`);
      console.log("image sample =", response.data);
      setImageSample(response.data);
      // update the loading state to display the cards
      setIsLoading(false);
    } catch (error) {
      console.log("Error getting image sample:", error);
    }
  };

  //Hooks
  useEffect(() => {
    getImageSample();
  }, []);
  console.log(imageSample);

  if (isLoading || !imageSample.length) return <div>Loading...</div>;
  if (imageSample)
    return (
      <div className="relative h-[70vh] overflow-hidden flex flex-col items-center justify-center">
        {/* Title */}
        <div className="absolute z-10 ">
          <h1 className="relative text-4xl md:text-6xl font-bold text-center p-5 bg-white/50 backdrop-blur-[2px] w-screen">
            Welcome to Art Swap
          </h1>
        </div>

        {/* Parallax Image Grid */}
        <div className="grid grid-cols-2 gap-y-4">
          <Parallax speed={-10}>
            <Card className="relative w-[170px] h-[200px] md:w-[260px] md:h-[300px] bg-white rounded-2xl shadow-lg overflow-hidden -mr-4 md:-mr-8">
              <Blurhash
                hash={imageSample[0].blur_hash}
                width={400}
                height={300}
                resolutionX={32}
                resolutionY={32}
                punch={1}
                className="absolute inset-0 w-full h-full object-cover blur-md"
              />
              <img
                src={`${imageSample[0].photo_image_url}?q=30&format=auto`}
                alt={imageSample[0].ai_description}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setIsLoading(false)}
              />
            </Card>
          </Parallax>
          <Parallax speed={15}>
            <Card className="relative w-[170px] h-[200px] md:w-[260px] md:h-[300px] bg-white rounded-2xl shadow-lg overflow-hidden mt-10 -mr-4 md:-ml-8">
              <Blurhash
                hash={imageSample[1].blur_hash}
                width={400}
                height={300}
                resolutionX={32}
                resolutionY={32}
                punch={1}
                className="absolute inset-0 w-full h-full object-cover blur-md"
              />
              <img
                src={`${imageSample[1].photo_image_url}?q=30&format=auto`}
                alt={imageSample[1].ai_description}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setIsLoading(false)}
              />
            </Card>
          </Parallax>

          <Parallax speed={-15}>
            <Card className="relative w-[170px] h-[200px] md:w-[260px] md:h-[300px] bg-white rounded-2xl shadow-lg overflow-hidden -mr-4 md:-mr-8">
              <Blurhash
                hash={imageSample[2].blur_hash}
                width={400}
                height={300}
                resolutionX={32}
                resolutionY={32}
                punch={1}
                className="absolute inset-0 w-full h-full object-cover blur-md"
              />
              <img
                src={`${imageSample[2].photo_image_url}?q=30&format=auto`}
                alt={imageSample[2].ai_description}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setIsLoading(false)}
              />
            </Card>
          </Parallax>
          <Parallax speed={10}>
            <Card className="relative w-[170px] h-[200px] md:w-[260px] md:h-[300px] bg-white rounded-2xl shadow-lg overflow-hidden -mr-4 md:-ml-8">
              <Blurhash
                hash={imageSample[3].blur_hash}
                width={400}
                height={300}
                resolutionX={32}
                resolutionY={32}
                punch={1}
                className="absolute inset-0 w-full h-full object-cover blur-md"
              />
              <img
                src={`${imageSample[3].photo_image_url}?q=30&format=auto`}
                alt={imageSample[3].ai_description}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={() => setIsLoading(false)}
              />
            </Card>
          </Parallax>
        </div>
      </div>
    );
};

export default Hero;
