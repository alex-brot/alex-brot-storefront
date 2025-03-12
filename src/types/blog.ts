export interface PostPreview {
  id: string
  featuredImage?: string
  title: string
  date: string
}

export interface BlogPostsResponse {
  data: BlogPost[]
  meta: Meta
}

export interface SingleBlogPostResponse{
  data: BlogPost
  meta: Meta
} 

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount: number
  total: number
}

export interface Media {
  id: number
  documentId: string
  name: string
  alternativeText: null
  caption: null
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: null
  provider: string
  provider_metadata: null
  createdAt: Date
  updatedAt: Date
  publishedAt: Date
}

export interface Formats {
  thumbnail: File
  large: File
  medium: File
  small: File
}

export interface File {
  name: string
  hash: string
  ext: string
  mime: string
  path: null
  width: number
  height: number
  size: number
  sizeInBytes: number
  url: string
}


export interface BlogPost {
  id: number
  featuredImage: Media
  documentId: string
  title: string
  publishedAt_real: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  content: string
}

