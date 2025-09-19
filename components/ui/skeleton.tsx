import { cn } from "@/lib/utils"
import { useEffect } from "react"
import { Animated } from "react-native"

function Skeleton({
  className,
  ...props
}: {
  className?: string
  [key: string]: any
}) {
  const pulseAnim = new Animated.Value(0)

  useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    )
    pulse.start()

    return () => pulse.stop()
  }, [pulseAnim])

  return (
    <Animated.View
      className={cn("rounded-md bg-primary/10", className)}
      style={{
        opacity: pulseAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0.3, 0.7],
        }),
      }}
      {...props}
    />
  )
}

export { Skeleton }
