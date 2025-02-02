"use client"

import { useParams } from "next/navigation"
import { notFound } from "next/navigation"
import Post from "@/components/Post"
import Header from "@/components/Header"

export default function PostPage() {
  const params = useParams()
  const id = params?.id

  // Validate that id exists and is a number
  if (!id || isNaN(Number(id))) {
    notFound()
  }

  // In a real app, this would fetch the post data from an API
  const post = {
    id: Number(id),
    content: `Motivational post ${id}`,
    type: "text",
    author: "User 52",
    likes: 0,
    comments: 0,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Post post={post} />
      </main>
    </div>
  )
}

