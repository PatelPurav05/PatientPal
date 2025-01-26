"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface AnimatedImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
}

export function AnimatedImage({ src, alt, width, height, className }: AnimatedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(false)
  }, [src])

  return (
    <Image
      src={src || "/placeholder.svg"}
      alt={alt}
      width={width}
      height={height}
      className={cn(
        "duration-700 ease-in-out",
        isLoaded ? "scale-100 blur-0 opacity-100" : "scale-95 blur-sm opacity-0",
        className,
      )}
      onLoad={() => setIsLoaded(true)}
    />
  )
}

