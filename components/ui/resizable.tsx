import { cn } from "@/lib/utils"
import { GripVertical } from "lucide-react-native"
import * as React from "react"
import { View } from "react-native"
import { PanGestureHandler, State } from "react-native-gesture-handler"

// For React Native, we'll create a simplified resizable component
// since react-resizable-panels doesn't work in React Native

interface ResizablePanelGroupProps {
  direction?: "horizontal" | "vertical"
  className?: string
  children: React.ReactNode
}

const ResizablePanelGroup = ({
  className,
  direction = "horizontal",
  children,
  ...props
}: ResizablePanelGroupProps) => (
  <View
    className={cn(
      "flex h-full w-full",
      direction === "vertical" && "flex-col",
      className
    )}
    {...props}
  >
    {children}
  </View>
)

interface ResizablePanelProps {
  defaultSize?: number
  minSize?: number
  maxSize?: number
  className?: string
  children: React.ReactNode
}

const ResizablePanel = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & ResizablePanelProps
>(({ className, children, defaultSize = 50, minSize = 10, maxSize = 90, ...props }, ref) => {
  const [size, setSize] = React.useState(defaultSize)

  return (
    <View
      ref={ref}
      className={cn("flex-1", className)}
      style={{
        flex: size / 100,
        minWidth: `${minSize}%`,
        maxWidth: `${maxSize}%`,
      }}
      {...props}
    >
      {children}
    </View>
  )
})
ResizablePanel.displayName = "ResizablePanel"

interface ResizableHandleProps {
  withHandle?: boolean
  className?: string
  onResize?: (size: number) => void
}

const ResizableHandle = ({
  withHandle,
  className,
  onResize,
  ...props
}: ResizableHandleProps) => {
  const [isResizing, setIsResizing] = React.useState(false)

  const handlePanGestureEvent = (event: any) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      setIsResizing(true)
      // Handle resize logic here
      onResize?.(event.nativeEvent.translationX || event.nativeEvent.translationY)
    } else if (event.nativeEvent.state === State.END) {
      setIsResizing(false)
    }
  }

  return (
    <PanGestureHandler
      onHandlerStateChange={handlePanGestureEvent}
      onGestureEvent={handlePanGestureEvent}
    >
      <View
        className={cn(
          "relative flex items-center justify-center bg-border",
          isResizing && "bg-ring",
          className
        )}
        style={{
          width: 4,
          height: "100%",
        }}
        {...props}
      >
        {withHandle && (
          <View className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
            <GripVertical className="h-2.5 w-2.5" />
          </View>
        )}
      </View>
    </PanGestureHandler>
  )
}

export { ResizableHandle, ResizablePanel, ResizablePanelGroup }

