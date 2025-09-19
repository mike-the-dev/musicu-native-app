import { Ionicons } from "@expo/vector-icons"
import * as React from "react"
import { Pressable, Text, View } from "react-native"

import { cn } from "../../lib/utils"

interface AccordionProps {
  children: React.ReactNode
  type?: "single" | "multiple"
  collapsible?: boolean
  className?: string
}

const Accordion = ({ children, type = "single", collapsible = true, className }: AccordionProps) => {
  const [openItems, setOpenItems] = React.useState<string[]>([]);

  const handleToggle = (value: string) => {
    if (type === "single") {
      setOpenItems(openItems.includes(value) ? [] : [value]);
    } else {
      setOpenItems(openItems.includes(value) 
        ? openItems.filter(item => item !== value)
        : [...openItems, value]
      );
    }
  };

  return (
    <View className={cn("", className)}>
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            ...(child.props as object),
            isOpen: openItems.includes((child.props as any).value || index.toString()),
            onToggle: () => handleToggle((child.props as any).value || index.toString())
          });
        }
        return child;
      })}
    </View>
  );
};

interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
  value?: string
  isOpen?: boolean
  onToggle?: () => void
  children?: React.ReactNode
}

const AccordionItem = React.forwardRef<View, AccordionItemProps>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  >
    {React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child as React.ReactElement<any>, { ...(child.props as object), ...props });
      }
      return child;
    })}
  </View>
))
AccordionItem.displayName = "AccordionItem"

interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof Pressable> {
  className?: string
  children?: React.ReactNode
  isOpen?: boolean
  onToggle?: () => void
}

const AccordionTrigger = React.forwardRef<View, AccordionTriggerProps>(({ className, children, isOpen, onToggle, ...props }, ref) => (
  <View className="flex">
    <Pressable
      ref={ref}
      onPress={onToggle}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left",
        className
      )}
      {...props}
    >
      <Text className="text-sm font-medium flex-1 text-left">{children}</Text>
      <Ionicons
        name={isOpen ? "chevron-up" : "chevron-down"}
        size={16}
        color="#64748b"
      />
    </Pressable>
  </View>
))
AccordionTrigger.displayName = "AccordionTrigger"

interface AccordionContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  className?: string
  children?: React.ReactNode
  isOpen?: boolean
}

const AccordionContent = React.forwardRef<View, AccordionContentProps>(({ className, children, isOpen, ...props }, ref) => {
  if (!isOpen) return null;
  
  return (
    <View
      ref={ref}
      className={cn("overflow-hidden text-sm", className)}
      {...props}
    >
      <View className={cn("pb-4 pt-0", className)}>{children}</View>
    </View>
  );
})
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger }

