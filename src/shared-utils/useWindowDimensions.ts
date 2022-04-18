import { useState, useEffect } from 'react'

function getWindowDimensions() {
  return { width: window.innerWidth, height: window.innerHeight }
}

export function useWindowDimensions() {
  const [size, setSize] = useState(getWindowDimensions)
  useEffect(() => {
    const listener = () => setSize(getWindowDimensions())
    window.addEventListener("resize", listener, false)
    return () => window.removeEventListener("resize", listener, false)
  })
  return size
}
