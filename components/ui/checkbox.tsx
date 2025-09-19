import { Ionicons } from "@expo/vector-icons"
import * as React from "react"
import { Pressable, View } from "react-native"

import { cn } from "../../lib/utils"

interface CheckboxProps {
  className?: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  children?: React.ReactNode
}

const Checkbox = React.forwardRef<View, CheckboxProps>(({ className, checked = false, onCheckedChange, disabled = false, ...props }, ref) => (
  <Pressable
    ref={ref}
    onPress={() => onCheckedChange?.(!checked)}
    disabled={disabled}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
      checked ? "bg-primary" : "bg-background",
      className
    )}
    {...props}
  >
    <View className={cn("flex items-center justify-center text-current h-full w-full")}>
      {checked && <Ionicons name="checkmark" size={16} color="white" />}
    </View>
  </Pressable>
))
Checkbox.displayName = "Checkbox"

export { Checkbox }
