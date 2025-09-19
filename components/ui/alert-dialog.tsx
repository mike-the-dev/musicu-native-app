import * as React from "react"
import { Modal, Pressable, Text, View } from "react-native"

import { cn } from "../../lib/utils"
import { buttonVariants } from "./button"

interface AlertDialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

const AlertDialog = ({ open = false, onOpenChange, children }: AlertDialogProps) => {
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

const AlertDialogTrigger = ({ children, onPress }: { children?: React.ReactNode, onPress?: () => void }) => {
  return (
    <Pressable onPress={onPress}>
      {children}
    </Pressable>
  );
};

const AlertDialogPortal = ({ children }: { children?: React.ReactNode }) => {
  return <>{children}</>;
};

interface AlertDialogOverlayProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
}

const AlertDialogOverlay = React.forwardRef<View, AlertDialogOverlayProps>(({ className, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
AlertDialogOverlay.displayName = "AlertDialogOverlay"

interface AlertDialogContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
  children?: React.ReactNode
}

const AlertDialogContent = React.forwardRef<View, AlertDialogContentProps>(({ className, children, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <View
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      )}
      {...props}
    >
      {children}
    </View>
  </AlertDialogPortal>
))
AlertDialogContent.displayName = "AlertDialogContent"

interface AlertDialogHeaderProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
}

const AlertDialogHeader = ({ className, ...props }: AlertDialogHeaderProps) => (
  <View
    className={cn("flex flex-col space-y-2 text-center sm:text-left", className)}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

interface AlertDialogFooterProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
}

const AlertDialogFooter = ({ className, ...props }: AlertDialogFooterProps) => (
  <View
    className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

interface AlertDialogTitleProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string
}

const AlertDialogTitle = React.forwardRef<Text, AlertDialogTitleProps>(({ className, ...props }, ref) => (
  <Text ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
))
AlertDialogTitle.displayName = "AlertDialogTitle"

interface AlertDialogDescriptionProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string
}

const AlertDialogDescription = React.forwardRef<Text, AlertDialogDescriptionProps>(({ className, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
AlertDialogDescription.displayName = "AlertDialogDescription"

interface AlertDialogActionProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string
  children?: React.ReactNode
}

const AlertDialogAction = React.forwardRef<View, AlertDialogActionProps>(({ className, children, ...props }, ref) => (
  <Pressable ref={ref} className={cn(buttonVariants(), className)} {...props}>
    <Text className="text-white font-medium">{children}</Text>
  </Pressable>
))
AlertDialogAction.displayName = "AlertDialogAction"

interface AlertDialogCancelProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string
  children?: React.ReactNode
}

const AlertDialogCancel = React.forwardRef<View, AlertDialogCancelProps>(({ className, children, ...props }, ref) => (
  <Pressable
    ref={ref}
    className={cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className)}
    {...props}
  >
    <Text className="text-foreground font-medium">{children}</Text>
  </Pressable>
))
AlertDialogCancel.displayName = "AlertDialogCancel"

export {
  AlertDialog, AlertDialogAction,
  AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, AlertDialogPortal, AlertDialogTitle, AlertDialogTrigger
}

