import { toggleVariants } from "@/components/ui/toggle"
import { cn } from "@/lib/utils"
import * as React from "react"
import { TouchableOpacity, View } from "react-native"

// For React Native, we'll create a simplified toggle group component
// since @radix-ui/react-toggle-group doesn't work in React Native

interface ToggleGroupContextValue {
  size: "default" | "sm" | "lg"
  variant: "default" | "outline"
}

const ToggleGroupContext = React.createContext<ToggleGroupContextValue>({
  size: "default",
  variant: "default",
})

interface ToggleGroupProps {
  type?: "single" | "multiple"
  value?: string | string[]
  onValueChange?: (value: string | string[]) => void
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  className?: string
  children: React.ReactNode
  disabled?: boolean
}

const ToggleGroup = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & ToggleGroupProps
>(({ className, variant, size, type = "single", value, onValueChange, children, disabled, ...props }, ref) => {
  const [selectedValues, setSelectedValues] = React.useState<string[]>(() => {
    if (type === "multiple") {
      return Array.isArray(value) ? value : []
    } else {
      return value ? [value as string] : []
    }
  })

  const handleValueChange = (itemValue: string) => {
    if (disabled) return

    if (type === "multiple") {
      const newValues = selectedValues.includes(itemValue)
        ? selectedValues.filter(v => v !== itemValue)
        : [...selectedValues, itemValue]
      setSelectedValues(newValues)
      onValueChange?.(newValues)
    } else {
      const newValue = selectedValues.includes(itemValue) ? "" : itemValue
      setSelectedValues(newValue ? [newValue] : [])
      onValueChange?.(newValue)
    }
  }

  return (
    <ToggleGroupContext.Provider value={{ variant: variant || "default", size: size || "default" }}>
      <View
        ref={ref}
        className={cn("flex items-center justify-center gap-1", className)}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === ToggleGroupItem) {
            const childProps = child.props as ToggleGroupItemProps
            return React.cloneElement(child as React.ReactElement<ToggleGroupItemProps>, {
              selected: selectedValues.includes(childProps.value || ""),
              onPress: () => handleValueChange(childProps.value || ""),
              disabled: disabled || childProps.disabled,
            })
          }
          return child
        })}
      </View>
    </ToggleGroupContext.Provider>
  )
})

ToggleGroup.displayName = "ToggleGroup"

interface ToggleGroupItemProps {
  value: string
  className?: string
  children: React.ReactNode
  disabled?: boolean
  selected?: boolean
  onPress?: () => void
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
}

const ToggleGroupItem = React.forwardRef<
  React.ComponentRef<typeof TouchableOpacity>,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & ToggleGroupItemProps
>(({ className, children, variant, size, selected, onPress, disabled, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <TouchableOpacity
      ref={ref}
      className={cn(
        toggleVariants({
          variant: variant || context.variant,
          size: size || context.size,
        }),
        "focus:outline-none focus:ring-1 focus:ring-ring",
        "disabled:opacity-50",
        selected && "bg-accent text-accent-foreground",
        className
      )}
      onPress={onPress}
      disabled={disabled}
      {...props}
    >
      {children}
    </TouchableOpacity>
  )
})

ToggleGroupItem.displayName = "ToggleGroupItem"

export { ToggleGroup, ToggleGroupItem }
