import * as React from "react"
import { Text, View } from "react-native"
import { cn } from "../../lib/utils"
import { Label } from "./label"

const Form = ({ children }: { children: React.ReactNode }) => <>{children}</>

const FormFieldContext = React.createContext<{ name: string } | undefined>(undefined)

interface FormFieldProps {
  name: string
  render: ({ field, fieldState }: {
    field: any
    fieldState: any
  }) => React.ReactNode
  control?: any
  rules?: any
}

const FormField = ({ name, render, control, rules, ...props }: FormFieldProps) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      {render({ field: { name }, fieldState: { error: null } })}
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext)
  const itemContext = React.useContext(FormItemContext)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  if (!itemContext) {
    throw new Error("useFormField should be used within <FormItem>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error: null,
  }
}

const FormItemContext = React.createContext<{ id: string } | undefined>(undefined)

const FormItem = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => {
  const id = React.useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <View ref={ref} className={cn("space-y-2", className)} {...props}>
        {children}
      </View>
    </FormItemContext.Provider>
  )
})
FormItem.displayName = "FormItem"

const FormLabel = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text> & {
    className?: string
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <Label
      ref={ref}
      className={cn(error && "text-destructive", className)}
      {...props}
    >
      {children}
    </Label>
  )
})
FormLabel.displayName = "FormLabel"

const FormControl = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    children: React.ReactNode
  }
>(({ children, ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <View
      ref={ref}
      {...props}
    >
      {children}
    </View>
  )
})
FormControl.displayName = "FormControl"

const FormDescription = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text> & {
    className?: string
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <Text
      ref={ref}
      className={cn("text-[0.8rem] text-muted-foreground", className)}
      {...props}
    >
      {children}
    </Text>
  )
})
FormDescription.displayName = "FormDescription"

const FormMessage = React.forwardRef<
  Text,
  React.ComponentPropsWithoutRef<typeof Text> & {
    className?: string
    children?: React.ReactNode
  }
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error) : children

  if (!body) {
    return null
  }

  return (
    <Text
      ref={ref}
      className={cn("text-[0.8rem] font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </Text>
  )
})
FormMessage.displayName = "FormMessage"

export {
  Form, FormControl,
  FormDescription, FormField, FormItem,
  FormLabel, FormMessage, useFormField
}

