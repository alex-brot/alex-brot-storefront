import Image from "next/image"
import { ParallaxBanner } from "react-scroll-parallax"
import { HeroSectionCTA } from "@modules/home/components/hero/HeroSection"

function HeroSectionParallax({
  fileType = "image",
  src,
  className,
  text,
}: {
  fileType?: "video" | "image"
  src: string
  className?: string
  text: React.ReactNode
}) {
  return (
    <section id="hero">
      <ParallaxBanner
        layers={[
          {
            children: (
              <>
                {fileType === "video" && (
                  <video
                    controls={false}
                    autoPlay
                    loop
                    muted
                    className="h-full object-cover absolute "
                  >
                    <source src={src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
                {fileType === "image" && (
                  <Image
                    src={src}
                    alt="heroimage"
                    fill
                    className="h-full aspect-video absolute"
                    objectFit="cover"
                  />
                )}
              </>
            ),
            translateY: [-60, 0],
            speed: -50,
          },
          {
            speed: -25,
            children: (
              <div className="bg-black bg-opacity-40 w-full h-full flex items-center absolute top-1/2 -translate-y-1/2">
                <div className="container w-5/6">
                  <h1 className="text-primary-light md:text-8xl text-7xl md:w-1/2 font-bold">
                    {text}
                  </h1>

                  <div className="mt-8">
                    <HeroSectionCTA />
                  </div>
                </div>
              </div>
            ),
          },
        ]}
        className={`wrapper relative w-full h-[80vh] ${className}`}
      />
    </section>
  )
}

export default HeroSectionParallax
