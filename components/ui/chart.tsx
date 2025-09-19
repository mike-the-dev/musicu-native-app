import * as React from "react"
import { Text, View } from "react-native"

import { cn } from "../../lib/utils"

// Simple chart container for React Native
const ChartContext = React.createContext<{ config?: any } | null>(null)

function useChart() {
  const context = React.useContext(ChartContext)

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />")
  }

  return context
}

interface ChartContainerProps extends React.ComponentPropsWithoutRef<typeof View> {
  id?: string
  className?: string
  children?: React.ReactNode
  config?: any
}

const ChartContainer = React.forwardRef<View, ChartContainerProps>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <View
        ref={ref}
        className={cn(
          "flex aspect-video justify-center text-xs",
          className
        )}
        {...props}
      >
        {children}
      </View>
    </ChartContext.Provider>
  );
})
ChartContainer.displayName = "Chart"

interface ChartTooltipProps {
  active?: boolean
  payload?: any[]
  className?: string
  children?: React.ReactNode
}

const ChartTooltip = ({ active, payload, className, children }: ChartTooltipProps) => {
  if (!active || !payload?.length) {
    return null
  }

  return (
    <View className={cn("grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl", className)}>
      {children}
    </View>
  );
};

interface ChartTooltipContentProps {
  active?: boolean
  payload?: any[]
  className?: string
  indicator?: "dot" | "line" | "dashed"
  hideLabel?: boolean
  hideIndicator?: boolean
  label?: string
  labelFormatter?: (value: any, payload: any[]) => React.ReactNode
  labelClassName?: string
  formatter?: (value: any, name: string, item: any, index: number, payload: any) => React.ReactNode
  color?: string
  nameKey?: string
  labelKey?: string
}

const ChartTooltipContent = React.forwardRef<View, ChartTooltipContentProps>(({
  active,
  payload,
  className,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}, ref) => {
  const { config } = useChart()

  if (!active || !payload?.length) {
    return null
  }

  const tooltipLabel = React.useMemo(() => {
    if (hideLabel || !payload?.length) {
      return null
    }

    const [item] = payload
    const key = `${labelKey || item.dataKey || item.name || "value"}`
    
    if (labelFormatter) {
      return (
        <Text className={cn("font-medium", labelClassName)}>
          {labelFormatter(label, payload)}
        </Text>
      );
    }

    return <Text className={cn("font-medium", labelClassName)}>{label}</Text>;
  }, [label, labelFormatter, payload, hideLabel, labelClassName, labelKey])

  const nestLabel = payload.length === 1 && indicator !== "dot"

  return (
    <View
      ref={ref}
      className={cn(
        "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <View className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = `${nameKey || item.name || item.dataKey || "value"}`
          const indicatorColor = color || item.payload?.fill || item.color

          return (
            <View
              key={item.dataKey}
              className={cn(
                "flex w-full flex-wrap items-stretch gap-2",
                indicator === "dot" && "items-center"
              )}
            >
              {formatter && item?.value !== undefined && item.name ? (
                formatter(item.value, item.name, item, index, item.payload)
              ) : (
                <>
                  {!hideIndicator && (
                    <View
                      className={cn("shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]", {
                        "h-2.5 w-2.5": indicator === "dot",
                        "w-1": indicator === "line",
                        "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                        "my-0.5": nestLabel && indicator === "dashed",
                      })}
                      style={{
                        backgroundColor: indicatorColor,
                        borderColor: indicatorColor
                      }}
                    />
                  )}
                  <View
                    className={cn(
                      "flex flex-1 justify-between leading-none",
                      nestLabel ? "items-end" : "items-center"
                    )}
                  >
                    <View className="grid gap-1.5">
                      {nestLabel ? tooltipLabel : null}
                      <Text className="text-muted-foreground">
                        {item.name}
                      </Text>
                    </View>
                    {item.value && (
                      <Text className="font-mono font-medium tabular-nums text-foreground">
                        {item.value.toLocaleString()}
                      </Text>
                    )}
                  </View>
                </>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
})
ChartTooltipContent.displayName = "ChartTooltipContent"

interface ChartLegendProps {
  className?: string
  hideIcon?: boolean
  payload?: any[]
  verticalAlign?: "top" | "bottom"
  nameKey?: string
}

const ChartLegend = ({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }: ChartLegendProps) => {
  const { config } = useChart()

  if (!payload?.length) {
    return null
  }

  return (
    <View
      className={cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      )}
    >
      {payload.map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`

        return (
          <View
            key={item.value}
            className="flex items-center gap-1.5"
          >
            {!hideIcon && (
              <View
                className="h-2 w-2 shrink-0 rounded-[2px]"
                style={{
                  backgroundColor: item.color,
                }}
              />
            )}
            <Text className="text-sm">{item.name}</Text>
          </View>
        );
      })}
    </View>
  );
};

export {
  ChartContainer, ChartLegend, ChartTooltip,
  ChartTooltipContent
}

