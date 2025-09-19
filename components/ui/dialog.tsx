import { Ionicons } from "@expo/vector-icons"
import * as React from "react"
import { Modal, Pressable, Text, View } from "react-native"

import { cn } from "../../lib/utils"

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

const Dialog = ({ open = false, onOpenChange, children }: DialogProps) => {
  return (
    <Modal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={() => onOpenChange?.(false)}
    >
      {children}
    </Modal>
  );
};

interface DialogTriggerProps {
  children?: React.ReactNode
  onPress?: () => void
}

const DialogTrigger = ({ children, onPress }: DialogTriggerProps) => {
  return (
    <Pressable onPress={onPress}>
      {children}
    </Pressable>
  );
};

interface DialogPortalProps {
  children?: React.ReactNode
}

const DialogPortal = ({ children }: DialogPortalProps) => {
  return <>{children}</>;
};

interface DialogCloseProps {
  children?: React.ReactNode
  onPress?: () => void
  className?: string
}

const DialogClose = ({ children, onPress, className }: DialogCloseProps) => {
  return (
    <Pressable onPress={onPress} className={className}>
      {children}
    </Pressable>
  );
};

interface DialogOverlayProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
}

const DialogOverlay = React.forwardRef<View, DialogOverlayProps>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = "DialogOverlay"

interface DialogContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
  children?: React.ReactNode
  onClose?: () => void
}

const DialogContent = React.forwardRef<View, DialogContentProps>(({ className, children, onClose, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <View
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
      <DialogClose
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        onPress={onClose}
      >
        <Ionicons name="close" size={16} color="#64748b" />
        <Text className="sr-only">Close</Text>
      </DialogClose>
    </View>
  </DialogPortal>
))
DialogContent.displayName = "DialogContent"

interface DialogHeaderProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
}

const DialogHeader = ({ className, ...props }: DialogHeaderProps) => (
  <View
    className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)}
    {...props}
  />
)
DialogHeader.displayName = "DialogHeader"

interface DialogFooterProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
}

const DialogFooter = ({ className, ...props }: DialogFooterProps) => (
  <View
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
)
DialogFooter.displayName = "DialogFooter"

interface DialogTitleProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string
  children?: React.ReactNode
}

const DialogTitle = React.forwardRef<Text, DialogTitleProps>(({ className, children, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight", className)}
    {...props}
  >
    {children}
  </Text>
))
DialogTitle.displayName = "DialogTitle"

interface DialogDescriptionProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string
  children?: React.ReactNode
}

const DialogDescription = React.forwardRef<Text, DialogDescriptionProps>(({ className, children, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  >
    {children}
  </Text>
))
DialogDescription.displayName = "DialogDescription"

export {
  Dialog, DialogClose,
  DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger
}

