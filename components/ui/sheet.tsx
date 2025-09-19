import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { X } from "lucide-react-native"
import * as React from "react"
import { Animated, Dimensions, Modal, Text, TouchableOpacity, View } from "react-native"

// For React Native, we'll create a simplified sheet component
// since @radix-ui/react-dialog doesn't work in React Native

interface SheetContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const SheetContext = React.createContext<SheetContextValue | undefined>(undefined)

const Sheet = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <SheetContext.Provider value={{
      open,
      onOpenChange: setOpen
    }}>
      {children}
    </SheetContext.Provider>
  )
}

const SheetTrigger = React.forwardRef<
  React.ComponentRef<typeof TouchableOpacity>,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & {
    children: React.ReactNode
    asChild?: boolean
  }
>(({ children, asChild, ...props }, ref) => {
  const { onOpenChange } = React.useContext(SheetContext)!
  
  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      onPress: () => onOpenChange(true),
      ...props
    })
  }

  return (
    <TouchableOpacity
      ref={ref}
      onPress={() => onOpenChange(true)}
      {...props}
    >
      {children}
    </TouchableOpacity>
  )
})
SheetTrigger.displayName = "SheetTrigger"

const SheetClose = React.forwardRef<
  React.ComponentRef<typeof TouchableOpacity>,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & {
    children: React.ReactNode
    asChild?: boolean
  }
>(({ children, asChild, ...props }, ref) => {
  const { onOpenChange } = React.useContext(SheetContext)!
  
  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      onPress: () => onOpenChange(false),
      ...props
    })
  }

  return (
    <TouchableOpacity
      ref={ref}
      onPress={() => onOpenChange(false)}
      {...props}
    >
      {children}
    </TouchableOpacity>
  )
})
SheetClose.displayName = "SheetClose"

const SheetOverlay = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
  }
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80",
      className
    )}
    {...props}
  />
))
SheetOverlay.displayName = "SheetOverlay"

const sheetVariants = cva(
  "fixed z-50 bg-background p-6 shadow-lg",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b",
        bottom: "inset-x-0 bottom-0 border-t",
        left: "inset-y-0 left-0 h-full w-3/4 border-r max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

const SheetContent = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children: React.ReactNode
    side?: "top" | "right" | "bottom" | "left"
  }
>(({ className, children, side = "right", ...props }, ref) => {
  const { open, onOpenChange } = React.useContext(SheetContext)!
  const screenHeight = Dimensions.get('window').height
  const screenWidth = Dimensions.get('window').width
  
  const slideAnim = React.useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    if (open) {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start()
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start()
    }
  }, [open])

  const getSlideTransform = () => {
    switch (side) {
      case 'top':
        return {
          translateY: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-screenHeight, 0],
          }),
        }
      case 'bottom':
        return {
          translateY: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [screenHeight, 0],
          }),
        }
      case 'left':
        return {
          translateX: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-screenWidth, 0],
          }),
        }
      case 'right':
      default:
        return {
          translateX: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [screenWidth, 0],
          }),
        }
    }
  }

  const getContentStyle = () => {
    const baseStyle = {
      height: side === 'left' || side === 'right' ? screenHeight : undefined,
      width: side === 'left' || side === 'right' ? screenWidth * 0.75 : screenWidth,
      maxWidth: side === 'left' || side === 'right' ? 384 : undefined, // sm:max-w-sm
    }

    switch (side) {
      case 'top':
        return {
          ...baseStyle,
          position: 'absolute' as const,
          top: 0,
          left: 0,
          right: 0,
        }
      case 'bottom':
        return {
          ...baseStyle,
          position: 'absolute' as const,
          bottom: 0,
          left: 0,
          right: 0,
        }
      case 'left':
        return {
          ...baseStyle,
          position: 'absolute' as const,
          left: 0,
          top: 0,
          bottom: 0,
        }
      case 'right':
      default:
        return {
          ...baseStyle,
          position: 'absolute' as const,
          right: 0,
          top: 0,
          bottom: 0,
        }
    }
  }

  return (
    <Modal
      visible={open}
      transparent
      animationType="none"
      onRequestClose={() => onOpenChange(false)}
    >
      <SheetOverlay />
      <Animated.View
        ref={ref}
        className={cn(sheetVariants({ side }), className)}
        style={[
          getContentStyle(),
          {
            transform: [getSlideTransform()],
          }
        ]}
        {...props}
      >
        <SheetClose className="absolute right-4 top-4 rounded-sm opacity-70">
          <X className="h-4 w-4" />
          <Text className="sr-only">Close</Text>
        </SheetClose>
        {children}
      </Animated.View>
    </Modal>
  )
})
SheetContent.displayName = "SheetContent"

const SheetHeader = ({
  className,
  children,
  ...props
}: {
  className?: string
  children: React.ReactNode
}) => (
  <View
    className={cn("flex flex-col space-y-2 text-center", className)}
    {...props}
  >
    {children}
  </View>
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  children,
  ...props
}: {
  className?: string
  children: React.ReactNode
}) => (
  <View
    className={cn("flex flex-col-reverse space-y-2 space-y-reverse", className)}
    {...props}
  >
    {children}
  </View>
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text> & {
    className?: string
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  >
    {children}
  </Text>
))
SheetTitle.displayName = "SheetTitle"

const SheetDescription = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text> & {
    className?: string
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  >
    {children}
  </Text>
))
SheetDescription.displayName = "SheetDescription"

// Stub components for compatibility
const SheetPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>

export {
  Sheet, SheetClose,
  SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetOverlay, SheetPortal, SheetTitle, SheetTrigger
}

