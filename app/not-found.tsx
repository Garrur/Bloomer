import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-lg text-white/80">The page you're looking for doesn't exist.</p>
        <Link href="/">
          <Button variant="outline" className="mt-4">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

