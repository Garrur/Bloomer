"use client"

import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import Post from "./Post"
import useInfiniteScroll from "@/hooks/useInfiniteScroll"

export default function Feed() {
  const [posts, setPosts] = useState<any[]>([])
  const [page, setPage] = useState(1)

  const fetchMorePosts = useCallback(() => {
    // Simulating API call
    const newPosts = Array.from({ length: 5 }, (_, i) => ({
      id: posts.length + i + 1,
      content: `Motivational post ${posts.length + i + 1}`,
      type: Math.random() > 0.5 ? "video" : "text",
    }))
    setPosts((prevPosts) => [...prevPosts, ...newPosts])
    setPage((prevPage) => prevPage + 1)
  }, [posts.length])

  const [infiniteScrollRef] = useInfiniteScroll(fetchMorePosts)

  useEffect(() => {
    if (page === 1) {
      fetchMorePosts()
    }
  }, [fetchMorePosts, page])

  return (
    <div className="container mx-auto px-4 py-8">
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
      <div ref={infiniteScrollRef} className="h-20" />
    </div>
  )
}

