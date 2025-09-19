import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"
import { X } from "lucide-react-native"
import * as React from "react"
import { Animated, Dimensions, Text, TouchableOpacity, View } from "react-native"

// For React Native, we'll create a simplified toast system
// since the web-based toast system doesn't work in React Native

interface ToastContextValue {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

interface Toast {
  id: string
  title?: string
  description?: string
  variant?: "default" | "destructive"
  action?: {
    label: string
    onPress: () => void
  }
}

const ToastContext = React.createContext<ToastContextValue | undefined>(undefined)

const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between overflow-hidden rounded-md border p-4 shadow-lg",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const addToast = React.useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setToasts(prev => [...prev, { ...toast, id }])
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 5000)
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastViewport />
    </ToastContext.Provider>
  )
}

const ToastViewport = () => {
  const { toasts, removeToast } = React.useContext(ToastContext)!
  const screenWidth = Dimensions.get('window').width

  return (
    <View className="fixed top-0 z-[100] flex w-full flex-col-reverse p-4">
      {toasts.map((toast, index) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={() => removeToast(toast.id)}
          index={index}
        />
      ))}
    </View>
  )
}

const ToastItem = ({ toast, onRemove, index }: { 
  toast: Toast
  onRemove: () => void
  index: number
}) => {
  const translateY = React.useRef(new Animated.Value(-100)).current

  React.useEffect(() => {
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      tension: 100,
      friction: 8,
    }).start()
  }, [])

  const handleRemove = () => {
    Animated.timing(translateY, {
      toValue: -100,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onRemove()
    })
  }

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        marginBottom: index > 0 ? 8 : 0,
      }}
    >
      <Toast
        variant={toast.variant}
        title={toast.title}
        description={toast.description}
        action={toast.action}
        onClose={handleRemove}
      />
    </Animated.View>
  )
}

const Toast = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    variant?: "default" | "destructive"
    title?: string
    description?: string
    action?: {
      label: string
      onPress: () => void
    }
    onClose?: () => void
  }
>(({ className, variant, title, description, action, onClose, ...props }, ref) => {
  return (
    <View
      ref={ref}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    >
      <View className="flex-1">
        {title && (
          <ToastTitle>{title}</ToastTitle>
        )}
        {description && (
          <ToastDescription>{description}</ToastDescription>
        )}
      </View>
      
      {action && (
        <ToastAction
          label={action.label}
          onPress={action.onPress}
        />
      )}
      
      {onClose && (
        <ToastClose onPress={onClose} />
      )}
    </View>
  )
})
Toast.displayName = "Toast"

const ToastAction = React.forwardRef<
  React.ComponentRef<typeof TouchableOpacity>,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & {
    className?: string
    label: string
    onPress: () => void
  }
>(({ className, label, onPress, ...props }, ref) => (
  <TouchableOpacity
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium",
      "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
      "disabled:opacity-50",
      "group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    )}
    onPress={onPress}
    {...props}
  >
    <Text className="text-sm font-medium">{label}</Text>
  </TouchableOpacity>
))
ToastAction.displayName = "ToastAction"

const ToastClose = React.forwardRef<
  React.ComponentRef<typeof TouchableOpacity>,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & {
    className?: string
    onPress: () => void
  }
>(({ className, onPress, ...props }, ref) => (
  <TouchableOpacity
    ref={ref}
    className={cn(
      "absolute right-2 top-2 rounded-md p-1 opacity-70",
      "group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    )}
    onPress={onPress}
    {...props}
  >
    <X className="h-4 w-4" />
  </TouchableOpacity>
))
ToastClose.displayName = "ToastClose"

const ToastTitle = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text> & {
    className?: string
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("text-sm font-semibold", className)}
    {...props}
  >
    {children}
  </Text>
))
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text> & {
    className?: string
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("text-sm opacity-90", className)}
    {...props}
  >
    {children}
  </Text>
))
ToastDescription.displayName = "ToastDescription"

// Hook to use toast
const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export {
  Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport, useToast
}

