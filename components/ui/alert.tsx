import { cva } from "class-variance-authority";
import * as React from "react";
import { Text, View } from "react-native";

import { cn } from "../../lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground [&>svg~*]:pl-7",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface AlertProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
  variant?: "default" | "destructive"
  children?: React.ReactNode
}

const Alert = React.forwardRef<View, AlertProps>(({ className, variant, children, ...props }, ref) => (
  <View
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  >
    {children}
  </View>
))
Alert.displayName = "Alert"

interface AlertTitleProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string
  children?: React.ReactNode
}

const AlertTitle = React.forwardRef<Text, AlertTitleProps>(({ className, children, ...props }, ref) => (
  <Text
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  >
    {children}
  </Text>
))
AlertTitle.displayName = "AlertTitle"

interface AlertDescriptionProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
  children?: React.ReactNode
}

const AlertDescription = React.forwardRef<View, AlertDescriptionProps>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  >
    {children}
  </View>
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertDescription, AlertTitle };

