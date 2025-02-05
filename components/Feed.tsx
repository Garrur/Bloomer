"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Post from "./Post"
import { getPosts } from "@/app/actions/posts"

interface FeedProps {
  refreshTrigger?: number
}

export default function Feed({ refreshTrigger = 0 }: FeedProps) {
  const [posts, setPosts] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPostIndex, setCurrentPostIndex] = useState(0)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Fetch posts when needed
  const fetchMorePosts = useCallback(async () => {
    if (isLoading) return
    setIsLoading(true)

    try {
      const newPosts = await getPosts(page, 1) // Fetch only one post
      if (newPosts.length > 0) {
        setPosts((prevPosts) => [...prevPosts, ...newPosts])
        setPage((prevPage) => prevPage + 1)
      }
    } catch (error) {
      console.error("Error fetching posts:", error)
    } finally {
      setIsLoading(false)
    }
  }, [page, isLoading])

  // Initial fetch
  useEffect(() => {
    fetchMorePosts()
  }, [])

  // Reset feed on refresh
  useEffect(() => {
    setPosts([])
    setPage(1)
    setCurrentPostIndex(0)
    fetchMorePosts()
  }, [refreshTrigger])

  // Detect scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const { scrollTop, clientHeight, scrollHeight } = containerRef.current

      // Scroll Down
      if (scrollTop + clientHeight >= scrollHeight - 50) {
        setCurrentPostIndex((prevIndex) => {
          if (prevIndex < posts.length - 1) {
            return prevIndex + 1
          } else {
            fetchMorePosts()
            return prevIndex
          }
        })
      }

      // Scroll Up
      if (scrollTop <= 50) {
        setCurrentPostIndex((prevIndex) => Math.max(prevIndex - 1, 0))
      }
    }

    const container = containerRef.current
    if (container) {
      container.addEventListener("scroll", handleScroll)
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll)
      }
    }
  }, [posts.length, fetchMorePosts])

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-auto container mx-auto px-4 py-8"
    >
      <AnimatePresence mode="wait">
        {posts.length > 0 && (
          <motion.div
            key={posts[currentPostIndex]?._id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="h-[calc(100vh-4rem)] flex items-center justify-center"
          >
            <Post post={posts[currentPostIndex]} />
          </motion.div>
        )}
      </AnimatePresence>

      {isLoading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto"></div>
        </div>
      )}
    </div>
  )
}
