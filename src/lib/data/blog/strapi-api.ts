import {
  BlogPost,
  BlogPostsResponse,
  PostPreview,
  SingleBlogPostResponse,
} from "types/blog"
import { fetchStrapi } from "."

export const getPostsPreview = async (): Promise<PostPreview[]> => {
  const { data: blogposts } = await fetchStrapi<BlogPostsResponse>(
    "api/blog-posts?sort[0]=publishedAt_real:desc&sort[1]=publishedAt:desc&populate=featuredImage"
  )

  return blogposts.map((post: BlogPost) => ({
    id: post.documentId,
    title: post.title,
    date: post.publishedAt_real ? post.publishedAt_real : post.publishedAt,
    featuredImage: post.featuredImage?.url
      ? process.env.BLOG_POST_URL + post.featuredImage.url
      : undefined,
  }))
}

export const getPostById = async (documentId: string): Promise<BlogPost> => {
  const { data: blogpost } = await fetchStrapi<SingleBlogPostResponse>(
    `api/blog-posts/${documentId}`
  )
  return blogpost
}
