'use server'

import { revalidatePath } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { secret }: {secret: string} = await req.json()

  if (secret !== process.env.REVALIDATE_SECRET) {
    return new NextResponse(JSON.stringify({ error: "Invalid secret" }), {
      status: 401,
    })
  }

  try {
    console.log("Revalidating /blog")
    revalidatePath("/blog", "page")
    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
    })
  } catch (err: any) {
    return new NextResponse(JSON.stringify({ error: err.message }), {
      status: 500,
    })
  }
}
