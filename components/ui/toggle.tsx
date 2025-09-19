import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import * as React from "react"
import { TouchableOpacity } from "react-native"

// For React Native, we'll create a simplified toggle component
// since @radix-ui/react-toggle doesn't work in React Native

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent shadow-sm",
      },
      size: {
        default: "h-9 px-2 min-w-9",
        sm: "h-8 px-1.5 min-w-8",
        lg: "h-10 px-2.5 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ToggleProps {
  pressed?: boolean
  onPressedChange?: (pressed: boolean) => void
  variant?: "default" | "outline"
  size?: "default" | "sm" | "lg"
  className?: string
  children?: React.ReactNode
  disabled?: boolean
}

const Toggle = React.forwardRef<
  any,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & ToggleProps
>(({ className, variant, size, pressed, onPressedChange, children, disabled, ...props }, ref) => {
  const [isPressed, setIsPressed] = React.useState(pressed || false)

  const handlePress = () => {
    if (disabled) return
    
    const newPressed = !isPressed
    setIsPressed(newPressed)
    onPressedChange?.(newPressed)
  }

  return (
    <TouchableOpacity
      ref={ref}
      className={cn(
        toggleVariants({ variant, size }),
        "focus:outline-none focus:ring-1 focus:ring-ring",
        "disabled:opacity-50",
        isPressed && "bg-accent text-accent-foreground",
        className
      )}
      onPress={handlePress}
      disabled={disabled}
      {...props}
    >
      {children}
    </TouchableOpacity>
  )
})

Toggle.displayName = "Toggle"

export { Toggle, toggleVariants }
