import { SignUp } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: "bg-white text-black hover:bg-white/90",
            card: "bg-black/20 backdrop-blur-md",
            headerTitle: "text-white",
            headerSubtitle: "text-white/80",
            socialButtonsBlockButton: "bg-white/10 text-white border-white/20",
            formFieldLabel: "text-white",
            formFieldInput: "bg-white/10 text-white border-white/20",
            footerActionLink: "text-white hover:text-white/80",
          },
        }}
      />
    </div>
  )
}

