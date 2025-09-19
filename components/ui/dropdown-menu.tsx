import { Ionicons } from "@expo/vector-icons"
import * as React from "react"
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { cn } from "../../lib/utils"

// For React Native, we'll create a simplified dropdown menu component
// since @radix-ui/react-dropdown-menu doesn't work in React Native

interface DropdownMenuContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | undefined>(undefined)

const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false)

  return (
    <DropdownMenuContext.Provider value={{
      open,
      onOpenChange: setOpen
    }}>
      {children}
    </DropdownMenuContext.Provider>
  )
}

const DropdownMenuTrigger = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & {
    children: React.ReactNode
    asChild?: boolean
  }
>(({ children, asChild, ...props }, ref) => {
  const { onOpenChange } = React.useContext(DropdownMenuContext)!
  
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
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const DropdownMenuContent = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children: React.ReactNode
    sideOffset?: number
  }
>(({ className, children, sideOffset = 4, ...props }, ref) => {
  const { open, onOpenChange } = React.useContext(DropdownMenuContext)!

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
                "z-50 min-w-32 overflow-hidden rounded-md border bg-popover shadow-md",
                className
              )}
              {...props}
            >
              <ScrollView className="p-1">
                {children}
              </ScrollView>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  )
})
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & {
    className?: string
    inset?: boolean
    children: React.ReactNode
    onPress?: () => void
  }
>(({ className, inset, children, onPress, ...props }, ref) => {
  const { onOpenChange } = React.useContext(DropdownMenuContext)!

  const handlePress = () => {
    onPress?.()
    onOpenChange(false)
  }

  return (
    <TouchableOpacity
      ref={ref}
      className={cn(
        "relative flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm",
        "focus:bg-accent focus:text-accent-foreground",
        inset && "pl-8",
        className
      )}
      onPress={handlePress}
      {...props}
    >
      {children}
    </TouchableOpacity>
  )
})
DropdownMenuItem.displayName = "DropdownMenuItem"

const DropdownMenuCheckboxItem = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & {
    className?: string
    children: React.ReactNode
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
  }
>(({ className, children, checked, onCheckedChange, ...props }, ref) => {
  const { onOpenChange } = React.useContext(DropdownMenuContext)!

  const handlePress = () => {
    onCheckedChange?.(!checked)
  }

  return (
    <TouchableOpacity
      ref={ref}
      className={cn(
        "relative flex items-center rounded-sm py-1.5 pl-8 pr-2 text-sm",
        "focus:bg-accent focus:text-accent-foreground",
        className
      )}
      onPress={handlePress}
      {...props}
    >
      <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && <Ionicons name="checkmark" size={16} color="#64748b" />}
      </View>
      {children}
    </TouchableOpacity>
  )
})
DropdownMenuCheckboxItem.displayName = "DropdownMenuCheckboxItem"

const DropdownMenuRadioItem = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & {
    className?: string
    children: React.ReactNode
    value: string
    onSelect?: (value: string) => void
  }
>(({ className, children, value, onSelect, ...props }, ref) => {
  const { onOpenChange } = React.useContext(DropdownMenuContext)!

  const handlePress = () => {
    onSelect?.(value)
    onOpenChange(false)
  }

  return (
    <TouchableOpacity
      ref={ref}
      className={cn(
        "relative flex items-center rounded-sm py-1.5 pl-8 pr-2 text-sm",
        "focus:bg-accent focus:text-accent-foreground",
        className
      )}
      onPress={handlePress}
      {...props}
    >
      <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <Ionicons name="radio-button-on" size={16} color="#64748b" />
      </View>
      {children}
    </TouchableOpacity>
  )
})
DropdownMenuRadioItem.displayName = "DropdownMenuRadioItem"

const DropdownMenuLabel = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text> & {
    className?: string
    inset?: boolean
    children: React.ReactNode
  }
>(({ className, inset, children, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)}
    {...props}
  >
    {children}
  </Text>
))
DropdownMenuLabel.displayName = "DropdownMenuLabel"

const DropdownMenuSeparator = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
DropdownMenuSeparator.displayName = "DropdownMenuSeparator"

const DropdownMenuShortcut = ({
  className,
  children,
  ...props
}: {
  className?: string
  children: React.ReactNode
  [key: string]: any
}) => {
  return (
    <Text
      className={cn("ml-auto text-xs opacity-60", className)}
      {...props}
    >
      {children}
    </Text>
  )
}
DropdownMenuShortcut.displayName = "DropdownMenuShortcut"

// Stub components for compatibility
const DropdownMenuGroup = ({ children }: { children: React.ReactNode }) => <>{children}</>
const DropdownMenuPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>
const DropdownMenuSub = ({ children }: { children: React.ReactNode }) => <>{children}</>
const DropdownMenuSubContent = ({ children }: { children: React.ReactNode }) => <>{children}</>
const DropdownMenuSubTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>
const DropdownMenuRadioGroup = ({ children }: { children: React.ReactNode }) => <>{children}</>

export {
  DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator,
  DropdownMenuShortcut, DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger, DropdownMenuTrigger
}

