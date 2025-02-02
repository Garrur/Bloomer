import { useEffect, useRef, useCallback } from "react"

export default function useInfiniteScroll(callback: () => void) {
  const observer = useRef<IntersectionObserver | null>(null)

  const infiniteScrollRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          callback()
        }
      })
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

