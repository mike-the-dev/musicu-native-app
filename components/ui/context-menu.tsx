import { Ionicons } from "@expo/vector-icons"
import * as React from "react"
import { Pressable, Text, View } from "react-native"

import { cn } from "../../lib/utils"

interface ContextMenuProps {
  children?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const ContextMenu = ({ children, open = false, onOpenChange }: ContextMenuProps) => {
  return <>{children}</>;
};

interface ContextMenuTriggerProps {
  children?: React.ReactNode
  onPress?: () => void
}

const ContextMenuTrigger = ({ children, onPress }: ContextMenuTriggerProps) => {
  return (
    <Pressable onPress={onPress}>
      {children}
    </Pressable>
  );
};

interface ContextMenuGroupProps {
  children?: React.ReactNode
}

const ContextMenuGroup = ({ children }: ContextMenuGroupProps) => {
  return <>{children}</>;
};

interface ContextMenuPortalProps {
  children?: React.ReactNode
}

const ContextMenuPortal = ({ children }: ContextMenuPortalProps) => {
  return <>{children}</>;
};

interface ContextMenuSubProps {
  children?: React.ReactNode
}

const ContextMenuSub = ({ children }: ContextMenuSubProps) => {
  return <>{children}</>;
};

interface ContextMenuRadioGroupProps {
  children?: React.ReactNode
  value?: string
  onValueChange?: (value: string) => void
}

const ContextMenuRadioGroup = ({ children, value, onValueChange }: ContextMenuRadioGroupProps) => {
  return <>{children}</>;
};

interface ContextMenuSubTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string
  inset?: boolean
  children?: React.ReactNode
}

const ContextMenuSubTrigger = React.forwardRef<View, ContextMenuSubTriggerProps>(({ className, inset, children, ...props }, ref) => (
  <Pressable
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <Ionicons name="chevron-forward" size={16} color="#64748b" className="ml-auto h-4 w-4" />
  </Pressable>
))
ContextMenuSubTrigger.displayName = "ContextMenuSubTrigger"

interface ContextMenuSubContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
  children?: React.ReactNode
}

const ContextMenuSubContent = React.forwardRef<View, ContextMenuSubContentProps>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  >
    {children}
  </View>
))
ContextMenuSubContent.displayName = "ContextMenuSubContent"

interface ContextMenuContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
  children?: React.ReactNode
}

const ContextMenuContent = React.forwardRef<View, ContextMenuContentProps>(({ className, children, ...props }, ref) => (
  <ContextMenuPortal>
    <View
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    >
      {children}
    </View>
  </ContextMenuPortal>
))
ContextMenuContent.displayName = "ContextMenuContent"

interface ContextMenuItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string
  inset?: boolean
  children?: React.ReactNode
}

const ContextMenuItem = React.forwardRef<View, ContextMenuItemProps>(({ className, inset, children, ...props }, ref) => (
  <Pressable
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
  </Pressable>
))
ContextMenuItem.displayName = "ContextMenuItem"

interface ContextMenuCheckboxItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string
  children?: React.ReactNode
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const ContextMenuCheckboxItem = React.forwardRef<View, ContextMenuCheckboxItemProps>(({ className, children, checked, onCheckedChange, ...props }, ref) => (
  <Pressable
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    onPress={() => onCheckedChange?.(!checked)}
    {...props}
  >
    <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {checked && <Ionicons name="checkmark" size={16} color="#64748b" />}
    </View>
    {children}
  </Pressable>
))
ContextMenuCheckboxItem.displayName = "ContextMenuCheckboxItem"

interface ContextMenuRadioItemProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string
  children?: React.ReactNode
  value?: string
  checked?: boolean
}

const ContextMenuRadioItem = React.forwardRef<View, ContextMenuRadioItemProps>(({ className, children, checked, ...props }, ref) => (
  <Pressable
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {checked && <Ionicons name="radio-button-on" size={16} color="#64748b" />}
    </View>
    {children}
  </Pressable>
))
ContextMenuRadioItem.displayName = "ContextMenuRadioItem"

interface ContextMenuLabelProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string
  inset?: boolean
  children?: React.ReactNode
}

const ContextMenuLabel = React.forwardRef<Text, ContextMenuLabelProps>(({ className, inset, children, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
  </Text>
))
ContextMenuLabel.displayName = "ContextMenuLabel"

interface ContextMenuSeparatorProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
}

const ContextMenuSeparator = React.forwardRef<View, ContextMenuSeparatorProps>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
))
ContextMenuSeparator.displayName = "ContextMenuSeparator"

interface ContextMenuShortcutProps {
  className?: string
  children?: React.ReactNode
}

const ContextMenuShortcut = ({ className, children, ...props }: ContextMenuShortcutProps) => {
  return (
    <Text
      className={cn("ml-auto text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    >
      {children}
    </Text>
  );
}
ContextMenuShortcut.displayName = "ContextMenuShortcut"

export {
  ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuGroup, ContextMenuItem, ContextMenuLabel, ContextMenuPortal, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator,
  ContextMenuShortcut, ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger, ContextMenuTrigger
}

