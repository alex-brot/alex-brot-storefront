import Image from "next/image"
import { HeroSectionCTA } from "@modules/home/components/hero/HeroSection"

function HeroSectionReducedMotion({
  src,
  text,
}: {
  src: string
  text: React.ReactNode
}) {
  return (
    <section id="hero" className="">
      <div className="image-wrapper relative w-full">
        <div className="relative h-[38rem]">
          <Image
            src={src}
            alt="heroimage"
            fill
            className="h-full aspect-video absolute"
            objectFit="cover"
          />
        </div>
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
      </div>
    </section>
  )
}

export default HeroSectionReducedMotion
