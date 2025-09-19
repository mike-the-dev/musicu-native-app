import { cn } from "@/lib/utils"
import * as React from "react"
import { Dimensions, Modal, TouchableOpacity, View } from "react-native"

// For React Native, we'll create a simplified popover component
// since @radix-ui/react-popover doesn't work in React Native

interface PopoverContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const PopoverContext = React.createContext<PopoverContextValue | undefined>(undefined)

const Popover = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <PopoverContext.Provider value={{
      open,
      onOpenChange: setOpen
    }}>
      {children}
    </PopoverContext.Provider>
  )
}

const PopoverTrigger = React.forwardRef<
  React.ElementRef<typeof TouchableOpacity>,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & {
    children: React.ReactNode
    asChild?: boolean
  }
>(({ children, asChild, ...props }, ref) => {
  const { onOpenChange } = React.useContext(PopoverContext)!
  
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
PopoverTrigger.displayName = "PopoverTrigger"

const PopoverContent = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children: React.ReactNode
    align?: "start" | "center" | "end"
    sideOffset?: number
  }
>(({ className, children, align = "center", sideOffset = 4, ...props }, ref) => {
  const { open, onOpenChange } = React.useContext(PopoverContext)!
  const screenWidth = Dimensions.get('window').width
  const screenHeight = Dimensions.get('window').height

  const getContentStyle = () => {
    const baseStyle = {
      width: Math.min(288, screenWidth - 32), // 72 * 4 = 288px (w-72)
    }

    // For React Native, we'll center the popover by default
    // In a real implementation, you might want to calculate position based on trigger
    return {
      ...baseStyle,
      alignSelf: 'center' as const,
    }
  }

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
    >
      <TouchableOpacity 
        className="flex-1 bg-black/50" 
        activeOpacity={1}
        onPress={() => onOpenChange(false)}
      >
        <View className="flex-1 justify-center items-center">
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <View
              ref={ref}
              className={cn(
                "z-50 rounded-md border bg-popover p-4 shadow-md",
                className
              )}
              style={getContentStyle()}
              {...props}
            >
              {children}
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  )
})
PopoverContent.displayName = "PopoverContent"

const PopoverAnchor = ({ children }: { children: React.ReactNode }) => {
  // In React Native, we don't need an anchor component
  // The trigger serves as the anchor
  return <>{children}</>
}

export { Popover, PopoverAnchor, PopoverContent, PopoverTrigger }

