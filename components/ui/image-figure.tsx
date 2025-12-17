import Image from "next/image"
import { ReactNode, useState } from "react"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface ImageFigureProps {
  src: string
  alt: string
  caption?: ReactNode
  className?: string
  imageClassName?: string
  captionClassName?: string
  width?: number
  height?: number
}

export function ImageFigure({ 
  src, 
  alt, 
  caption, 
  className, 
  imageClassName, 
  captionClassName,
  width = 600,
  height = 400
}: ImageFigureProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <figure className={cn("group", className)}>
      <div className="relative overflow-hidden rounded-lg">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
            <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
          </div>
        )}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
            <div className="text-center text-muted-foreground">
              <div className="w-8 h-8 mx-auto mb-2 bg-muted rounded-full flex items-center justify-center">
                <span className="text-xs">📷</span>
              </div>
              <p className="text-xs">Failed to load image</p>
            </div>
          </div>
        )}
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          quality={75}
          className={cn(
            "w-full h-auto object-cover transition-all duration-500 group-hover:scale-105",
            isLoading ? "opacity-0" : "opacity-100",
            imageClassName
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
        />
      </div>
      {caption && (
        <figcaption className={cn(
          "mt-3 text-sm text-muted-foreground text-center",
          captionClassName
        )}>
          {caption}
        </figcaption>
      )}
    </figure>
  )
}



