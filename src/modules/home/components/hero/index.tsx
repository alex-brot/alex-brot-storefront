import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <Image
        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmFhZXl5bGZqN21odTl0N211ZG8xYTVrajl1aXRkZ3o0YmU2ZnF3MSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3q2xWsutZRLaiK5y/giphy.webp"
        alt="Bread"
        width={0}
        height={0}
        sizes="100vw"
        unoptimized
        style={{ width: "100%", height: "auto" }}
      />
      <div className="absolute inset-0 z-10 flex flex-col justify-center items-center text-center small:p-32 gap-6">
        <span className="">
          <Heading
            level="h1"
            className="text-3xl leading-10 font-normal text-white "
          >
            Get your bread fresher than ever
          </Heading>
          <Heading
            level="h2"
            className="text-3xl leading-10 text-slate-50"
          >
            Order online and take away
          </Heading>
        </span>
      </div>
    </div>
  )
}

export default Hero
