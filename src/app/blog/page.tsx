import React from "react"
import Link from "next/link"
import { getPostsPreview } from "@lib/data/blog/strapi-api"
import { PostPreview } from "types/blog"
import Nav from "@modules/layout/templates/nav"

export default async function BlogOverviewPage() {
  const postPreviews: PostPreview[] = await getPostsPreview()

  console.log("Rendering BlogOverviewPage")

  return (
    <>
      <Nav />
      <div className="h-16" />
      {/* Wrapper for the page content */}
      <div className="container mx-auto px-4 py-8">
        {/* Responsive grid: 1 column on small screens, 2 on medium, 3 on large */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {postPreviews.map((postPreview) => (
            <BlogPostCard key={postPreview.id} preview={postPreview} />
          ))}
        </div>
      </div>
    </>
  )
}

export function BlogPostCard({ preview }: { preview: PostPreview }) {
  // Format the date for locale "de-AT" including date and time
  const formattedDate = new Date(preview.date).toLocaleString("de-AT", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })

  return (
    <Link href={`/blog/post/${preview.id}`} className="block">
      <div className="bg-white border border-gray rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        {preview.featuredImage && (
          <img
            src={preview.featuredImage}
            alt={preview.title}
            className="w-full h-48 object-cover"
          />
        )}
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{preview.title}</h3>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
      </div>
    </Link>
  )
}
