"use client"

import React, { useState, useEffect } from "react"
import { GalleryVerticalEnd, Calendar, Users, Factory, Package, DollarSign, FileText, Clipboard, ShoppingCart, CreditCard, DollarSign as PaymentIcon, Menu, X, Grid, Box, Target, User, Settings, LogOut } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sidebar,
  SidebarContent,
  SidebarInset,
  SidebarProvider,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from 'next/link'

export function AppSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isPartnersOpen, setIsPartnersOpen] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  const togglePartners = () => {
    setIsPartnersOpen(!isPartnersOpen);
  }

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  }

  const handleLogOut = () => {
    console.log("User logged out");
    router.push('http://localhost:3000/');
  }

  return (
    <>
      {isClient && (
        <SidebarProvider>
          <div className="flex">
            <button 
              onClick={toggleSidebar} 
              className="flex items-center p-2 md:hidden"
              aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
            >
              {isOpen ? <X className="size-5 text-primary" /> : <Menu className="size-5 text-primary" />}
            </button>
            <Sidebar className={`md:block ${isOpen ? "block" : "hidden"} transition-all duration-300 bg-gray-800 text-white shadow-lg w-64 md:w-72`}>
              <SidebarInset className="p-6">
                <div className="flex flex-col items-center">
                  <img 
                    src="https://via.placeholder.com/150"
                    alt="Logo" 
                    className="h-8 w-8 rounded-full mb-2" 
                  />
                  <span className="font-medium text-lg">Port City Apparel</span>
                </div>
              </SidebarInset>
              <SidebarContent>
                <AnimatePresence>
                  <SidebarMenu>
                    {[
                      { href: "/dashboard", label: "Dashboard", icon: <Grid className="mr-1 size-5" /> },
                      { href: "/calendar", label: "Calendar", icon: <Calendar className="mr-1 size-5" /> },
                      { 
                        label: `Business Partners (${4})`,
                        icon: <User className="mr-1 size-5" />,
                        isToggle: true
                      },
                      { href: "/products", label: "Products", icon: <Box className="mr-1 size-5" /> },
                      { href: "/opportunities", label: "Opportunities", icon: <Target className="mr-1 size-5" /> },
                      { href: "/quotes", label: "Quotes", icon: <FileText className="mr-1 size-5" /> },
                      { href: "/orders", label: "Orders", icon: <ShoppingCart className="mr-1 size-5" /> },
                      { href: "/production-orders", label: "Production Orders", icon: <Clipboard className="mr-1 size-5" /> },
                      { href: "/purchase-orders", label: "Purchase Orders", icon: <ShoppingCart className="mr-1 size-5" /> },
                      { href: "/invoices", label: "Invoices", icon: <FileText className="mr-1 size-5" /> },
                      { href: "/payments", label: "Payments", icon: <DollarSign className="mr-1 size-5" /> },
                    ].map((item) => (
                      <div key={item.label}>
                        <SidebarMenuItem 
                          as={Link}
                          href={item.href || "#"}
                          active={pathname === item.href || (item.href === "/quotes" && pathname.startsWith("/quotes/"))}
                          className={`flex items-center p-2 rounded transition-colors duration-200 ${pathname === item.href ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
                          onClick={item.isToggle ? togglePartners : undefined}
                        >
                          {item.icon}
                          <span className="text-sm">{item.label}</span>
                        </SidebarMenuItem>
                        {item.label === `Business Partners (${4})` && isPartnersOpen && (
                          <div className="ml-4">
                            <SidebarMenuItem 
                              key="/customers" 
                              as={Link}
                              href="/customers"
                              active={pathname === "/customers"} 
                              className={`flex items-center p-2 rounded transition-colors duration-200 ${pathname === "/customers" ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
                            >
                              <Users className="mr-1 size-5" />
                              <span className="text-sm">Customers</span>
                            </SidebarMenuItem>
                            <SidebarMenuItem 
                              key="/suppliers" 
                              as={Link}
                              href="/suppliers"
                              active={pathname === "/suppliers"} 
                              className={`flex items-center p-2 rounded transition-colors duration-200 ${pathname === "/suppliers" ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
                            >
                              <Package className="mr-1 size-5" />
                              <span className="text-sm">Suppliers</span>
                            </SidebarMenuItem>
                            <SidebarMenuItem 
                              key="/factories" 
                              as={Link}
                              href="/factories"
                              active={pathname === "/factories"} 
                              className={`flex items-center p-2 rounded transition-colors duration-200 ${pathname === "/factories" ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
                            >
                              <Factory className="mr-1 size-5" />
                              <span className="text-sm">Factories</span>
                            </SidebarMenuItem>
                            <SidebarMenuItem 
                              key="/contacts" 
                              as={Link}
                              href="/contacts"
                              active={pathname === "/contacts"} 
                              className={`flex items-center p-2 rounded transition-colors duration-200 ${pathname === "/contacts" ? 'bg-gray-600' : 'hover:bg-gray-700'}`}
                            >
                              <Users className="mr-1 size-5" />
                              <span className="text-sm">Contacts</span>
                            </SidebarMenuItem>
                          </div>
                        )}
                      </div>
                    ))}
                  </SidebarMenu>
                </AnimatePresence>
              </SidebarContent>
              <div className="border-t border-gray-600 mt-4" />
              <div className="p-4">
                <button 
                  onClick={toggleSettings} 
                  className="flex items-center p-2 rounded transition-colors duration-200 hover:bg-gray-700"
                  aria-label={isSettingsOpen ? "Close settings" : "Open settings"}
                >
                  <Settings className="mr-1 size-5" />
                  <span className="text-sm">Settings</span>
                </button>
                <button 
                  onClick={handleLogOut} 
                  className="flex items-center p-2 rounded transition-colors duration-200 hover:bg-gray-700 mt-2"
                  aria-label="Log out"
                >
                  <LogOut className="mr-1 size-5" />
                  <span className="text-sm">Log Out</span>
                </button>
              </div>
            </Sidebar>
          </div>
        </SidebarProvider>
      )}
    </>
  )
}

