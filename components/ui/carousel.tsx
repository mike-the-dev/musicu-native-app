import { Ionicons } from "@expo/vector-icons"
import * as React from "react"
import { ScrollView, Text, View } from "react-native"

import { cn } from "../../lib/utils"
import { Button } from "./button"

const CarouselContext = React.createContext<{
  carouselRef: React.RefObject<ScrollView | null>
  orientation: "horizontal" | "vertical"
  scrollPrev: () => void
  scrollNext: () => void
  canScrollPrev: boolean
  canScrollNext: boolean
} | null>(null)

function useCarousel() {
  const context = React.useContext(CarouselContext)

  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />")
  }

  return context
}

interface CarouselProps {
  orientation?: "horizontal" | "vertical"
  className?: string
  children?: React.ReactNode
}

const Carousel = React.forwardRef<View, CarouselProps>(({
  orientation = "horizontal",
  className,
  children,
  ...props
}, ref) => {
  const carouselRef = React.useRef<ScrollView | null>(null)
  const [canScrollPrev, setCanScrollPrev] = React.useState(false)
  const [canScrollNext, setCanScrollNext] = React.useState(false)

  const scrollPrev = React.useCallback(() => {
    carouselRef.current?.scrollTo({
      x: orientation === "horizontal" ? -200 : 0,
      y: orientation === "vertical" ? -200 : 0,
      animated: true
    })
  }, [orientation])

  const scrollNext = React.useCallback(() => {
    carouselRef.current?.scrollTo({
      x: orientation === "horizontal" ? 200 : 0,
      y: orientation === "vertical" ? 200 : 0,
      animated: true
    })
  }, [orientation])

  return (
    <CarouselContext.Provider
      value={{
        carouselRef,
        orientation,
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext,
      }}
    >
      <View
        ref={ref}
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </View>
    </CarouselContext.Provider>
  );
})
Carousel.displayName = "Carousel"

interface CarouselContentProps extends React.ComponentPropsWithoutRef<typeof ScrollView> {
  className?: string
}

const CarouselContent = React.forwardRef<ScrollView, CarouselContentProps>(({ className, ...props }, ref) => {
  const { carouselRef, orientation } = useCarousel()

  // Forward the ref to the context's carouselRef
  React.useEffect(() => {
    if (ref && carouselRef) {
      if (typeof ref === 'function') {
        ref(carouselRef.current)
      } else if (ref && 'current' in ref) {
        (ref as React.MutableRefObject<ScrollView | null>).current = carouselRef.current
      }
    }
  }, [ref, carouselRef])

  return (
    <ScrollView 
      ref={carouselRef} 
      horizontal={orientation === "horizontal"}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      className="overflow-hidden"
    >
      <View
        className={cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        )}
        {...props}
      />
    </ScrollView>
  );
})
CarouselContent.displayName = "CarouselContent"

interface CarouselItemProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
}

const CarouselItem = React.forwardRef<View, CarouselItemProps>(({ className, ...props }, ref) => {
  const { orientation } = useCarousel()

  return (
    <View
      ref={ref}
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full",
        orientation === "horizontal" ? "pl-4" : "pt-4",
        className
      )}
      {...props}
    />
  );
})
CarouselItem.displayName = "CarouselItem"

interface CarouselPreviousProps {
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const CarouselPrevious = React.forwardRef<View, CarouselPreviousProps>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full", 
        orientation === "horizontal"
          ? "-left-12 top-1/2 -translate-y-1/2"
          : "-top-12 left-1/2 -translate-x-1/2 rotate-90", 
        className
      )}
      disabled={!canScrollPrev}
      onPress={scrollPrev}
      {...props}
    >
      <Ionicons name="chevron-back" size={16} color="#64748b" />
      <Text className="sr-only">Previous slide</Text>
    </Button>
  );
})
CarouselPrevious.displayName = "CarouselPrevious"

interface CarouselNextProps {
  className?: string
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
}

const CarouselNext = React.forwardRef<View, CarouselNextProps>(({ className, variant = "outline", size = "icon", ...props }, ref) => {
  const { orientation, scrollNext, canScrollNext } = useCarousel()

  return (
    <Button
      ref={ref}
      variant={variant}
      size={size}
      className={cn(
        "absolute h-8 w-8 rounded-full", 
        orientation === "horizontal"
          ? "-right-12 top-1/2 -translate-y-1/2"
          : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90", 
        className
      )}
      disabled={!canScrollNext}
      onPress={scrollNext}
      {...props}
    >
      <Ionicons name="chevron-forward" size={16} color="#64748b" />
      <Text className="sr-only">Next slide</Text>
    </Button>
  );
})
CarouselNext.displayName = "CarouselNext"

export { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious }

