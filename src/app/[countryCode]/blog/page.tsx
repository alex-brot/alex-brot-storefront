import React from "react"
import { getPostsPreview } from "@lib/data/blog/strapi-api"
import { PostPreview } from "types/blog"
import BlogsOverviewTemplate from "@modules/blog/templates/blogs-overview"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"

export async function generateStaticParams() {
  const countryCodes = await listRegions().then(
    (regions: StoreRegion[]) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[]
  )
  return countryCodes.map((countryCode: string) => ({ countryCode }))
}

export default async function BlogOverviewPage({
  params,
}: {
  params: { countryCode: string }
}) {
  const postPreviews: PostPreview[] = await getPostsPreview()

  console.log("Rendering BlogOverviewPage")

  return <BlogsOverviewTemplate previews={postPreviews} />
}
