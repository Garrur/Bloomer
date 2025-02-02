"use client"

import { Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useUser, UserButton } from "@clerk/nextjs"

export default function Header() {
  const { user } = useUser()

  return (
    <header className="sticky top-0 z-50 bg-black/50 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sun className="h-8 w-8 text-yellow-500" />
          <h1 className="text-2xl font-bold text-white">Bloom</h1>
        </div>
        <nav className="flex items-center space-x-6">
          <Link href="/feed">
            <Button variant="ghost" className="text-white hover:text-white/80">
              Feed
            </Button>
          </Link>
          <Link href="/explore">
            <Button variant="ghost" className="text-white hover:text-white/80">
              Explore
            </Button>
          </Link>
          <Link href={`/profile/${user?.id}`}>
            <Button variant="ghost" className="text-white hover:text-white/80">
              Profile
            </Button>
          </Link>
          <UserButton
            appearance={{
              elements: {
                userButtonBox: "hover:opacity-80 transition-opacity",
                userButtonTrigger: "focus:shadow-none",
              },
            }}
          />
        </nav>
      </div>
    </header>
  )
}

