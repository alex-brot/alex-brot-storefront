import React from "react"
import { notFound } from "next/navigation"

export interface BlogPost {
  id: string
  title: string
  content: string
  date: string
}

async function getPost(id: string) {
  const res = await fetch(`${process.env.BLOG_POST_URL}/${id}`, {
    cache: "force-cache",
  })
  const post: BlogPost = await res.json()
  if (!post) notFound()
  return post
}

export async function generateStaticParams() {
  const posts = await fetch(`${process.env.BLOG_POST_URL}`, {
    cache: "force-cache",
  }).then((res) => res.json())
 
  return posts.map((post: BlogPost) => ({
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

export default async function BlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPost(id)

  return (
    <article>
      <div>{id}</div>
      <div>{post.date}</div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
