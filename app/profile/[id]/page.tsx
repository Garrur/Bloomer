import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import Header from "@/components/Header"
import Post from "@/components/Post"
import { getUserPosts } from "@/app/actions/posts"

export default async function ProfilePage({
  params,
}: {
  params: { id: string }
}) {
  const { userId } = await auth()
  if (!userId) redirect("/profile")

  const posts = await getUserPosts(params.id)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
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
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Posts</h1>
        <div className="space-y-8">
          {posts.map((post: any) => (
            <Post
              key={post._id}
              post={{
                id: post._id.toString(),
                content: post.content,
                type: post.type,
                author: post.author,
                likes: post.likes,
                comments: post.comments,
              }}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

