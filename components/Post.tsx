"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PostProps {
  post: {
    id: number
    content: string
    type: "video" | "text"
    author: string
    likes: number
    comments: number
  }
}

export default function Post({ post }: PostProps) {
  return (
    <motion.div
      className="bg-white/10 backdrop-blur-md rounded-lg shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <Link href={`/posts/${encodeURIComponent(post.id)}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-blue-300 transition-colors">{post.author}</h3>
        </Link>
        <AnimatePresence mode="wait">
          {post.type === "video" ? (
            <div className="aspect-w-16 aspect-h-9 mb-4">
              <iframe src={post.content} className="w-full h-full rounded-md" allowFullScreen />
            </div>
          ) : (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                },
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20"
                animate={{
                  x: ["0%", "100%", "0%"],
                }}
                transition={{
                  duration: 5,
                  ease: "linear",
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
              <motion.p
                className="text-xl mb-4 relative z-10 p-6 bg-black/20 rounded-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {post.content}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <Button variant="ghost" className="text-pink-400 hover:text-pink-300">
              <Heart className="h-5 w-5 mr-1" />
              {post.likes}
            </Button>
            <Button variant="ghost" className="text-blue-400 hover:text-blue-300">
              <MessageCircle className="h-5 w-5 mr-1" />
              {post.comments}
            </Button>
          </div>
          <Button variant="ghost" className="text-green-400 hover:text-green-300">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

