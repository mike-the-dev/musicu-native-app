import Slider from '@react-native-community/slider'
import * as React from "react"
import { View } from "react-native"

import { cn } from "../../lib/utils"

interface SliderProps {
  className?: string
  value?: number[]
  onValueChange?: (value: number[]) => void
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}

const SliderComponent = React.forwardRef<View, SliderProps>(({ className, value = [0], onValueChange, min = 0, max = 100, step = 1, disabled = false, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}
  >
    <Slider
      style={{ width: '100%', height: 40 }}
      minimumValue={min}
      maximumValue={max}
      value={value[0] || 0}
      onValueChange={(val) => onValueChange?.([val])}
      step={step}
      disabled={disabled}
      minimumTrackTintColor="#0ea5e9"
      maximumTrackTintColor="#e2e8f0"
      thumbTintColor="#ffffff"
    />
  </View>
))
SliderComponent.displayName = "Slider"

export { SliderComponent as Slider }
