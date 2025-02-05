"use client"

import { useState } from "react"
import Header from "@/components/Header"
import Feed from "@/components/Feed"
import CreatePostButton from "@/components/CreatePostButton"
import CreatePostModal from "@/components/CreatePostModal"
import { createPost } from "../actions/posts"

export default function FeedPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleCreatePost = async (newPost: { content: string; type: "text" | "video" }) => {
    try {
      await createPost(newPost)
      setIsCreateModalOpen(false)
      setRefreshTrigger((prev) => prev + 1) // Trigger a refresh of the feed
    } catch (error) {
      console.error("Error creating post:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      <Header />
      <Feed refreshTrigger={refreshTrigger} />
      <CreatePostButton onClick={() => setIsCreateModalOpen(true)} />
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  )
}

