"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CustomerDetails {
  id: string
  name: string
  email: string
  phone: string
  company: string
  status: "active" | "inactive"
  address: string
  city: string
  country: string
  notes: string
  lastOrder: string
  totalOrders: number
}

export default function CustomerDetailPage() {
  const searchParams = useSearchParams()
  const customerId = searchParams.get('id')

  const [customer, setCustomer] = useState<CustomerDetails>({
    id: customerId || '',
    name: "Customer " + customerId,
    email: `customer${customerId}@example.com`,
    phone: "(555) 123-4567",
    company: "Example Corp",
    status: "active",
    address: "123 Main St",
    city: "New York",
    country: "USA",
    notes: "Important customer",
    lastOrder: "2024-02-20",
    totalOrders: 10
  })

  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(10)

  const [quotes] = useState([
    {
      id: 'Q-2024-001',
      date: '2024-02-15',
      amount: '$1,200.00',
      status: 'Pending'
    },
    {
      id: 'Q-2024-002',
      date: '2024-02-20',
      amount: '$3,500.00',
      status: 'Accepted'
    }
  ])

  const [invoices] = useState([
    {
      id: 'INV-2024-001',
      date: '2024-01-10',
      dueDate: '2024-02-10',
      amount: '$2,500.00',
      status: 'Paid'
    },
    {
      id: 'INV-2024-002',
      date: '2024-02-01',
      dueDate: '2024-03-01',
      amount: '$1,800.00',
      status: 'Overdue'
    }
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Updated customer:", customer)
  }

  const Pagination = ({ total, current, onChange }: { 
    total: number
    current: number
    onChange: (page: number) => void 
  }) => {
    return (
      <div className="flex items-center justify-between px-4 py-4 border-t">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Rows per page:</span>
          <Select
            value={recordsPerPage.toString()}
            onValueChange={(value) => setRecordsPerPage(Number(value))}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            Page {current} of {total}
          </span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onChange(current - 1)}
              disabled={current === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onChange(current + 1)}
              disabled={current === total}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AppSidebar />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <Link 
                href="/customers" 
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Customers
              </Link>
              <h1 className="text-2xl font-bold mt-2">Customer Details</h1>
            </div>
            <Link href="/customers/contact">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Add Contact
              </Button>
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <Input
                      value={customer.name}
                      onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input
                      type="email"
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Phone</label>
                    <Input
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Company</label>
                    <Input
                      value={customer.company}
                      onChange={(e) => setCustomer({ ...customer, company: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Address Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Address</label>
                    <Input
                      value={customer.address}
                      onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">City</label>
                    <Input
                      value={customer.city}
                      onChange={(e) => setCustomer({ ...customer, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Country</label>
                    <Input
                      value={customer.country}
                      onChange={(e) => setCustomer({ ...customer, country: e.target.value })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="quotes" className="w-full">
                  <TabsList>
                    <TabsTrigger value="quotes">Quotes</TabsTrigger>
                    <TabsTrigger value="invoices">Invoices</TabsTrigger>
                  </TabsList>
                  <TabsContent value="quotes">
                    <div className="border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Quote #</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {quotes
                            .slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)
                            .map(quote => (
                              <TableRow key={quote.id}>
                                <TableCell>{quote.id}</TableCell>
                                <TableCell>{quote.date}</TableCell>
                                <TableCell>{quote.amount}</TableCell>
                                <TableCell>
                                  <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-yellow-50 text-yellow-700">
                                    {quote.status}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                      <Pagination
                        total={Math.ceil(quotes.length / recordsPerPage)}
                        current={currentPage}
                        onChange={setCurrentPage}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="invoices">
                    <div className="border rounded-lg">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Invoice #</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {invoices
                            .slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage)
                            .map(invoice => (
                              <TableRow key={invoice.id}>
                                <TableCell>{invoice.id}</TableCell>
                                <TableCell>{invoice.date}</TableCell>
                                <TableCell>{invoice.dueDate}</TableCell>
                                <TableCell>{invoice.amount}</TableCell>
                                <TableCell>
                                  <span className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium bg-green-50 text-green-700">
                                    {invoice.status}
                                  </span>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                      <Pagination
                        total={Math.ceil(invoices.length / recordsPerPage)}
                        current={currentPage}
                        onChange={setCurrentPage}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Notes</label>
                    <textarea
                      className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      value={customer.notes}
                      onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                    <Button type="submit">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </form>
      </main>
    </div>
  )
} 