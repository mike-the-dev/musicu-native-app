import { cn } from "@/lib/utils"
import * as React from "react"
import { TouchableOpacity, View } from "react-native"

// For React Native, we'll create a simplified radio group component
// since @radix-ui/react-radio-group doesn't work in React Native

interface RadioGroupContextValue {
  value?: string
  onValueChange?: (value: string) => void
}

const RadioGroupContext = React.createContext<RadioGroupContextValue | undefined>(undefined)

interface RadioGroupProps {
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  children: React.ReactNode
  className?: string
}

const RadioGroup = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & RadioGroupProps
>(({ className, value, onValueChange, defaultValue, children, ...props }, ref) => {
  const [selectedValue, setSelectedValue] = React.useState(defaultValue || value)

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue)
    onValueChange?.(newValue)
  }

  return (
    <RadioGroupContext.Provider value={{
      value: selectedValue,
      onValueChange: handleValueChange
    }}>
      <View
        ref={ref}
        className={cn("gap-2", className)}
        {...props}
      >
        {children}
      </View>
    </RadioGroupContext.Provider>
  )
})
RadioGroup.displayName = "RadioGroup"

interface RadioGroupItemProps {
  value: string
  className?: string
  disabled?: boolean
}

const RadioGroupItem = React.forwardRef<
  React.ComponentRef<typeof TouchableOpacity>,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & RadioGroupItemProps
>(({ className, value, disabled, ...props }, ref) => {
  const { value: selectedValue, onValueChange } = React.useContext(RadioGroupContext)!
  const isSelected = selectedValue === value

  return (
    <TouchableOpacity
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-primary shadow",
        "focus:outline-none focus:ring-1 focus:ring-ring",
        "disabled:opacity-50",
        isSelected && "border-primary",
        className
      )}
      onPress={() => !disabled && onValueChange?.(value)}
      disabled={disabled}
      {...props}
    >
      {isSelected && (
        <View className="flex items-center justify-center">
          <View className="h-3.5 w-3.5 rounded-full bg-primary" />
        </View>
      )}
    </TouchableOpacity>
  )
})
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
