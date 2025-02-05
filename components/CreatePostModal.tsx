"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CreatePostModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (post: { content: string; type: "text" | "video" }) => void
}

export default function CreatePostModal({ isOpen, onClose, onSubmit }: CreatePostModalProps) {
  const [content, setContent] = useState("")
  const [postType, setPostType] = useState<"text" | "video">("text")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ content, type: postType })
    setContent("")
    setPostType("text")
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>Create a New Post</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="postType" className="block text-sm font-medium mb-1">
              Post Type
            </label>
            <select
              id="postType"
              value={postType}
              onChange={(e) => setPostType(e.target.value as "text" | "video")}
              className="w-full p-2 bg-gray-800 rounded-md"
            >
              <option value="text">Text</option>
              <option value="video">Video</option>
            </select>
          </div>
          {postType === "text" ? (
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              className="w-full p-2 bg-gray-800 rounded-md"
              rows={4}
            />
          ) : (
            <Input
              type="url"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter video URL"
              className="w-full p-2 bg-gray-800 rounded-md"
            />
          )}
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Post
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

