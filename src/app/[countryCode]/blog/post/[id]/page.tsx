import React from "react"
import { notFound } from "next/navigation"
import { BlogPost as BlogPostType, PostPreview } from "types/blog"
import { getPostById, getPostsPreview } from "@lib/data/blog/strapi-api"
import "styles/strapi-content.css"
import BlogPostTemplate from "@modules/blog/templates/blog-post"
import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"

async function getPost(id: string) {
  const post: BlogPostType = await getPostById(id)
  if (!post) notFound()
  return post
}

export async function generateStaticParams() {
  const countryCodes = await listRegions().then(
    (regions: StoreRegion[]) =>
      regions
        ?.map((r) => r.countries?.map((c) => c.iso_2))
        .flat()
        .filter(Boolean) as string[]
  )

  const posts = await getPostsPreview()

  const staticParams = countryCodes
    ?.map((countryCode: string) =>
      posts.map((post: PostPreview) => ({
        countryCode,
        id: post.id,
      }))
    )
    .flat()
  return staticParams
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPost(id)

  return {
    title: post.title,
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const post = await getPost(id)

  return <BlogPostTemplate post={post} />
}
