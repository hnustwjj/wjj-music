import { useState, useRef, useEffect } from 'react'
export default function useScrollToBottom() {
  const [scrollToBottom, setScrollToBottom] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current
      if (scrollTop + clientHeight + 10 >= scrollHeight) {
        setScrollToBottom(true)
      } else {
        setScrollToBottom(false)
      }
    }
  }
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll)
      }
    }
  }, [scrollRef.current])
  return { scrollToBottom, scrollRef }
}
