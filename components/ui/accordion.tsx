"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface AccordionContextValue {
  value: string | undefined;
  onValueChange: (value: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined);

interface AccordionProps {
  type?: "single" | "multiple";
  collapsible?: boolean;
  children: React.ReactNode;
  className?: string;
  defaultValue?: string;
}

export function Accordion({
  children,
  className,
  defaultValue,
}: AccordionProps) {
  const [value, setValue] = React.useState<string | undefined>(defaultValue);

  const onValueChange = React.useCallback((itemValue: string) => {
    setValue((prev) => (prev === itemValue ? undefined : itemValue));
  }, []);

  return (
    <AccordionContext.Provider value={{ value, onValueChange }}>
      <div className={cn("space-y-2", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export function AccordionItem({ value, children, className }: AccordionItemProps) {
  return (
    <div className={cn("border-b", className)} data-value={value}>
      {children}
    </div>
  );
}

interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const context = React.useContext(AccordionContext);
  const itemEl = React.useRef<HTMLButtonElement>(null);
  const [itemValue, setItemValue] = React.useState<string>("");

  React.useEffect(() => {
    const parent = itemEl.current?.closest("[data-value]");
    if (parent) {
      setItemValue(parent.getAttribute("data-value") || "");
    }
  }, []);

  const isOpen = context?.value === itemValue;

  return (
    <button
      ref={itemEl}
      type="button"
      className={cn(
        "flex w-full items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className
      )}
      onClick={() => context?.onValueChange(itemValue)}
      data-state={isOpen ? "open" : "closed"}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
  );
}

interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

export function AccordionContent({ children, className }: AccordionContentProps) {
  const context = React.useContext(AccordionContext);
  const itemEl = React.useRef<HTMLDivElement>(null);
  const [itemValue, setItemValue] = React.useState<string>("");

  React.useEffect(() => {
    const parent = itemEl.current?.closest("[data-value]");
    if (parent) {
      setItemValue(parent.getAttribute("data-value") || "");
    }
  }, []);

  const isOpen = context?.value === itemValue;

  if (!isOpen) return null;

  return (
    <div
      ref={itemEl}
      className={cn(
        "overflow-hidden text-sm transition-all",
        className
      )}
    >
      {children}
    </div>
  );
}
