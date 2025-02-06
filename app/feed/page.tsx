"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import Header from "@/components/Header"
import Post from "@/components/Post"
import CreatePostButton from "@/components/CreatePostButton"
import CreatePostModal from "@/components/CreatePostModal"
import { createPost, getPosts } from "../actions/posts"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"

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

  const fetchMorePosts = useCallback(async () => {
    if (isLoading) return
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
  }, [page, isLoading])

  const [infiniteScrollRef] = useInfiniteScroll(fetchMorePosts)

  useEffect(() => {
    fetchMorePosts()
  }, [fetchMorePosts]) // Added fetchMorePosts to the dependency array

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
    <div className="min-h-screen relative overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
      >
        <source
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/25276390-nwB1N1TMcFEyIe1VhjSWZCUeUpcmlK.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
      <div className="relative z-10 min-h-screen bg-black bg-opacity-50">
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
          <div ref={infiniteScrollRef} className="h-20" />
        </main>
        <CreatePostButton onClick={() => setIsCreateModalOpen(true)} />
        <CreatePostModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreatePost}
        />
      </div>
    </div>
  )
}

