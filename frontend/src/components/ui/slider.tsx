import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
  const _values = React.useMemo(
    () =>
      Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
          ? defaultValue
          : [min, max],
    [value, defaultValue, min, max],
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center transition-all select-none group-active:transition data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "relative grow overflow-hidden rounded-full bg-neutral-100 transition-all group-active:transition data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5 dark:bg-neutral-800",
        )}
      >
        <SliderPrimitive.Range
          data-slot="slider-range"
          className={cn(
            "absolute rounded bg-neutral-900 transition-all group-hover:rounded-none group-hover:transition data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full dark:bg-neutral-50 dark:group-hover:bg-emerald-400",
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot="slider-thumb"
          key={index}
          className="dark:group-hover:ring-opacity-10 dark:hover:ring-opacity -left-2 block size-3 shrink-0 scale-0 rounded-full border border-neutral-900 bg-white shadow-sm ring-neutral-950/50 transition-all group-hover:scale-100 group-active:transition hover:cursor-pointer hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 dark:border-transparent dark:bg-white dark:group-hover:ring-transparent dark:hover:ring-transparent"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
