"use client"

import React from "react"
import { GalleryVerticalEnd } from "lucide-react"
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
          <SidebarMenu>
            <SidebarMenuItem href="/dashboard" active>
              Dashboard
            </SidebarMenuItem>
            <SidebarMenuItem href="/calendar">
              Calendar
            </SidebarMenuItem>
            <SidebarMenuItem href="/customers">
              Customers
            </SidebarMenuItem>
            <SidebarMenuItem href="/factories">
              Factories
            </SidebarMenuItem>
            <SidebarMenuItem href="/suppliers">
              Suppliers
            </SidebarMenuItem>
            <SidebarMenuItem href="/contacts">
              Contacts
            </SidebarMenuItem>
            <SidebarMenuItem href="/opportunities">
              Opportunities
            </SidebarMenuItem>
            <SidebarMenuItem href="/quotes">
              Quotes
            </SidebarMenuItem>
            <SidebarMenuItem href="/orders">
              Orders
            </SidebarMenuItem>
            <SidebarMenuItem href="/production-orders">
              Production Orders
            </SidebarMenuItem>
            <SidebarMenuItem href="/purchase-orders">
              Purchase Orders
            </SidebarMenuItem>
            <SidebarMenuItem href="/invoices">
              Invoices
            </SidebarMenuItem>
            <SidebarMenuItem href="/payments">
              Payments
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}

