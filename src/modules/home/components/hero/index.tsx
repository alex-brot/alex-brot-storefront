"use client"

import { ParallaxProvider } from "react-scroll-parallax"
import HeroSection from "./HeroSection"


const Hero = () => {
  return (
    <ParallaxProvider>
      <HeroSection
        src="/public-assets/hero-video.mp4"
        reducedMotionSrc="/public-assets/hero-image.jpg"
        fileType="video"
        text={
          <>
            Frisch gebacken, <br />
            lokal geliebt.
          </>
        }
      />
    </ParallaxProvider>
  )
}

export default Hero
