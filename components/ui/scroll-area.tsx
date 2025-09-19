import { cn } from "@/lib/utils"
import * as React from "react"
import { ScrollView, View } from "react-native"

// For React Native, we'll create a simplified scroll area component
// since @radix-ui/react-scroll-area doesn't work in React Native

const ScrollArea = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children: React.ReactNode
    orientation?: "vertical" | "horizontal" | "both"
    showScrollbar?: boolean
  }
>(({ className, children, orientation = "vertical", showScrollbar = true, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("relative overflow-hidden", className)}
    {...props}
  >
    <ScrollView
      horizontal={orientation === "horizontal"}
      showsHorizontalScrollIndicator={showScrollbar && (orientation === "horizontal" || orientation === "both")}
      showsVerticalScrollIndicator={showScrollbar && (orientation === "vertical" || orientation === "both")}
      className="h-full w-full"
    >
      {children}
    </ScrollView>
    {showScrollbar && <ScrollBar orientation={orientation} />}
  </View>
))
ScrollArea.displayName = "ScrollArea"

const ScrollBar = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    orientation?: "vertical" | "horizontal" | "both"
  }
>(({ className, orientation = "vertical", ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "flex select-none transition-colors",
      orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
      orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
      orientation === "both" && "h-2.5 w-2.5 border border-transparent p-[1px]",
      className
    )}
    {...props}
  >
    <View className="relative flex-1 rounded-full bg-border" />
  </View>
))
ScrollBar.displayName = "ScrollBar"

export { ScrollArea, ScrollBar }
