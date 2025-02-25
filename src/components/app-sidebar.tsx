"use client"

import React from "react"
import { GalleryVerticalEnd } from "lucide-react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarInset>
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <span className="font-medium">Port City Apparel</span>
          <SidebarTrigger className="ml-auto" />
        </SidebarInset>
        <SidebarContent>
          <AnimatePresence>
            <SidebarMenu>
              <SidebarMenuItem href="/dashboard" active={pathname === '/dashboard'}>
                Dashboard
              </SidebarMenuItem>
              <SidebarMenuItem href="/calendar" active={pathname === '/calendar'}>
                Calendar
              </SidebarMenuItem>
              <SidebarMenuItem href="/customers" active={pathname === '/customers'}>
                Customers
              </SidebarMenuItem>
              <SidebarMenuItem href="/factories" active={pathname === '/factories'}>
                Factories
              </SidebarMenuItem>
              <SidebarMenuItem href="/suppliers" active={pathname === '/suppliers'}>
                Suppliers
              </SidebarMenuItem>
              <SidebarMenuItem href="/contacts" active={pathname === '/contacts'}>
                Contacts
              </SidebarMenuItem>
              <SidebarMenuItem href="/opportunities" active={pathname === '/opportunities'}>
                Opportunities
              </SidebarMenuItem>
              <SidebarMenuItem href="/quotes" active={pathname === '/quotes'}>
                Quotes
              </SidebarMenuItem>
              <SidebarMenuItem href="/orders" active={pathname === '/orders'}>
                Orders
              </SidebarMenuItem>
              <SidebarMenuItem href="/production-orders" active={pathname === '/production-orders'}>
                Production Orders
              </SidebarMenuItem>
              <SidebarMenuItem href="/purchase-orders" active={pathname === '/purchase-orders'}>
                Purchase Orders
              </SidebarMenuItem>
              <SidebarMenuItem href="/invoices" active={pathname === '/invoices'}>
                Invoices
              </SidebarMenuItem>
              <SidebarMenuItem href="/payments" active={pathname === '/payments'}>
                Payments
              </SidebarMenuItem>
            </SidebarMenu>
          </AnimatePresence>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}

