import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { auth } from "@clerk/nextjs/server"

export default async function Home() {
  const { userId } = await auth()

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="container mx-auto px-6 py-6 flex items-center justify-between">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/frame_0.jpg-sS31yWCQZU2PHBW74IfiRTDjK6jPA4.jpeg"
          alt="Bloom Logo"
          width={40}
          height={40}
          className="brightness-0 invert"
        />
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              Home
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              Features
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              Mission
            </a>
            <a href="#" className="text-white/80 hover:text-white transition-colors">
              Contact
            </a>
          </div>
          <div className="flex items-center gap-4">
            {!userId ? (
              <>
                <Link href="/sign-in">
                  <Button variant="ghost" className="text-white hover:text-white/80">
                    Login
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button variant="outline" className="text-black bg-white hover:bg-white/90">
                    Signup
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/feed">
                <Button variant="outline" className="text-black bg-white hover:bg-white/90">
                  Go to Feed
                </Button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-6 pt-20 pb-32 text-center">
        <h1 className="text-5xl md:text-7xl font-serif font-medium mb-6 tracking-wide">Welcome to Bloom</h1>
        <h2 className="text-3xl md:text-5xl font-serif font-normal mb-8 tracking-wide leading-relaxed">
          A New Way to Connect, Grow, and Thrive
        </h2>
        <p className="max-w-2xl mx-auto text-lg text-white/80 mb-12">
          Break free from the noise of traditional social media. Discover a platform built to nourish meaningful
          relationships and empower personal growth.
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {!userId ? (
            <Link href="/sign-in">
              <Button size="lg" className="min-w-[200px] bg-white text-black hover:bg-white/90">
                Join the Movement
              </Button>
            </Link>
          ) : (
            <Link href="/feed">
              <Button size="lg" className="min-w-[200px] bg-white text-black hover:bg-white/90">
                Go to Feed
              </Button>
            </Link>
          )}
          <Button size="lg" variant="outline" className="min-w-[200px]">
            Learn More
          </Button>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-48 pointer-events-none">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/frame_0.jpg-sS31yWCQZU2PHBW74IfiRTDjK6jPA4.jpeg"
          alt="Decorative Lotus"
          fill
          className="object-cover brightness-0 invert opacity-20"
        />
      </div>
    </div>
  )
}

