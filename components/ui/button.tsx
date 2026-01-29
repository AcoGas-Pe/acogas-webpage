import * as React from "react"
import Link from "next/link"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer text-sm font-semibold uppercase tracking-wider ring-offset-background transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: 
          "bg-primary text-primary-foreground shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1)] hover:bg-[hsl(var(--primary-light))] hover:shadow-[0_10px_15px_-3px_rgb(0_0_0_/_0.1),0_4px_6px_-4px_rgb(0_0_0_/_0.1)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1)]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1)] hover:bg-destructive/90 hover:shadow-[0_10px_15px_-3px_rgb(0_0_0_/_0.1),0_4px_6px_-4px_rgb(0_0_0_/_0.1)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1)]",
        outline:
          "border-2 border-accent bg-background shadow-[0_1px_2px_0_rgb(0_0_0_/_0.05)] hover:bg-accent hover:text-accent-foreground hover:shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_1px_2px_0_rgb(0_0_0_/_0.05)]",
        secondary:
          "bg-secondary text-secondary-foreground shadow-[0_1px_2px_0_rgb(0_0_0_/_0.05)] hover:bg-secondary/80 hover:shadow-[0_4px_6px_-1px_rgb(0_0_0_/_0.1),0_2px_4px_-2px_rgb(0_0_0_/_0.1)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[0_1px_2px_0_rgb(0_0_0_/_0.05)]",
        ghost: 
          "hover:bg-muted hover:text-foreground hover:shadow-[0_1px_2px_0_rgb(0_0_0_/_0.05)]",
        link: 
          "text-primary underline-offset-4 hover:text-[hsl(var(--primary-light))] hover:underline normal-case tracking-normal",
        nav:
          "text-foreground font-medium normal-case tracking-normal hover:text-primary transition-colors bg-transparent",
        navTrigger:
          "text-foreground font-medium normal-case tracking-normal hover:text-primary transition-colors bg-transparent gap-1",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  href?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, href, children, ...props }, ref) => {
    const classes = cn(buttonVariants({ variant, size, className }));
    
    // If href is provided, render as Link
    if (href) {
      return (
        <Link href={href} className={classes}>
          {children}
        </Link>
      );
    }
    
    // Otherwise render as button
    return (
      <button
        className={classes}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }