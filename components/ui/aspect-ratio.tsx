import * as React from "react"
import { View } from "react-native"

interface AspectRatioProps extends React.ComponentPropsWithoutRef<typeof View> {
  ratio?: number
  children?: React.ReactNode
}

const AspectRatio = React.forwardRef<View, AspectRatioProps>(({ ratio = 16 / 9, children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={{ aspectRatio: ratio }}
      {...props}
    >
      {children}
    </View>
  );
})
AspectRatio.displayName = "AspectRatio"

export { AspectRatio }
