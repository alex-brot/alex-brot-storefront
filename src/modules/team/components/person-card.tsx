import Image from "next/image"

function PersonCard({
  name,
  description,
  image,
  size,
}: {
  name: string
  description: string
  image: string
  size: "small" | "large"
}) {
  return (
    <div
      className={`${
        size == "small" ? "" : "md:flex-row"
      } card flex flex-col gap-4 items-center`}
    >
      <div
        className={`image-wrapper relative ${
          size == "small" ? "md:w-28 w-48" : "w-72"
        } aspect-square`}
      >
        <Image
          src={image}
          alt={name}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
      </div>
      <div
        className={`${
          size == "small"
            ? "md:items-center md:text-center"
            : "md:text-left md:mt-12 "
        } flex items-center flex-col md:items-start`}
      >
        <h5 className={`${size == "small" ? "text-xl" : "text-4xl"} font-bold`}>
          {name}
        </h5>
        <p className={`${size == "small" ? "hidden" : ""} sm:w-2/3`}>
          {description}
        </p>
      </div>
    </div>
  )
}

export default PersonCard
