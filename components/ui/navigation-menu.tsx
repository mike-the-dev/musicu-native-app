import { Ionicons } from "@expo/vector-icons"
import { cva } from "class-variance-authority"
import * as React from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { cn } from "../../lib/utils"

// For React Native, we'll create a simplified navigation menu component
// since @radix-ui/react-navigation-menu doesn't work in React Native

interface NavigationMenuContextValue {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const NavigationMenuContext = React.createContext<NavigationMenuContextValue | undefined>(undefined)

const NavigationMenu = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => {
  const [open, setOpen] = React.useState(false)

  return (
    <NavigationMenuContext.Provider value={{
      open,
      onOpenChange: setOpen
    }}>
      <View
        ref={ref}
        className={cn(
          "relative z-10 flex max-w-max flex-1 items-center justify-center",
          className
        )}
        {...props}
      >
        {children}
        <NavigationMenuViewport />
      </View>
    </NavigationMenuContext.Provider>
  )
})
NavigationMenu.displayName = "NavigationMenu"

const NavigationMenuList = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className
    )}
    {...props}
  >
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {children}
    </ScrollView>
  </View>
))
NavigationMenuList.displayName = "NavigationMenuList"

const NavigationMenuItem = ({ children }: { children: React.ReactNode }) => <>{children}</>

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        active: "bg-accent/50 text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const NavigationMenuTrigger = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & {
    className?: string
    children: React.ReactNode
    variant?: "default" | "active"
  }
>(({ className, children, variant = "default", ...props }, ref) => (
  <TouchableOpacity
    ref={ref}
    className={cn(navigationMenuTriggerStyle({ variant }), "group", className)}
    {...props}
  >
    <Text className="text-sm font-medium">
      {children}
    </Text>
    <Ionicons name="chevron-down" size={12} color="#64748b" />
  </TouchableOpacity>
))
NavigationMenuTrigger.displayName = "NavigationMenuTrigger"

const NavigationMenuContent = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => {
  const { open } = React.useContext(NavigationMenuContext)!
  
  if (!open) return null

  return (
    <View
      ref={ref}
      className={cn(
        "left-0 top-0 w-full",
        className
      )}
      {...props}
    >
      {children}
    </View>
  )
})
NavigationMenuContent.displayName = "NavigationMenuContent"

const NavigationMenuLink = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & {
    className?: string
    children: React.ReactNode
    href?: string
  }
>(({ className, children, ...props }, ref) => (
  <TouchableOpacity
    ref={ref}
    className={cn("inline-flex items-center justify-center", className)}
    {...props}
  >
    {children}
  </TouchableOpacity>
))
NavigationMenuLink.displayName = "NavigationMenuLink"

const NavigationMenuViewport = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children?: React.ReactNode
  }
>(({ className, children, ...props }, ref) => {
  const { open } = React.useContext(NavigationMenuContext)!
  
  if (!open) return null

  return (
    <View className={cn("absolute left-0 top-full flex justify-center")}>
      <View
        ref={ref}
        className={cn(
          "origin-top-center relative mt-1.5 w-full overflow-hidden rounded-md border bg-popover shadow",
          className
        )}
        {...props}
      >
        {children}
      </View>
    </View>
  )
})
NavigationMenuViewport.displayName = "NavigationMenuViewport"

const NavigationMenuIndicator = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
  }
>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
      className
    )}
    {...props}
  >
    <View className="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </View>
))
NavigationMenuIndicator.displayName = "NavigationMenuIndicator"

export {
  NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport
}

