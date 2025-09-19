import { cn } from "@/lib/utils"
import * as React from "react"
import { ScrollView, Text, TouchableOpacity, View } from "react-native"

// For React Native, we'll create a simplified tabs component
// since @radix-ui/react-tabs doesn't work in React Native

interface TabsContextValue {
  value?: string
  onValueChange?: (value: string) => void
}

const TabsContext = React.createContext<TabsContextValue>({})

interface TabsProps {
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  children: React.ReactNode
  className?: string
}

const Tabs = ({ value, onValueChange, defaultValue, children, className }: TabsProps) => {
  const [selectedValue, setSelectedValue] = React.useState(defaultValue || value)

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue)
    onValueChange?.(newValue)
  }

  return (
    <TabsContext.Provider value={{
      value: selectedValue,
      onValueChange: handleValueChange
    }}>
      <View className={cn(className)}>
        {children}
      </View>
    </TabsContext.Provider>
  )
}

const TabsList = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    children: React.ReactNode
  }
>(({ className, children, ...props }, ref) => (
  <View
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1",
      className
    )}
    {...props}
  >
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ alignItems: 'center', justifyContent: 'center' }}
    >
      {children}
    </ScrollView>
  </View>
))
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TouchableOpacity>,
  React.ComponentPropsWithoutRef<typeof TouchableOpacity> & {
    className?: string
    value: string
    children: React.ReactNode
  }
>(({ className, value, children, ...props }, ref) => {
  const { value: selectedValue, onValueChange } = React.useContext(TabsContext)
  const isActive = selectedValue === value

  return (
    <TouchableOpacity
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        "disabled:opacity-50",
        isActive && "bg-background text-foreground shadow",
        className
      )}
      onPress={() => onValueChange?.(value)}
      {...props}
    >
      <Text className={cn(
        "text-sm font-medium",
        isActive ? "text-foreground" : "text-muted-foreground"
      )}>
        {children}
      </Text>
    </TouchableOpacity>
  )
})
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef<
  View,
  React.ComponentPropsWithoutRef<typeof View> & {
    className?: string
    value: string
    children: React.ReactNode
  }
>(({ className, value, children, ...props }, ref) => {
  const { value: selectedValue } = React.useContext(TabsContext)
  
  if (selectedValue !== value) {
    return null
  }

  return (
    <View
      ref={ref}
      className={cn(
        "mt-2",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
    </View>
  )
})
TabsContent.displayName = "TabsContent"

export { Tabs, TabsContent, TabsList, TabsTrigger }

