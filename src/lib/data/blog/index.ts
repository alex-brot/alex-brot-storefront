export const fetchStrapi = async <T>(url: string): Promise<T> => {
  const res = await fetch(`${process.env.BLOG_POST_URL}/${url}`, {
    headers: {
      Authorization: `Bearer ${process.env.BLOG_API_TOKEN}`,
    },
    
  })
  return (await res.json()) as T
}

