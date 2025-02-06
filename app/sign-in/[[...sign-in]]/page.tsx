import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center">
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
      <SignIn
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

