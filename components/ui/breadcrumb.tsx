import { Ionicons } from "@expo/vector-icons"
import * as React from "react"
import { Pressable, Text, View } from "react-native"

import { cn } from "../../lib/utils"

interface BreadcrumbProps extends React.ComponentPropsWithoutRef<typeof View> {
  children?: React.ReactNode
}

const Breadcrumb = React.forwardRef<View, BreadcrumbProps>(
  ({ children, ...props }, ref) => (
    <View ref={ref} {...props}>
      {children}
    </View>
  )
)
Breadcrumb.displayName = "Breadcrumb"

interface BreadcrumbListProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
}

const BreadcrumbList = React.forwardRef<View, BreadcrumbListProps>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5",
      className
    )}
    {...props}
  />
))
BreadcrumbList.displayName = "BreadcrumbList"

interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
}

const BreadcrumbItem = React.forwardRef<View, BreadcrumbItemProps>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
))
BreadcrumbItem.displayName = "BreadcrumbItem"

interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  asChild?: boolean
  className?: string
}

const BreadcrumbLink = React.forwardRef<View, BreadcrumbLinkProps>(({ asChild = false, className, ...props }, ref) => {
  return (
    <Pressable
      ref={ref}
      className={cn("transition-colors hover:text-foreground", className)}
      {...props}
    />
  );
})
BreadcrumbLink.displayName = "BreadcrumbLink"

interface BreadcrumbPageProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string
}

const BreadcrumbPage = React.forwardRef<Text, BreadcrumbPageProps>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
))
BreadcrumbPage.displayName = "BreadcrumbPage"

interface BreadcrumbSeparatorProps {
  children?: React.ReactNode
  className?: string
}

const BreadcrumbSeparator = ({ children, className, ...props }: BreadcrumbSeparatorProps) => (
  <View
    className={cn("[&>svg]:w-3.5 [&>svg]:h-3.5", className)}
    {...props}
  >
    {children ?? <Ionicons name="chevron-forward" size={14} color="#64748b" />}
  </View>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

interface BreadcrumbEllipsisProps {
  className?: string
}

const BreadcrumbEllipsis = ({ className, ...props }: BreadcrumbEllipsisProps) => (
  <View
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <Ionicons name="ellipsis-horizontal" size={16} color="#64748b" />
    <Text className="sr-only">More</Text>
  </View>
)
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

export {
  Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbList, BreadcrumbPage,
  BreadcrumbSeparator
}

