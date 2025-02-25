"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, DollarSign, Users, ShoppingCart, TrendingUp, ArrowUpRight, ArrowDownRight, Calendar } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  company: string
  status: "active" | "inactive"
  lastOrder: string
  totalOrders: number
}

function generateDummyCustomers(count: number): Customer[] {
  const companies = ["Tech Solutions", "Innovate Co", "Global Tech", "MegaCorp", "Startup Inc", "Digital Systems", "Future Labs", "Smart Solutions", "Peak Industries", "Nova Corp"]
  const domains = ["company.com", "tech.co", "corp.net", "enterprise.com", "solutions.io"]
  const statuses: ("active" | "inactive")[] = ["active", "inactive"]
  
  return Array.from({ length: count }, (_, i) => ({
    id: (i + 1).toString(),
    name: `Customer ${i + 1}`,
    email: `customer${i + 1}@${domains[Math.floor(Math.random() * domains.length)]}`,
    phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    company: companies[Math.floor(Math.random() * companies.length)],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    lastOrder: new Date(2024, Math.floor(Math.random() * 2), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
    totalOrders: Math.floor(Math.random() * 50) + 1
  }))
}

const customers: Customer[] = generateDummyCustomers(50)

const kpiData = {
  totalCustomers: {
    value: customers.length,
    trend: 12.5,
    timeframe: 'from last month'
  },
  revenue: {
    value: customers.reduce((acc, curr) => acc + (curr.totalOrders * 1000), 0),
    trend: 8.2,
    timeframe: 'vs last month'
  },
  averageOrders: {
    value: Math.round(customers.reduce((acc, curr) => acc + curr.totalOrders, 0) / customers.length),
    trend: -5.4,
    timeframe: 'vs last month'
  },
  orderValue: {
    value: 1250,
    trend: 15.3,
    timeframe: 'vs last month'
  }
}

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(10)

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.company.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredCustomers.length / recordsPerPage)
  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = filteredCustomers.slice(indexOfFirstRecord, indexOfLastRecord)

  const handleRecordsPerPageChange = (value: string) => {
    setRecordsPerPage(Number(value))
    setCurrentPage(1)
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AppSidebar />
      <main className="flex-1 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Total Customers</span>
                </div>
                <span className={`flex items-center text-sm ${kpiData.totalCustomers.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {kpiData.totalCustomers.trend}%
                  {kpiData.totalCustomers.trend > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold">{kpiData.totalCustomers.value}</p>
                <p className="text-xs text-muted-foreground">{kpiData.totalCustomers.timeframe}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Total Revenue</span>
                </div>
                <span className={`flex items-center text-sm ${kpiData.revenue.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {kpiData.revenue.trend}%
                  {kpiData.revenue.trend > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold">${kpiData.revenue.value.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{kpiData.revenue.timeframe}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-2">
                  <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Average Orders</span>
                </div>
                <span className={`flex items-center text-sm ${kpiData.averageOrders.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {kpiData.averageOrders.trend}%
                  {kpiData.averageOrders.trend > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold">{kpiData.averageOrders.value}</p>
                <p className="text-xs text-muted-foreground">{kpiData.averageOrders.timeframe}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm font-medium">Average Order Value</span>
                </div>
                <span className={`flex items-center text-sm ${kpiData.orderValue.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {kpiData.orderValue.trend}%
                  {kpiData.orderValue.trend > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                </span>
              </div>
              <div className="mt-3">
                <p className="text-2xl font-bold">${kpiData.orderValue.value.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{kpiData.orderValue.timeframe}</p>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Customers</h1>
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead className="text-right">Total Orders</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRecords.map((customer) => (
                <TableRow 
                  key={customer.id}
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => window.location.href = `/customers/detail?id=${customer.id}`}
                >
                  <TableCell className="font-medium">
                    {customer.name}
                  </TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.company}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      customer.status === 'active' 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-red-50 text-red-700'
                    }`}>
                      {customer.status}
                    </span>
                  </TableCell>
                  <TableCell>{customer.lastOrder}</TableCell>
                  <TableCell className="text-right">{customer.totalOrders}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between px-4 py-4 border-t">
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredCustomers.length)} of {filteredCustomers.length} records
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Show</span>
                <Select
                  value={recordsPerPage.toString()}
                  onValueChange={handleRecordsPerPageChange}
                >
                  <SelectTrigger className="w-[100px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">per page</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Select
                  value={currentPage.toString()}
                  onValueChange={(value) => setCurrentPage(Number(value))}
                >
                  <SelectTrigger className="w-[70px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: totalPages }, (_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()}>
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

