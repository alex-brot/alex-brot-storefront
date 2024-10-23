import { Github } from "@medusajs/icons"
import { Button, Heading } from "@medusajs/ui"
import Image from "next/image"

const Hero = () => {
  return (
    <div className="h-[75vh] w-full border-b border-ui-border-base relative bg-ui-bg-subtle">
      <Image
        src="https://images.alphacoders.com/200/200263.jpg"
        alt="Bread"
        width={0}
        height={0}
        sizes="100vw"
        unoptimized
        style={{ width: "100%", height: "127%"}}
        className="brightness-50"
      />
      <div className="absolute inset-0 z-10 flex flex-col justify-center ml-96 mt-20 small:p-32 gap-6">
        <span className="leading-10">
          <Heading
            level="h1"
            className="text-8xl font-normal text-white "
          >
            Frisch
          </Heading>
          <Heading
            level="h1"
            className="text-8xl font-normal text-white "
          >
            gebacken
          </Heading>
          <Heading
            level="h2"
            className="text-8xl pt-5 font-normal text-white"
          >
            lokal geliebt.
          </Heading>
        </span>

        <div className="mt-10 hover:-translate-y-0.5 duration-150">
          <a href="/at/store"
             className="text-lg text-white px-3.5 py-3 bg-blue-500 rounded-lg hover:bg-blue-600 duration-150">
            Jetzt Bestellen
          </a>
        </div>
      </div>
    </div>
  )
}

export default Hero
