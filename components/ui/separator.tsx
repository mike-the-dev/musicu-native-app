import * as React from "react"
import { View } from "react-native"

import { cn } from "../../lib/utils"

interface SeparatorProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
}

const Separator = React.forwardRef<View, SeparatorProps>((
  { className, orientation = "horizontal", decorative = true, ...props },
  ref
) => (
  <View
    ref={ref}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    {...props} 
  />
))
Separator.displayName = "Separator"

export { Separator }
