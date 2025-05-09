"use client"

import * as React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { cva } from "class-variance-authority"
import { ChevronDown, ChevronRight, Menu } from "lucide-react"

import { cn } from "@/lib/utils"

const SidebarContext = createContext<{
  expanded: boolean
  setExpanded: React.Dispatch<React.SetStateAction<boolean>>
  mobileExpanded: boolean
  setMobileExpanded: React.Dispatch<React.SetStateAction<boolean>>
}>({
  expanded: true,
  setExpanded: () => {},
  mobileExpanded: false,
  setMobileExpanded: () => {},
})

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(true)
  const [mobileExpanded, setMobileExpanded] = useState(false)

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded, mobileExpanded, setMobileExpanded }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function Sidebar({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { expanded, mobileExpanded } = useContext(SidebarContext)

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-20 flex h-full flex-col border-r bg-background transition-all duration-300 ease-in-out data-[expanded=true]:w-64 data-[expanded=false]:w-[--sidebar-rail-width] md:data-[expanded=false]:w-[--sidebar-rail-width] md:data-[expanded=true]:w-64 md:data-[mobile-expanded=true]:w-64",
        "data-[mobile-expanded=true]:w-64 data-[mobile-expanded=false]:w-0 md:data-[mobile-expanded=false]:w-[--sidebar-rail-width]",
        className,
      )}
      data-expanded={expanded}
      data-mobile-expanded={mobileExpanded}
      style={{ "--sidebar-rail-width": "4rem" } as React.CSSProperties}
      {...props}
    >
      {children}
    </aside>
  )
}

export function SidebarTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { mobileExpanded, setMobileExpanded } = useContext(SidebarContext)

  return (
    <button
      type="button"
      className={cn("flex h-9 w-9 items-center justify-center rounded-md border md:hidden", className)}
      onClick={() => setMobileExpanded(!mobileExpanded)}
      {...props}
    >
      <Menu className="h-4 w-4" />
      <span className="sr-only">Toggle Menu</span>
    </button>
  )
}

export function SidebarInset({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { expanded, mobileExpanded } = useContext(SidebarContext)

  return (
    <div
      className={cn(
        "flex min-h-screen flex-col transition-all duration-300 ease-in-out",
        "ml-0 md:ml-[--sidebar-rail-width] md:data-[expanded=true]:ml-64",
        "data-[mobile-expanded=true]:ml-64",
        className,
      )}
      data-expanded={expanded}
      data-mobile-expanded={mobileExpanded}
      style={{ "--sidebar-rail-width": "4rem" } as React.CSSProperties}
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarRail({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { expanded, setExpanded } = useContext(SidebarContext)

  return (
    <div
      className={cn(
        "absolute inset-y-0 right-0 flex w-[1px] cursor-col-resize bg-border transition-all duration-300 ease-in-out data-[expanded=true]:-mr-[1px] data-[expanded=true]:w-[2px] data-[expanded=true]:bg-primary/50 data-[expanded=true]:hover:bg-primary md:data-[expanded=true]:-mr-[1px] md:data-[expanded=true]:w-[2px]",
        className,
      )}
      data-expanded={expanded}
      onDoubleClick={() => setExpanded(!expanded)}
      {...props}
    />
  )
}

export function SidebarHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex h-14 items-center border-b px-4", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex-1 overflow-auto", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex items-center border-t p-4", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarGroup({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-2 py-2", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarMenu({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-1", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarMenuItem({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col", className)} {...props}>
      {children}
    </div>
  )
}

const sidebarMenuButtonVariants = cva(
  "group flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "justify-start",
        icon: "justify-center",
      },
      size: {
        default: "h-9",
        sm: "h-8",
        lg: "h-10",
      },
      isActive: {
        true: "bg-accent text-accent-foreground",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      isActive: false,
    },
  },
)

export interface SidebarMenuButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
  isActive?: boolean
  variant?: "default" | "icon"
  size?: "default" | "sm" | "lg"
}

export const SidebarMenuButton = React.forwardRef<HTMLButtonElement, SidebarMenuButtonProps>(
  ({ className, children, asChild, isActive, variant, size, ...props }, ref) => {
    const { expanded } = useContext(SidebarContext)
    const Comp = asChild ? "a" : "button"

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : "button"}
        className={cn(
          sidebarMenuButtonVariants({ variant, size, isActive }),
          "data-[expanded=false]:justify-center md:data-[expanded=false]:justify-center",
          className,
        )}
        data-expanded={expanded}
        {...props}
      >
        {children}
      </Comp>
    )
  },
)
SidebarMenuButton.displayName = "SidebarMenuButton"

export function SidebarMenuSub({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("pl-4 pt-1", className)} {...props}>
      {children}
    </div>
  )
}

export function SidebarMenuSubItem({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex", className)} {...props}>
      {children}
    </div>
  )
}

const sidebarMenuSubButtonVariants = cva(
  "group flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
  {
    variants: {
      isActive: {
        true: "bg-accent text-accent-foreground",
        false: "",
      },
    },
    defaultVariants: {
      isActive: false,
    },
  },
)

export interface SidebarMenuSubButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asChild?: boolean
  isActive?: boolean
}

export const SidebarMenuSubButton = React.forwardRef<HTMLButtonElement, SidebarMenuSubButtonProps>(
  ({ className, children, asChild, isActive, ...props }, ref) => {
    const Comp = asChild ? "a" : "button"

    return (
      <Comp
        ref={ref}
        type={asChild ? undefined : "button"}
        className={cn(sidebarMenuSubButtonVariants({ isActive }), className)}
        {...props}
      >
        {children}
      </Comp>
    )
  },
)
SidebarMenuSubButton.displayName = "SidebarMenuSubButton"

export function SidebarMenuCollapsible({
  defaultOpen,
  open,
  onOpenChange,
  className,
  title,
  icon,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title: string
  icon?: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen || false)
  const { expanded } = useContext(SidebarContext)

  useEffect(() => {
    if (open !== undefined) {
      setIsOpen(open)
    }
  }, [open])

  const handleToggle = () => {
    const newOpenState = !isOpen
    setIsOpen(newOpenState)
    onOpenChange?.(newOpenState)
  }

  return (
    <div className={cn("flex flex-col", className)} {...props}>
      <button
        type="button"
        className={cn(
          "group flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
          isOpen && "bg-accent text-accent-foreground",
        )}
        onClick={handleToggle}
        data-expanded={expanded}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span className="data-[expanded=false]:hidden md:data-[expanded=false]:hidden">{title}</span>
        </div>
        <div className="data-[expanded=false]:hidden md:data-[expanded=false]:hidden">
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </div>
      </button>
      {isOpen && <div className="pl-4 pt-1">{children}</div>}
    </div>
  )
}
