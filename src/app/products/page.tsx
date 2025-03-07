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
import { ChevronLeft, ChevronRight, DollarSign, ShoppingCart, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Product {
  id: string
  name: string
  price: number
  category: string
  stock: number
  status: "available" | "out of stock"
  image: string
}

// Updated product data based on the provided JSON
const products: Product[] = [
  { id: "1", name: "Wrist Band - 4.75\" Length", price: 0, category: "Accesories", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "2", name: "Wrist Band - 5.25\" Length", price: 0, category: "Accesories", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "3", name: "Beverly - Can", price: 0, category: "Accesories", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "4", name: "Beverly - Bottle", price: 0, category: "Accesories", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "5", name: "Scarf - Fringed", price: 0, category: "Accesories", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "6", name: "Bombshell Leg Warmers - Full Length", price: 0, category: "Accesories", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "7", name: "Bombshell Leg Warmers - 15\" Length", price: 0, category: "Accesories", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "8", name: "The Pom", price: 0, category: "Beanies", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "9", name: "The OG", price: 0, category: "Beanies", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "10", name: "The Waffle", price: 0, category: "Beanies", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "11", name: "The Plush", price: 0, category: "Beanies", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "12", name: "The Micro Waffle", price: 0, category: "Beanies", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "13", name: "The Skull Noggin", price: 0, category: "Beanies", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "14", name: "The Summit", price: 0, category: "Beanies", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "15", name: "The Ridgeline", price: 0, category: "Beanies", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "16", name: "The Lumberjack", price: 0, category: "Beanies", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "17", name: "The Fringe", price: 0, category: "Beanies", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "18", name: "The Trailhead", price: 0, category: "Beanies", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "19", name: "The Moose", price: 0, category: "Beanies", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "20", name: "The Evergreen", price: 0, category: "Beanies", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "21", name: "The Backcountry", price: 0, category: "Beanies", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "22", name: "The Ranger", price: 0, category: "Beanies", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "23", name: "The Cable Guy", price: 0, category: "Beanies", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "24", name: "The Chunk", price: 0, category: "Beanies", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "25", name: "The Fuzz", price: 0, category: "Beanies", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "26", name: "The Conservationist", price: 0, category: "Beanies", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "27", name: "The Chalet", price: 0, category: "Beanies", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "28", name: "The Icon - Classic Crew Sock", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "29", name: "The Running Man - Polyblend Performance Sock", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "30", name: "Arryved Style - Quarter Cushion Performance", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "31", name: "Red Bull Crew", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "32", name: "The Cyclist - Cotton Blend Performance Crew", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "33", name: "Ankle/Low Cut - Cotton Blend Sock", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "34", name: "200 Needle Dress Sock", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "35", name: "No Show - Cotton Blend Sock", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "36", name: "360 DTG Printed Crew Sock", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "37", name: "Sublimated Crew Sock", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "38", name: "Youth Classic Crew Sock", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "39", name: "Tie Dye Crew", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "40", name: "Knee High Performance (No Cushion)", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "41", name: "Wool Dress Sock", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "42", name: "Marled Crew Sock", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "43", name: "Wool Crew Sock", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "44", name: "Waffle Knit Crew Sock", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "45", name: "Chunky Marled Crew Sock", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "46", name: "Chunky Ankle Sock", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "47", name: "Wool Ankle Sock", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "48", name: "Wool Boot Sock - High Crew", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "49", name: "Wool Snow Crew", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "50", name: "Organic Scrunchy Sock", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "51", name: "The Contender - Technical Performance Crew", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "52", name: "Ankle/Low Cut Performance Sock - Cotton Blend", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "53", name: "Ankle Performance Sock - No Cushion", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "54", name: "The Slalom - Merino Wool Blend Ski Sock", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "55", name: "The Squeeze - Classic Compression Sock", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "56", name: "The Aurora - Sheer Crew Sock", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "57", name: "The Goal Getter - Technical Soccer Performance Sock", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "58", name: "Bombshell - Half Cushion Quarter Crew", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "59", name: "Bombshell - Slouch Sock", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "60", name: "True Werk Boot Cut Werksock", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "61", name: "True Werk Lightweight Werk Sock", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "62", name: "Pleasing Style Crew Sock", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "63", name: "Amiri Crew Sock - Adult", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "64", name: "Amiri Crew Sock - Youth", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "65", name: "Aime Leon Dore Crew Sock - Import", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "66", name: "Aime Leon Dore Crew Sock - Domestic", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "67", name: "Aime Leon Dore No Show Sock - Domestic", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "68", name: "HRC Classic Logo Sock - Corporate", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "69", name: "HRC Classic Logo Sock - Franchise", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  { id: "70", name: "HRC Burnout Logo Sock - Franchise", price: 0, category: "Socks", stock: 0, status: "available", image: "https://via.placeholder.com/150" },
  // Add more products as needed based on the JSON data
];

const kpiData = {
  totalProducts: {
    value: products.length,
    trend: 10.5,
    timeframe: 'from last month'
  },
  totalRevenue: {
    value: products.reduce((acc, curr) => acc + (curr.price * curr.stock), 0),
    trend: 5.2,
    timeframe: 'vs last month'
  },
  averagePrice: {
    value: Math.round(products.reduce((acc, curr) => acc + curr.price, 0) / products.length),
    trend: -2.3,
    timeframe: 'vs last month'
  },
  availableStock: {
    value: products.filter(product => product.status === 'available').reduce((acc, curr) => acc + curr.stock, 0),
    trend: 8.0,
    timeframe: 'vs last month'
  }
}

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(10)

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredProducts.length / recordsPerPage)
  const indexOfLastRecord = currentPage * recordsPerPage
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage
  const currentRecords = filteredProducts.slice(indexOfFirstRecord, indexOfLastRecord)

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
                    {key === 'totalProducts' && <ShoppingCart className="h-5 w-5 text-muted-foreground" />}
                    {key === 'totalRevenue' && <DollarSign className="h-5 w-5 text-muted-foreground" />}
                    {key === 'averagePrice' && <DollarSign className="h-5 w-5 text-muted-foreground" />}
                    {key === 'availableStock' && <TrendingUp className="h-5 w-5 text-muted-foreground" />}
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
          <h1 className="text-2xl font-bold mb-4">Products</h1>
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm mb-4"
          />
        </div>
        <div className="rounded-lg border bg-card">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead className="bg-gray-200 text-xs">Image</TableHead>
                <TableHead className="bg-gray-200 text-xs">Name</TableHead>
                <TableHead className="bg-gray-200 text-xs">Price</TableHead>
                <TableHead className="bg-gray-200 text-xs">Category</TableHead>
                <TableHead className="bg-gray-200 text-xs">Stock</TableHead>
                <TableHead className="bg-gray-200 text-xs">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentRecords.map((product, index) => (
                <TableRow 
                  key={product.id}
                  className={`cursor-pointer transition-colors duration-200 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100`}
                  onClick={() => window.location.href = `/products/detail?id=${product.id}`}
                >
                  <TableCell className="text-sm">
                    <img src={product.image || "https://via.placeholder.com/150"} alt={product.name} className="w-16 h-16 object-cover" />
                  </TableCell>
                  <TableCell className="text-sm font-medium">{product.name}</TableCell>
                  <TableCell className="text-sm">${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-sm">{product.category}</TableCell>
                  <TableCell className="text-sm">{product.stock}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      product.status === 'available' 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-red-50 text-red-700'
                    }`}>
                      {product.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between px-4 py-4 border-t">
            <div className="flex items-center gap-4">
              <div className="text-sm text-muted-foreground">
                Showing {indexOfFirstRecord + 1} to {Math.min(indexOfLastRecord, filteredProducts.length)} of {filteredProducts.length} records
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

