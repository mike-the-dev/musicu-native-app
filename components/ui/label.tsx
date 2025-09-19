import { cva } from "class-variance-authority";
import * as React from "react";
import { Text } from "react-native";

import { cn } from "../../lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

interface LabelProps extends React.ComponentPropsWithoutRef<typeof Text> {
  className?: string
  children?: React.ReactNode
}

const Label = React.forwardRef<Text, LabelProps>(({ className, children, ...props }, ref) => (
  <Text ref={ref} className={cn(labelVariants(), className)} {...props}>
    {children}
  </Text>
))
Label.displayName = "Label"

export { Label };

