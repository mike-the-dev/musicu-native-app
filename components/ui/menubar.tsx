import { Ionicons } from "@expo/vector-icons"
import * as React from "react"
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { cn } from "../../lib/utils"

// For React Native, we'll create a simplified menubar component
// since @radix-ui/react-menubar doesn't work in React Native

interface MenubarContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const MenubarContext = React.createContext<MenubarContextValue | undefined>(undefined)

const Menubar = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "flex h-9 items-center space-x-1 rounded-md border bg-background p-1 shadow-sm",
      className
    )}
    {...props}
  >
    {children}
  </View>
))
Menubar.displayName = "Menubar"

const MenubarTrigger = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & {
    className?: string
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <TouchableOpacity
    ref={ref}
    className={cn(
      "flex items-center rounded-sm px-3 py-1 text-sm font-medium",
      "focus:bg-accent focus:text-accent-foreground",
      className
    )}
    {...props}
  >
    {children}
  </TouchableOpacity>
))
MenubarTrigger.displayName = "MenubarTrigger"

const MenubarContent = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children: React.ReactNode
    align?: "start" | "center" | "end"
    alignOffset?: number
    sideOffset?: number
  }
>(({ className, children, align = "start", alignOffset = -4, sideOffset = 8, ...props }, ref) => {
  const { open, onOpenChange } = React.useContext(MenubarContext)!

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
                "z-50 min-w-48 overflow-hidden rounded-md border bg-popover shadow-md",
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
MenubarContent.displayName = "MenubarContent"

const MenubarItem = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & {
    className?: string
    inset?: boolean
    children: React.ReactNode
    onPress?: () => void
  }
>(({ className, inset, children, onPress, ...props }, ref) => {
  const { onOpenChange } = React.useContext(MenubarContext)!

  const handlePress = () => {
    onPress?.()
    onOpenChange(false)
  }

  return (
    <TouchableOpacity
      ref={ref}
      className={cn(
        "relative flex items-center rounded-sm px-2 py-1.5 text-sm",
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
MenubarItem.displayName = "MenubarItem"

const MenubarCheckboxItem = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & {
    className?: string
    children: React.ReactNode
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
  }
>(({ className, children, checked, onCheckedChange, ...props }, ref) => (
  <TouchableOpacity
    ref={ref}
    className={cn(
      "relative flex items-center rounded-sm py-1.5 pl-8 pr-2 text-sm",
      "focus:bg-accent focus:text-accent-foreground",
      className
    )}
    onPress={() => onCheckedChange?.(!checked)}
    {...props}
  >
    <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {checked && <Ionicons name="checkmark" size={16} color="#64748b" />}
    </View>
    {children}
  </TouchableOpacity>
))
MenubarCheckboxItem.displayName = "MenubarCheckboxItem"

const MenubarRadioItem = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & {
    className?: string
    children: React.ReactNode
    value: string
    onSelect?: (value: string) => void
  }
>(({ className, children, value, onSelect, ...props }, ref) => {
  const { onOpenChange } = React.useContext(MenubarContext)!

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
MenubarRadioItem.displayName = "MenubarRadioItem"

const MenubarLabel = React.forwardRef<
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
MenubarLabel.displayName = "MenubarLabel"

const MenubarSeparator = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
MenubarSeparator.displayName = "MenubarSeparator"

const MenubarShortcut = ({
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
      className={cn("ml-auto text-xs text-muted-foreground", className)}
      {...props}
    >
      {children}
    </Text>
  )
}
MenubarShortcut.displayName = "MenubarShortcut"

// Stub components for compatibility
const MenubarMenu = ({ children }: { children: React.ReactNode }) => <>{children}</>
const MenubarGroup = ({ children }: { children: React.ReactNode }) => <>{children}</>
const MenubarPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>
const MenubarRadioGroup = ({ children }: { children: React.ReactNode }) => <>{children}</>
const MenubarSub = ({ children }: { children: React.ReactNode }) => <>{children}</>
const MenubarSubTrigger = ({ children }: { children: React.ReactNode }) => <>{children}</>
const MenubarSubContent = ({ children }: { children: React.ReactNode }) => <>{children}</>

export {
  Menubar, MenubarCheckboxItem, MenubarContent, MenubarGroup, MenubarItem, MenubarLabel, MenubarMenu, MenubarPortal, MenubarRadioGroup,
  MenubarRadioItem, MenubarSeparator, MenubarShortcut, MenubarSub, MenubarSubContent,
  MenubarSubTrigger, MenubarTrigger
}

