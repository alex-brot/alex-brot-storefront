import { PostPreview } from "types/blog"
import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function BlogPostCard({
  preview,
}: {
  preview: PostPreview
}) {
  // Format the date for locale "de-AT" including date and time
  const formattedDate = new Date(preview.date).toLocaleString("de-AT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <li>
      <LocalizedClientLink href={`/blog/post/${preview.id}`} className="block">
        <div className="bg-white border border-gray rounded-xl overflow-hidden hover:shadow-lg hover:scale-105 duration-300">
          {preview.featuredImage && (
            <div className="relative h-48">
              <Image
                src={preview.featuredImage}
                alt={preview.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{preview.title}</h3>
            <p className="text-sm text-gray-500">{formattedDate}</p>
          </div>
        </div>
      </LocalizedClientLink>
    </li>
  )
}
