import { Ionicons } from "@expo/vector-icons"
import * as React from "react"
import { FlatList, Pressable, Text, TextInput, View } from "react-native"

import { cn } from "../../lib/utils"

interface CommandProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
  children?: React.ReactNode
}

const Command = React.forwardRef<View, CommandProps>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
      className
    )}
    {...props}
  >
    {children}
  </View>
))
Command.displayName = "Command"

interface CommandDialogProps {
  children?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const CommandDialog = ({ children, open = false, onOpenChange }: CommandDialogProps) => {
  return (
    <Command className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
      {children}
    </Command>
  );
};

interface CommandInputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  className?: string
  placeholder?: string
}

const CommandInput = React.forwardRef<TextInput, CommandInputProps>(({ className, ...props }, ref) => (
  <View className="flex items-center border-b px-3">
    <Ionicons name="search" size={16} color="#64748b" className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <TextInput
      ref={ref}
      className={cn(
        "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </View>
))
CommandInput.displayName = "CommandInput"

interface CommandListProps extends React.ComponentPropsWithoutRef<typeof FlatList> {
  className?: string
  data: any[]
  renderItem: ({ item, index }: { item: any, index: number }) => React.ReactElement
}

const CommandList = React.forwardRef<FlatList, CommandListProps>(({ className, data, renderItem, ...props }, ref) => (
  <FlatList
    ref={ref}
    data={data}
    renderItem={renderItem}
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    keyExtractor={(item, index) => index.toString()}
    {...props}
  />
))
CommandList.displayName = "CommandList"

interface CommandEmptyProps {
  className?: string
  children?: React.ReactNode
}

const CommandEmpty = React.forwardRef<View, CommandEmptyProps>((props, ref) => (
  <View ref={ref} className="py-6 text-center text-sm" {...props} />
))
CommandEmpty.displayName = "CommandEmpty"

interface CommandGroupProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
  children?: React.ReactNode
}

const CommandGroup = React.forwardRef<View, CommandGroupProps>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "overflow-hidden p-1 text-foreground",
      className
    )}
    {...props}
  >
    {children}
  </View>
))
CommandGroup.displayName = "CommandGroup"

interface CommandSeparatorProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
}

const CommandSeparator = React.forwardRef<View, CommandSeparatorProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn("-mx-1 h-px bg-border", className)} {...props} />
))
CommandSeparator.displayName = "CommandSeparator"

interface CommandItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string
  children?: React.ReactNode
  onPress?: () => void
}

const CommandItem = React.forwardRef<View, CommandItemProps>(({ className, children, onPress, ...props }, ref) => (
  <Pressable
    ref={ref}
    onPress={onPress}
    className={cn(
      "relative flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50",
      className
    )}
    {...props}
  >
    {children}
  </Pressable>
))
CommandItem.displayName = "CommandItem"

interface CommandShortcutProps {
  className?: string
  children?: React.ReactNode
}

const CommandShortcut = ({ className, children, ...props }: CommandShortcutProps) => {
  return (
    <Text
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    >
      {children}
    </Text>
  );
}
CommandShortcut.displayName = "CommandShortcut"

export {
  Command,
  CommandDialog, CommandEmpty,
  CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut
}

