"use client"

import * as React from "react"
import * as CollapsiblePrimitive from "@radix-ui/react-collapsible"
import { GalleryVerticalEnd } from "lucide-react"

import { cn } from "@/lib/utils"

const SidebarContext = React.createContext<{
  expanded: boolean
  setExpanded: (expanded: boolean) => void
}>({
  expanded: true,
  setExpanded: () => {},
})

const SidebarProvider = ({
  children,
  defaultExpanded = true,
}: {
  children: React.ReactNode
  defaultExpanded?: boolean
}) => {
  const [expanded, setExpanded] = React.useState(defaultExpanded)

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded }}>
      {children}
    </SidebarContext.Provider>
  )
}

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const { expanded } = React.useContext(SidebarContext)

  return (
    <div
      ref={ref}
      className={cn(
        "flex h-full flex-col gap-4 border-r bg-background transition-[width] duration-300",
        expanded ? "w-64" : "w-16",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})
Sidebar.displayName = "Sidebar"

const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { expanded, setExpanded } = React.useContext(SidebarContext)

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground",
        className
      )}
      onClick={() => setExpanded(!expanded)}
      {...props}
    />
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

const SidebarInset = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { expanded } = React.useContext(SidebarContext)

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center gap-4 px-4",
        !expanded && "justify-center px-0",
        className
      )}
      {...props}
    />
  )
})
SidebarInset.displayName = "SidebarInset"

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { expanded } = React.useContext(SidebarContext)

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-1 flex-col gap-2 overflow-hidden px-4",
        !expanded && "px-2",
        className
      )}
      {...props}
    />
  )
})
SidebarContent.displayName = "SidebarContent"

const SidebarMenu = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { expanded } = React.useContext(SidebarContext)

  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-1",
        !expanded && "items-center",
        className
      )}
      {...props}
    />
  )
})
SidebarMenu.displayName = "SidebarMenu"

const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    active?: boolean
  }
>(({ className, active, ...props }, ref) => {
  const { expanded } = React.useContext(SidebarContext)

  return (
    <button
      ref={ref}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
        active && "bg-accent text-accent-foreground",
        !expanded && "justify-center px-2",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

const SidebarMenuItem = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    active?: boolean
  }
>(({ className, active, ...props }, ref) => {
  const { expanded } = React.useContext(SidebarContext)

  return (
    <a
      ref={ref}
      className={cn(
        "flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
        active && "bg-accent text-accent-foreground",
        !expanded && "justify-center px-2",
        className
      )}
      {...props}
    />
  )
})
SidebarMenuItem.displayName = "SidebarMenuItem"

export {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarContext,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} 