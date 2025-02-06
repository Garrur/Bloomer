import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { auth } from "@clerk/nextjs/server"
import VideoBackground from "@/components/VideoBackground"
import { Flower } from "lucide-react"

export default async function Home() {
  const { userId } = await auth()

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <VideoBackground
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/25276390-nwB1N1TMcFEyIe1VhjSWZCUeUpcmlK.mp4"
        duration={6}
      />
      <div className="relative z-10">
        <nav className="container mx-auto px-6 py-6 flex items-center justify-between">
        <Flower />
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
                    <Button variant="ghost" className=" text-black text-white hover:bg-white/80">
                      Login
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button variant="outline" className=" text-black hover:bg-white/90">
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
            <Button size="lg" variant="outline" className="min-w-[200px] bg-white text-black hover:bg-white/90">
              Learn More
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}

