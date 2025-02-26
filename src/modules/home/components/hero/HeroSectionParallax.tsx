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
                <div
                    className="bg-black bg-opacity-40 w-full h-full flex items-center absolute top-1/2 -translate-y-1/2">
                    <div className="container flex justify-evenly w-full">
                        <div className=" flex flex-col justify-center">
                            <h1 className="text-primary-light text-8xl font-bold">
                                {text}
                            </h1>

                            <div className="mt-20 justify-center md:justify-start">
                                <LocalizedClientLink href="/store" className="">
                                    <Button
                                        className="border-2 text-black border-black bg-secondary-light px-4 py-1.5 font-semibold rounded-lg duration-150 text-2xl">
                                        Jetzt bestellen
                                    </Button>
                                </LocalizedClientLink>
                            </div>
                        </div>

                        <div className="z-10 mt-20 flex justify-end">
                            <img className="w-full max-w-[550px] md:w-[550px] h-auto" src="/public-assets/persons/alex_cutout.png"
                                 alt="alex_cutout" width={550} height={550}/>
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
