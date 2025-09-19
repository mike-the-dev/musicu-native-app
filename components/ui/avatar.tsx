import * as React from "react"
import { Image, Text, View } from "react-native"

import { cn } from "../../lib/utils"

interface AvatarProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
}

const Avatar = React.forwardRef<View, AvatarProps>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full", className)}
    {...props} />
))
Avatar.displayName = "Avatar"

interface AvatarImageProps extends React.ComponentPropsWithoutRef<typeof Image> {
  className?: string
}

const AvatarImage = React.forwardRef<Image, AvatarImageProps>(({ className, ...props }, ref) => (
  <Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props} />
))
AvatarImage.displayName = "AvatarImage"

interface AvatarFallbackProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
  children?: React.ReactNode
}

const AvatarFallback = React.forwardRef<View, AvatarFallbackProps>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  >
    {typeof children === 'string' ? (
      <Text className="text-sm font-medium">{children}</Text>
    ) : (
      children
    )}
  </View>
))
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarFallback, AvatarImage }

