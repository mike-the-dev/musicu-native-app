import { Ionicons } from "@expo/vector-icons"
import * as React from "react"
import { Text, TouchableOpacity, View } from "react-native"
import { cn } from "../../lib/utils"
import { buttonVariants } from "./button"

// For React Native, we'll create a simplified pagination component

const Pagination = ({
  className,
  children,
  ...props
}: {
  className?: string
  children: React.ReactNode
  [key: string]: any
}) => (
  <View
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  >
    {children}
  </View>
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  >
    {children}
  </View>
))
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <View ref={ref} className={cn("", className)} {...props}>
    {children}
  </View>
))
PaginationItem.displayName = "PaginationItem"

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  children,
  onPress,
  ...props
}: {
  className?: string
  isActive?: boolean
  size?: "default" | "sm" | "lg" | "icon"
  children: React.ReactNode
  onPress?: () => void
  [key: string]: any
}) => (
  <TouchableOpacity
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className
    )}
    onPress={onPress}
    {...props}
  >
    {children}
  </TouchableOpacity>
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({
  className,
  onPress,
  ...props
}: {
  className?: string
  onPress?: () => void
  [key: string]: any
}) => (
  <PaginationLink
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    onPress={onPress}
    {...props}
  >
    <Ionicons name="chevron-back" size={16} color="#64748b" />
    <Text>Previous</Text>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({
  className,
  onPress,
  ...props
}: {
  className?: string
  onPress?: () => void
  [key: string]: any
}) => (
  <PaginationLink
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    onPress={onPress}
    {...props}
  >
    <Text>Next</Text>
    <Ionicons name="chevron-forward" size={16} color="#64748b" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({
  className,
  ...props
}: {
  className?: string
  [key: string]: any
}) => (
  <View
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <Ionicons name="ellipsis-horizontal" size={16} color="#64748b" />
    <Text className="sr-only">More pages</Text>
  </View>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious
}

