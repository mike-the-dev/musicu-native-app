import * as React from "react"
import { Modal, Pressable, Text, View } from "react-native"

import { cn } from "../../lib/utils"

interface DrawerProps {
  shouldScaleBackground?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

const Drawer = ({ shouldScaleBackground = true, open = false, onOpenChange, children }: DrawerProps) => (
  <Modal
    visible={open}
    transparent
    animationType="slide"
    onRequestClose={() => onOpenChange?.(false)}
  >
    {children}
  </Modal>
)
Drawer.displayName = "Drawer"

interface DrawerTriggerProps {
  children?: React.ReactNode
  onPress?: () => void
}

const DrawerTrigger = ({ children, onPress }: DrawerTriggerProps) => {
  return (
    <Pressable onPress={onPress}>
      {children}
    </Pressable>
  );
};

interface DrawerPortalProps {
  children?: React.ReactNode
}

const DrawerPortal = ({ children }: DrawerPortalProps) => {
  return <>{children}</>;
};

interface DrawerCloseProps {
  children?: React.ReactNode
  onPress?: () => void
}

const DrawerClose = ({ children, onPress }: DrawerCloseProps) => {
  return (
    <Pressable onPress={onPress}>
      {children}
    </Pressable>
  );
};

interface DrawerOverlayProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
}

const DrawerOverlay = React.forwardRef<View, DrawerOverlayProps>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
))
DrawerOverlay.displayName = "DrawerOverlay"

interface DrawerContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
  children?: React.ReactNode
}

const DrawerContent = React.forwardRef<View, DrawerContentProps>(({ className, children, ...props }, ref) => (
  <DrawerPortal>
    <DrawerOverlay />
    <View
      ref={ref}
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        className
      )}
      {...props}
    >
      <View className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
      {children}
    </View>
  </DrawerPortal>
))
DrawerContent.displayName = "DrawerContent"

interface DrawerHeaderProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
}

const DrawerHeader = ({ className, ...props }: DrawerHeaderProps) => (
  <View
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

interface DrawerFooterProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
}

const DrawerFooter = ({ className, ...props }: DrawerFooterProps) => (
  <View className={cn("mt-auto flex flex-col gap-2 p-4", className)} {...props} />
)
DrawerFooter.displayName = "DrawerFooter"

interface DrawerTitleProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string
  children?: React.ReactNode
}

const DrawerTitle = React.forwardRef<Text, DrawerTitleProps>(({ className, children, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  >
    {children}
  </Text>
))
DrawerTitle.displayName = "DrawerTitle"

interface DrawerDescriptionProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string
  children?: React.ReactNode
}

const DrawerDescription = React.forwardRef<Text, DrawerDescriptionProps>(({ className, children, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  >
    {children}
  </Text>
))
DrawerDescription.displayName = "DrawerDescription"

export {
  Drawer, DrawerClose,
  DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger
}

