import React from "react"
import { BlogPost } from "./post/[id]/page"
import Link from "next/link"

interface PostPreview {
  id: string
  headerImage?: string
  title: string
  date: string
}

export default async function BlogOverviewPage() {
  const res = await fetch(`${process.env.BLOG_POST_URL}`)
  const postPreviews: PostPreview[] = (await res.json()).map(
    (post: BlogPost) => ({ id: post.id, title: post.title, date: post.date })
  )

  console.log("Rendering BlogOverviewPage")

  return (
    <div>
      {postPreviews.map((postPreview, index) => (
        <Link href={`/blog/post/${postPreview.id}`} key={postPreview.id}>
          <div key={postPreview.id}>
            {postPreview.headerImage && (
              <img src={postPreview.headerImage} alt={postPreview.title} />
            )}
            <h3>{postPreview.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  )
}
