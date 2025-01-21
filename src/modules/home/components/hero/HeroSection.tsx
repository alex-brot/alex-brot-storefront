import HeroSectionParallax from "./HeroSectionParallax"
import HeroSectionReducedMotion from "./HeroSectionReducedMotion"
import { usePrefersReducedMotion } from "@lib/prefers-reduced-motion"

function HeroSection({
  fileType = "video",
  src,
  className,
  text,
  reducedMotionSrc,
}:
  | {
      fileType?: "video"
      src: string
      className?: string
      text: React.ReactNode
      reducedMotionSrc: string
    }
  | {
      fileType?: "image"
      src: string
      className?: string
      text: React.ReactNode
      reducedMotionSrc?: string
    }) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return prefersReducedMotion ? (
    <HeroSectionReducedMotion
      src={fileType === "image" ? src : (reducedMotionSrc as string)}
      text={text}
    />
  ) : (
    <HeroSectionParallax
      fileType={fileType}
      src={src}
      className={className}
      text={text}
    />
  )
}

export function HeroSectionCTA() {
  return <div className="bg-primary-light rounded-lg w-fit h-fit hover:-translate-y-0.5 hover:bg-amber-100 duration-150">
    <button className="py-1.5 px-4 text-xl drop-shadow-md text-black font-bold">Jetzt bestellen</button>
  </div>
}

export default HeroSection
