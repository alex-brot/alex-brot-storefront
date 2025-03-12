import BlogPostCard from "@modules/blog/components/blog-post-card"
import BlogNav from "@modules/blog/components/blog-nav"
import { PostPreview } from "types/blog"

export default async function BlogsOverviewTemplate({
  previews,
}: {
  previews: PostPreview[]
}) {
  return (
    <>
      <BlogNav />
      <div className="h-16" />
      {/* Wrapper for the page content */}
      <div className="container mx-auto px-4 py-8">
        {/* Responsive grid: 1 column on small screens, 2 on medium, 3 on large */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {previews.map((postPreview) => (
            <BlogPostCard key={postPreview.id} preview={postPreview} />
          ))}
        </ul>
      </div>
    </>
  )
}
