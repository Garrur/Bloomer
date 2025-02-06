"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface VideoBackgroundProps {
  src: string
  duration?: number
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({ src, duration = 6 }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.addEventListener("timeupdate", () => {
        if (video.currentTime >= duration) {
          video.currentTime = 0
          video.play()
        }
      })
    }
  }, [duration])

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      loop={false}
      className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-50"
    >
      <source src={src} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}

export default VideoBackground

