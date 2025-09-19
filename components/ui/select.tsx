import { cn } from "@/lib/utils"
import { Check, ChevronDown, ChevronUp } from "lucide-react-native"
import * as React from "react"
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native"

// For React Native, we'll create a simplified select component
// since @radix-ui/react-select doesn't work in React Native

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  children: React.ReactNode
}

const SelectContext = React.createContext<{
  value?: string
  onValueChange?: (value: string) => void
  open: boolean
  onOpenChange: (open: boolean) => void
}>({
  open: false,
  onOpenChange: () => {},
})

const Select = ({ value, onValueChange, defaultValue, children }: SelectProps) => {
  const [open, setOpen] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(defaultValue || value)

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue)
    onValueChange?.(newValue)
    setOpen(false)
  }

  return (
    <SelectContext.Provider value={{
      value: selectedValue,
      onValueChange: handleValueChange,
      open,
      onOpenChange: setOpen
    }}>
      {children}
    </SelectContext.Provider>
  )
}

const SelectGroup = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <View className={cn("space-y-1", className)}>
    {children}
  </View>
)

const SelectValue = ({ placeholder }: { placeholder?: string }) => {
  const { value } = React.useContext(SelectContext)
  return (
    <Text className={cn(
      "text-sm",
      !value && "text-muted-foreground"
    )}>
      {value || placeholder}
    </Text>
  )
}

const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof TouchableOpacity>,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & {
    className?: string
    children?: React.ReactNode
  }
>(({ className, children, ...props }, ref) => {
  const { open, onOpenChange } = React.useContext(SelectContext)
  
  return (
    <TouchableOpacity
      ref={ref}
      className={cn(
        "flex h-9 flex-row items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm",
        "focus:outline-none focus:ring-1 focus:ring-ring",
        "disabled:opacity-50",
        className
      )}
      onPress={() => onOpenChange(!open)}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </TouchableOpacity>
  )
})
SelectTrigger.displayName = "SelectTrigger"

const SelectScrollUpButton = React.forwardRef<
  React.ComponentRef<typeof TouchableOpacity>,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & { className?: string }
>(({ className, ...props }, ref) => (
  <TouchableOpacity
    ref={ref}
    className={cn("flex items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </TouchableOpacity>
))
SelectScrollUpButton.displayName = "SelectScrollUpButton"

const SelectScrollDownButton = React.forwardRef<
  React.ComponentRef<typeof TouchableOpacity>,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & { className?: string }
>(({ className, ...props }, ref) => (
  <TouchableOpacity
    ref={ref}
    className={cn("flex items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </TouchableOpacity>
))
SelectScrollDownButton.displayName = "SelectScrollDownButton"

const SelectContent = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children: React.ReactNode
    position?: "popper" | "item-aligned"
  }
>(({ className, children, position = "popper", ...props }, ref) => {
  const { open, onOpenChange } = React.useContext(SelectContext)
  
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
          <View
            ref={ref}
            className={cn(
              "relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border bg-popover shadow-md",
              className
            )}
            {...props}
          >
            <SelectScrollUpButton />
            <ScrollView className="p-1">
              {children}
            </ScrollView>
            <SelectScrollDownButton />
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  )
})
SelectContent.displayName = "SelectContent"

const SelectLabel = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text> & { className?: string }
>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("px-2 py-1.5 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = "SelectLabel"

const SelectItem = React.forwardRef<
  React.ComponentRef<typeof TouchableOpacity>,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & {
    className?: string
    value: string
    children: React.ReactNode
  }
>(({ className, value, children, ...props }, ref) => {
  const { value: selectedValue, onValueChange } = React.useContext(SelectContext)
  const isSelected = selectedValue === value
  
  return (
    <TouchableOpacity
      ref={ref}
      className={cn(
        "relative flex w-full flex-row items-center rounded-sm py-1.5 pl-2 pr-8 text-sm",
        "focus:bg-accent focus:text-accent-foreground",
        isSelected && "bg-accent",
        className
      )}
      onPress={() => onValueChange?.(value)}
      {...props}
    >
      <View className="flex-1">
        {children}
      </View>
      {isSelected && (
        <View className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
          <Check className="h-4 w-4" />
        </View>
      )}
    </TouchableOpacity>
  )
})
SelectItem.displayName = "SelectItem"

const SelectSeparator = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & { className?: string }
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = "SelectSeparator"

export {
  Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectScrollDownButton, SelectScrollUpButton, SelectSeparator, SelectTrigger, SelectValue
}

