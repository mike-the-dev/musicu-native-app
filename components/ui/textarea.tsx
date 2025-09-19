import * as React from "react"
import { TextInput } from "react-native"

import { cn } from "../../lib/utils"

interface TextareaProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  className?: string
}

const Textarea = React.forwardRef<TextInput, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      multiline
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
})
Textarea.displayName = "Textarea"

export { Textarea }
