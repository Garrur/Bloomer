"use client"

import { useEffect, useRef, useCallback } from "react"

export default function useInfiniteScroll(callback: () => void) {
  const observer = useRef<IntersectionObserver | null>(null)

  const infiniteScrollRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            callback()
          }
        },
        {
          root: null,
          rootMargin: "200px", // Load more content when within 200px of the top or bottom
          threshold: 0,
        },
      )
      if (node) observer.current.observe(node)
    },
    [callback],
  )

  useEffect(() => {
    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [])

  return [infiniteScrollRef]
}

