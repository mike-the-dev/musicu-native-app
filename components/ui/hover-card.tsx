import * as React from "react"
import { Modal, Text, TouchableOpacity, View } from "react-native"
import { cn } from "../../lib/utils"

// For React Native, we'll create a simplified hover card component
// Since hover doesn't work on mobile, we'll use long press instead
// since @radix-ui/react-hover-card doesn't work in React Native

interface HoverCardContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const HoverCardContext = React.createContext<HoverCardContextValue | undefined>(undefined)

const HoverCard = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <HoverCardContext.Provider value={{
      open,
      onOpenChange: setOpen
    }}>
      {children}
    </HoverCardContext.Provider>
  )
}

const HoverCardTrigger = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & {
    children: React.ReactNode
    asChild?: boolean
  }
>(({ children, asChild, ...props }, ref) => {
  const { onOpenChange } = React.useContext(HoverCardContext)!
  
  if (asChild) {
    return React.cloneElement(children as React.ReactElement, {
      onLongPress: () => onOpenChange(true),
      ...props
    })
  }

  return (
    <TouchableOpacity
      ref={ref}
      onLongPress={() => onOpenChange(true)}
      {...props}
    >
      {children}
    </TouchableOpacity>
  )
})
HoverCardTrigger.displayName = "HoverCardTrigger"

const HoverCardContent = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children: React.ReactNode
    align?: "start" | "center" | "end"
    sideOffset?: number
  }
>(({ className, children, align = "center", sideOffset = 4, ...props }, ref) => {
  const { open, onOpenChange } = React.useContext(HoverCardContext)!

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
                "z-50 w-64 rounded-md border bg-popover p-4 shadow-md",
                className
              )}
              {...props}
            >
              <Text className="text-popover-foreground">
                {children}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  )
})
HoverCardContent.displayName = "HoverCardContent"

export { HoverCard, HoverCardContent, HoverCardTrigger }

