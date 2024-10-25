import Image from "next/image"

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
        <div className="bg-black bg-opacity-40 w-full  h-full absolute top-0 flex items-center">
          <div className="container mt-16">
            <h1 className="text-primary-light text-7xl">{text}</h1>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSectionReducedMotion