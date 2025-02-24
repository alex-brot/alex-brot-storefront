import React from "react"
import { notFound } from "next/navigation"
import { BlogPost as BlogPostType } from "types/blog"
import { getPostById, getPostsPreview } from "@lib/data/blog/strapi-api"
import "styles/strapi-content.css"
import Nav from "@modules/layout/templates/nav"

async function getPost(id: string) {
  const post: BlogPostType = await getPostById(id)
  if (!post) notFound()
  return post
}

export async function generateStaticParams() {
  const posts = await getPostsPreview()

  return posts.map((post) => ({
    id: String(post.id),
  }))
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

  return (
    <>
      <Nav />
      <div className="h-16" />
      <article className="prose max-w-4xl mx-auto p-4">
        <div className="mt-4 flex items-center justify-between">
          <h1 className="text-4xl font-bold align-middle">{post.title}</h1>
          <div className="text-gray-600">
            <span className="text-sm text-gray">erschienen am</span>
            <br />
            <span>
              {new Date(
                post.publishedAt_real ? post.publishedAt_real : post.publishedAt
              ).toLocaleDateString("de-AT", {
                weekday: "long", // e.g., Montag
                day: "2-digit", // e.g., 01
                month: "long", // e.g., Januar
                year: "numeric", // e.g., 2025
                hour: "2-digit", // e.g., 09 or 21
                minute: "2-digit", // e.g., 05
              })}
            </span>
          </div>
        </div>

        <div
          className="mt-4 strapi-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </>
  )
}
