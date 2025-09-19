import * as React from "react"
import { Switch as RNSwitch } from "react-native"

import { cn } from "../../lib/utils"

interface SwitchProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

const Switch = React.forwardRef<RNSwitch, SwitchProps>(({ className, checked, onCheckedChange, disabled, ...props }, ref) => (
  <RNSwitch
    ref={ref}
    value={checked}
    onValueChange={onCheckedChange}
    disabled={disabled}
    className={cn(
      "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
      className
    )}
    {...props}
  />
))
Switch.displayName = "Switch"

export { Switch }
