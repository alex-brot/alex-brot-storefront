import BlogNav from "@modules/blog/components/blog-nav"
import { BlogPost } from "types/blog"
import parse from "html-react-parser"
import Image from "next/image"
import probe from "probe-image-size"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { tomorrow } from "react-syntax-highlighter/dist/esm/styles/prism"

function extractImageUrls(html: string): string[] {
  const imageUrls: string[] = []
  const imgTagRegex = /<img [^>]*src="([^"]+)"[^>]*>/g
  let match
  while ((match = imgTagRegex.exec(html)) !== null) {
    imageUrls.push(match[1])
  }
  // Remove duplicates
  return Array.from(new Set(imageUrls))
}

// Helper: get dimensions for an image URL using probe-image-size
async function getImageDimensions(url: string) {
  try {
    const result = await probe(url)
    return { width: result.width, height: result.height }
  } catch (error) {
    console.error(`Failed to get dimensions for ${url}:`, error)
    return null
  }
}

export default async function BlogPostTemplate({ post }: { post: BlogPost }) {
  const imageUrls = extractImageUrls(post.content)
  const dimensionsMap: Record<string, { width: number; height: number }> = {}
  await Promise.all(
    imageUrls.map(async (url) => {
      const dims = await getImageDimensions(url)
      if (dims) {
        dimensionsMap[url] = dims
      }
    })
  )
  const options = {
    replace: (domNode: any) => {
      if (domNode.name === "img") {
        const { src, alt } = domNode.attribs
        const dims = dimensionsMap[src]
        if (dims) {
          // Calculate aspect ratio from dimensions
          const aspectRatio = dims.width / dims.height
          return (
            <div
              className="relative w-full"
              // Use paddingBottom trick to enforce the aspect ratio.
              style={{ paddingBottom: `${100 / aspectRatio}%` }}
            >
              <Image
                src={src}
                alt={alt || ""}
                fill
                className="object-contain"
              />
            </div>
          )
        } else {
          // Fallback: use a default aspect ratio if dimensions aren't available
          return (
            <div className="relative w-full aspect-video">
              <Image
                src={src}
                alt={alt || ""}
                fill
                className="object-contain"
              />
            </div>
          )
        }
      } else if (domNode.name === "pre") {
        if (domNode.children[0].name === "code") {
          const codeString = domNode.children[0].children[0].data
          const language = domNode.children[0].attribs.class.split("-")[1]

          return (
            <SyntaxHighlighter language={language} style={tomorrow}>
              {codeString}
            </SyntaxHighlighter>
          )
        } else return domNode
      } else if (
        domNode.name === "input" &&
        domNode.attribs.type === "checkbox"
      ) {
        return (
          <input
            type="checkbox"
            readOnly
            checked={domNode.attribs.checked === "checked"}
          />
        )
      }
    },
  }

  return (
    <>
      <BlogNav />
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

        <div className="mt-4 strapi-content">
          {parse(post.content, options)}
        </div>
      </article>
    </>
  )
}
