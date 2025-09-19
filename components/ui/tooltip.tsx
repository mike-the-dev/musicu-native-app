import { cn } from "@/lib/utils"
import * as React from "react"
import { Modal, Text, TouchableOpacity, View } from "react-native"

// For React Native, we'll create a simplified tooltip component
// since @radix-ui/react-tooltip doesn't work in React Native

interface TooltipContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const TooltipContext = React.createContext<TooltipContextValue | undefined>(undefined)

const TooltipProvider = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

const Tooltip = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <TooltipContext.Provider value={{
      open,
      onOpenChange: setOpen
    }}>
      {children}
    </TooltipContext.Provider>
  )
}

const TooltipTrigger = React.forwardRef<
  React.ComponentRef<typeof TouchableOpacity>,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & {
    children: React.ReactNode
    asChild?: boolean
  }
>(({ children, asChild, ...props }, ref) => {
  const { onOpenChange } = React.useContext(TooltipContext)!
  
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
TooltipTrigger.displayName = "TooltipTrigger"

const TooltipContent = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children: React.ReactNode
    sideOffset?: number
  }
>(({ className, children, sideOffset = 4, ...props }, ref) => {
  const { open, onOpenChange } = React.useContext(TooltipContext)!

  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
    >
      <TouchableOpacity 
        className="flex-1" 
        activeOpacity={1}
        onPress={() => onOpenChange(false)}
      >
        <View className="flex-1 justify-center items-center">
          <TouchableOpacity activeOpacity={1} onPress={(e) => e.stopPropagation()}>
            <View
              ref={ref}
              className={cn(
                "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 shadow-md",
                className
              )}
              {...props}
            >
              <Text className="text-xs text-primary-foreground">
                {children}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  )
})
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger }

