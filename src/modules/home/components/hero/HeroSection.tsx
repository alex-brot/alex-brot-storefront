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

export default HeroSection