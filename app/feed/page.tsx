"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Header from "@/components/Header"
import Post from "@/components/Post"
import CreatePostButton from "@/components/CreatePostButton"
import CreatePostModal from "@/components/CreatePostModal"
import { createPost, getPosts } from "../actions/posts"

interface PostType {
  id: string
  content: string
  type: "video" | "text"
  author: string
  likes: number
  comments: number
}

export default function FeedPage() {
  const [posts, setPosts] = useState<PostType[]>([])
  const [page, setPage] = useState(1)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchPosts = async () => {
    try {
      setIsLoading(true)
      const newPosts = await getPosts(page)
      setPosts((prevPosts) => [...prevPosts, ...newPosts])
      setPage((p) => p + 1)
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts()
  }, [page]) // Added page to dependencies

  const handleCreatePost = async (newPost: { content: string; type: "text" | "video" }) => {
    try {
      const post = await createPost(newPost)
      setPosts((prevPosts) => [post, ...prevPosts])
      setIsCreateModalOpen(false)
    } catch (error) {
      console.error("Error creating post:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </motion.div>
        {isLoading && (
          <div className="text-center py-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
          </div>
        )}
      </main>
      <CreatePostButton onClick={() => setIsCreateModalOpen(true)} />
      <CreatePostModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreatePost}
      />
    </div>
  )
}

