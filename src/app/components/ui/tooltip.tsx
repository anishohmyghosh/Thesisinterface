"use client";

import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

import { cn } from "./utils";

function TooltipProvider({
  delayDuration = 0,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) {
  return (
    <TooltipPrimitive.Provider
      data-slot="tooltip-provider"
      delayDuration={delayDuration}
      {...props}
    />
  );
}

// Enhanced Tooltip with click-to-pin behavior
function Tooltip({
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Root> & { children: React.ReactNode }) {
  const [isPinned, setIsPinned] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);

  // Determine if tooltip should be open
  const open = isPinned || isHovered;

  return (
    <TooltipProvider>
      <TooltipPrimitive.Root 
        data-slot="tooltip" 
        open={open}
        onOpenChange={(newOpen) => {
          // Only update hover state if not pinned
          if (!isPinned) {
            setIsHovered(newOpen);
          }
        }}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === TooltipTrigger) {
            // Clone the trigger and add click handler
            return React.cloneElement(child as React.ReactElement<any>, {
              onClick: (e: React.MouseEvent) => {
                e.stopPropagation();
                setIsPinned(!isPinned);
                // Call original onClick if it exists
                if (child.props.onClick) {
                  child.props.onClick(e);
                }
              },
            });
          }
          return child;
        })}
      </TooltipPrimitive.Root>
    </TooltipProvider>
  );
}

function TooltipTrigger({
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) {
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        data-slot="tooltip-content"
        sideOffset={sideOffset}
        className={cn(
          "bg-primary text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit origin-(--radix-tooltip-content-transform-origin) rounded-md px-3 py-1.5 text-xs text-balance",
          className,
        )}
        {...props}
      >
        {children}
        <TooltipPrimitive.Arrow className="bg-primary fill-primary z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };