import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import Header from "@/components/Header"
import Post from "@/components/Post"
import { getPosts } from "@/app/actions/posts"

export default async function ExplorePage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  const posts = await getPosts(1, 20)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Explore</h1>
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

