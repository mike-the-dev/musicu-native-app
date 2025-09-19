import { Ionicons } from "@expo/vector-icons"
import * as React from "react"
import { Animated, Text, TextInput, View } from "react-native"
import { cn } from "../../lib/utils"

// For React Native, we'll create a simplified OTP input component
// since input-otp library doesn't work in React Native

interface InputOTPContextValue {
  slots: Array<{
    char: string
    hasFakeCaret: boolean
    isActive: boolean
  }>
  value: string
  onValueChange: (value: string) => void
  maxLength: number
}

const InputOTPContext = React.createContext<InputOTPContextValue | undefined>(undefined)

interface InputOTPProps {
  value?: string
  onChange?: (value: string) => void
  maxLength?: number
  className?: string
  containerClassName?: string
  children: React.ReactNode
  disabled?: boolean
}

const InputOTP = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & InputOTPProps
>(({ className, containerClassName, value = "", onChange, maxLength = 6, children, disabled, ...props }, ref) => {
  const [currentValue, setCurrentValue] = React.useState(value)
  const [activeIndex, setActiveIndex] = React.useState(0)

  const handleValueChange = (newValue: string) => {
    if (newValue.length <= maxLength) {
      setCurrentValue(newValue)
      onChange?.(newValue)
    }
  }

  const slots = Array.from({ length: maxLength }, (_, index) => ({
    char: currentValue[index] || "",
    hasFakeCaret: index === activeIndex && currentValue.length === index,
    isActive: index === activeIndex,
  }))

  return (
    <InputOTPContext.Provider value={{
      slots,
      value: currentValue,
      onValueChange: handleValueChange,
      maxLength
    }}>
      <View
        ref={ref}
        className={cn(
          "flex items-center gap-2",
          disabled && "opacity-50",
          containerClassName
        )}
        {...props}
      >
        {children}
      </View>
    </InputOTPContext.Provider>
  )
})
InputOTP.displayName = "InputOTP"

const InputOTPGroup = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("flex items-center", className)}
    {...props}
  >
    {children}
  </View>
))
InputOTPGroup.displayName = "InputOTPGroup"

const InputOTPSlot = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    index: number
    className?: string
  }
>(({ index, className, ...props }, ref) => {
  const context = React.useContext(InputOTPContext)!
  const { slots } = context
  const { char, hasFakeCaret, isActive } = slots[index]
  const [focused, setFocused] = React.useState(false)

  const caretAnim = React.useRef(new Animated.Value(1)).current

  React.useEffect(() => {
    if (hasFakeCaret) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(caretAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(caretAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start()
    } else {
      caretAnim.setValue(1)
    }
  }, [hasFakeCaret, caretAnim])

  return (
    <View
      ref={ref}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center border border-input text-sm shadow-sm transition-all",
        index === 0 && "rounded-l-md",
        index === context.maxLength - 1 && "rounded-r-md",
        isActive && "z-10 ring-1 ring-ring",
        className
      )}
      {...props}
    >
      <TextInput
        className="absolute inset-0 text-center text-lg font-mono"
        value={char}
        maxLength={1}
        keyboardType="numeric"
        selectTextOnFocus
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChangeText={(text) => {
          if (text.length <= 1) {
            const newValue = context.value.split('')
            newValue[index] = text
            context.onValueChange(newValue.join(''))
            
            // Move to next slot if text entered
            if (text && index < context.maxLength - 1) {
              // Focus next input would be handled by parent
            }
          }
        }}
        style={{ opacity: 0 }} // Hide the actual TextInput, we'll show the styled version
      />
      <Text className={cn(
        "text-lg font-mono",
        char && "text-foreground",
        !char && "text-muted-foreground"
      )}>
        {char || " "}
      </Text>
      {hasFakeCaret && (
        <Animated.View
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: caretAnim }}
        >
          <View className="h-4 w-px bg-foreground" />
        </Animated.View>
      )}
    </View>
  )
})
InputOTPSlot.displayName = "InputOTPSlot"

const InputOTPSeparator = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View>
>(({ ...props }, ref) => (
  <View ref={ref} className="flex items-center justify-center px-2" {...props}>
    <Ionicons name="remove" size={16} color="#64748b" />
  </View>
))
InputOTPSeparator.displayName = "InputOTPSeparator"

export { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot }

