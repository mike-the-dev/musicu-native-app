import { cn } from "@/lib/utils"
import * as React from "react"
import { ScrollView, Text, View } from "react-native"

// For React Native, we'll create a simplified table component
// since HTML table elements don't exist in React Native

const Table = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <View className="relative w-full">
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View
        ref={ref}
        className={cn("w-full text-sm", className)}
        {...props}
      >
        {children}
      </View>
    </ScrollView>
  </View>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <View ref={ref} className={cn("border-b", className)} {...props}>
    {children}
  </View>
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("divide-y", className)}
    {...props}
  >
    {children}
  </View>
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("border-t bg-muted/50 font-medium", className)}
    {...props}
  >
    {children}
  </View>
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "flex-row border-b transition-colors hover:bg-muted/50",
      className
    )}
    {...props}
  >
    {children}
  </View>
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "h-10 px-2 flex-1 justify-center",
      "text-left font-medium text-muted-foreground",
      className
    )}
    {...props}
  >
    <Text className="text-sm font-medium text-muted-foreground">
      {children}
    </Text>
  </View>
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "px-2 py-2 flex-1 justify-center",
      className
    )}
    {...props}
  >
    <Text className="text-sm">
      {children}
    </Text>
  </View>
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text> & {
    className?: string
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  >
    {children}
  </Text>
))
TableCaption.displayName = "TableCaption"

export {
    Table, TableBody, TableCaption, TableCell, TableFooter,
    TableHead, TableHeader, TableRow
}

