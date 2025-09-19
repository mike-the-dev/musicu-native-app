import * as React from "react"
import { View } from "react-native"

import { cn } from "../../lib/utils"

interface ProgressProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
  value?: number
}

const Progress = React.forwardRef<View, ProgressProps>(({ className, value = 0, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-primary/20",
      className
    )}
    {...props}
  >
    <View
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ 
        width: `${Math.min(100, Math.max(0, value || 0))}%`,
        transform: [{ translateX: -100 + (value || 0) }]
      }}
    />
  </View>
))
Progress.displayName = "Progress"

export { Progress }
