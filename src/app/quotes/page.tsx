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
import { ChevronLeft, ChevronRight, DollarSign, Users, ShoppingCart, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Quote {
  id: string
  customer: string
  dueDate: string
  total: string
  owner: string
  status: string
}

const quotes: Quote[] = [
  { id: "22577", customer: "Elishaday Kassa - Chick-fil-A Su...", dueDate: "Mar 6, 2025", total: "$0.00", owner: "Corey Creswell", status: "QUOTE" },
  { id: "22576", customer: "Quincy Adkins - BATTLE L.P. GAS CO", dueDate: "Mar 28, 2025", total: "$481.96", owner: "Corey Creswell", status: "QUOTE APPROVED" },
  { id: "22575", customer: "Lisa Milecki - Terracon - Southern...", dueDate: "Mar 6, 2025", total: "$1,985.76", owner: "Mary-Peyton Licerio", status: "QUOTE" },
  { id: "22574", customer: "Lisa Milecki - Terracon - Southern...", dueDate: "Mar 6, 2025", total: "$1,797.12", owner: "Mary-Peyton Licerio", status: "QUOTE" },
  { id: "22571", customer: "Joseph Fyffe - GE Aerospace", dueDate: "Mar 6, 2025", total: "$1,005.27", owner: "Corey Creswell", status: "QUOTE APPROVED" },
  { id: "22568", customer: "Kelsey Smith - Lively Grove Farms", dueDate: "Apr 3, 2025", total: "$1,014.48", owner: "Mary-Peyton Licerio", status: "QUOTE" },
  { id: "22567", customer: "Amy Jackson - Creature Theory", dueDate: "Apr 3, 2025", total: "$619.20", owner: "Mary-Peyton Licerio", status: "QUOTE APPROVED" },
  { id: "22565", customer: "Judy Tolsdorf - Champion Chevrolet", dueDate: "Mar 27, 2025", total: "$622.35", owner: "Corey Creswell", status: "QUOTE APPROVED" },
]

const kpiData = {
  totalQuotes: {
    value: quotes.length,
    trend: 12.5,
    timeframe: 'from last month'
  },
  totalRevenue: {
    value: quotes.reduce((acc, curr) => acc + parseFloat(curr.total.replace(/[^0-9.]/g, '')), 0),
    trend: 8.2,
    timeframe: 'vs last month'
  },
  averageQuoteValue: {
    value: quotes.length > 0 ? Math.round(quotes.reduce((acc, curr) => acc + parseFloat(curr.total.replace(/[^0-9.]/g, '')), 0) / quotes.length) : 0,
    trend: -5.4,
    timeframe: 'vs last month'
  },
  approvedQuotes: {
    value: quotes.filter(quote => quote.status === 'QUOTE APPROVED').length,
    trend: 15.3,
    timeframe: 'vs last month'
  }
}

export default function QuotesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(10)

  const filteredQuotes = quotes.filter(quote => 
    quote.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    quote.owner.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredQuotes.length / recordsPerPage)
  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = filteredQuotes.slice(indexOfFirstRecord, indexOfLastRecord)

  const handleRecordsPerPageChange = (value: string) => {
    setRecordsPerPage(Number(value))
    setCurrentPage(1)
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AppSidebar />
      <main className="flex-1 p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
          {Object.entries(kpiData).map(([key, data]) => (
            <Card key={key} className="hover:shadow-lg transition-shadow duration-200 bg-white rounded-lg border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-2">
                    {key === 'totalQuotes' && <ShoppingCart className="h-5 w-5 text-muted-foreground" />}
                    {key === 'totalRevenue' && <DollarSign className="h-5 w-5 text-muted-foreground" />}
                    {key === 'averageQuoteValue' && <TrendingUp className="h-5 w-5 text-muted-foreground" />}
                    {key === 'approvedQuotes' && <Users className="h-5 w-5 text-muted-foreground" />}
                    <span className="text-sm font-medium">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </div>
                  <span className={`flex items-center text-sm ${data.trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {data.trend}%
                    {data.trend > 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  </span>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold">{data.value}</p>
                  <p className="text-xs text-muted-foreground">{data.timeframe}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4">Quotes</h1>
          <Input
            placeholder="Search quotes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm mb-4"
          />
        </div>
        <div className="rounded-lg border bg-card">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="bg-gray-200 text-xs">ID</TableHead>
                <TableHead className="bg-gray-200 text-xs">Customer</TableHead>
                <TableHead className="bg-gray-200 text-xs">Due Date</TableHead>
                <TableHead className="bg-gray-200 text-xs">Total</TableHead>
                <TableHead className="bg-gray-200 text-xs">Owner</TableHead>
                <TableHead className="bg-gray-200 text-xs">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRecords.map((quote, index) => (
                <TableRow 
                  key={quote.id}
                  className={`cursor-pointer transition-colors duration-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
                  onClick={() => window.location.href = `/quotes/detail?id=${quote.id}`}
                >
                  <TableCell className="text-sm font-medium">{quote.id}</TableCell>
                  <TableCell className="text-sm">{quote.customer}</TableCell>
                  <TableCell className="text-sm">{quote.dueDate}</TableCell>
                  <TableCell className="text-sm">{quote.total}</TableCell>
                  <TableCell className="text-sm">{quote.owner}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      quote.status === 'QUOTE APPROVED' 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-red-50 text-red-700'
                    }`}>
                      {quote.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between px-4 py-4 border-t">
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredQuotes.length)} of {filteredQuotes.length} records
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

