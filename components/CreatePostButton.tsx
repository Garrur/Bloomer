import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CreatePostButtonProps {
  onClick: () => void
}

export default function CreatePostButton({ onClick }: CreatePostButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed bottom-6 right-6 rounded-full w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg z-50"
    >
      <Plus className="h-8 w-8" />
    </Button>
  )
}

