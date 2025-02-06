"use server"

import { connectToDB } from "@/lib/mongodb"
import { Post } from "@/lib/models/post"
import { auth } from "@clerk/nextjs/server"

export async function createPost(data: { content: string; type: "text" | "video" }) {
  const { userId } = auth()
  if (!userId) throw new Error("Unauthorized")

  await connectToDB()

  const post = await Post.create({
    content: data.content,
    type: data.type,
    author: userId,
    authorId: userId,
  })

  return post
}

export async function getPosts(page = 1, limit = 10) {
  await connectToDB()

  const skip = (page - 1) * limit
  const posts = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit)

  return posts
}

export async function getUserPosts(userId: string) {
  await connectToDB()

  const posts = await Post.find({ authorId: userId }).sort({ createdAt: -1 })

  return posts
}

