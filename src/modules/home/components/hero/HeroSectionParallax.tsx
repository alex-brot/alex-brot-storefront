import Image from "next/image"
import { ParallaxBanner } from "react-scroll-parallax"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@medusajs/ui"

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
              <div className="bg-black bg-opacity-40 w-full h-full flex items-center relative top-1/2 -translate-y-1/2">
                <div className="container flex justify-evenly w-full absolute">
                  <div className=" flex flex-col justify-center">
                    <h1 className="text-primary-light text-8xl font-bold">
                      {text}
                    </h1>

                    <div className="mt-14 justify-center md:justify-start">
                      <LocalizedClientLink href="/store" className="">
                        <Button className="px-6 py-2 font-semibold rounded-lg text-black bg-secondary-light hover:bg-secondary-lighter ease-in-out duration-150 text-lg">
                          Jetzt bestellen
                        </Button>
                      </LocalizedClientLink>
                    </div>
                  </div>

                  <div className="z-10 mt-44 flex justify-end">
                    <img
                      className="w-0 max-w-[500px] md:w-[450px] lg:w-[600px] h-auto"
                      src="/public-assets/persons/alex_cutout.png"
                      alt="alex_cutout"
                      width={500}
                      height={500}
                    />
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
