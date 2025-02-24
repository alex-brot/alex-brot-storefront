import { Metadata } from "next"

import Hero from "@modules/home/components/hero"
import { listCollections } from "@lib/data/collections"
import { getRegion } from "@lib/data/regions"
import { PostPreview } from "types/blog"
import { getPostsPreview } from "@lib/data/blog/strapi-api"
import BlogPostCard from "@modules/blog/components/blog-post-card"

export const metadata: Metadata = {
  title: "Medusa Next.js Starter Template",
  description:
    "A performant frontend ecommerce starter template with Next.js 14 and Medusa.",
}

export default async function Home(props: {
  params: Promise<{ countryCode: string }>
}) {
  const params = await props.params

  const { countryCode } = params

  const region = await getRegion(countryCode)

  const { collections } = await listCollections({
    fields: "id, handle, title",
  })

  if (!collections || !region) {
    return null
  }

  const postPreviews: PostPreview[] = await getPostsPreview()
  
  return (
    <>
      <Hero />
      <div className="py-12 featured-products-wrapper">
        <div className="container mx-auto px-4 py-8">
          {/* Responsive grid: 1 column on small screens, 2 on medium, 3 on large */}
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {postPreviews.map((postPreview) => (
              <BlogPostCard key={postPreview.id} preview={postPreview} />
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
