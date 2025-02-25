"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Link from "next/link"

interface ContactForm {
  company: string
  name: string
  email: string
  phone: string
  fax: string
  billingContact: boolean
  address: string
  city: string
  state: string
  zip: string
  country: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    company: "AgCarolina Farm Credit",
    name: "",
    email: "",
    phone: "",
    fax: "",
    billingContact: false,
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "United States"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    window.location.href = '/customers'
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AppSidebar />
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link 
              href="/customers" 
              className="text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </Link>
            <h1 className="text-2xl font-semibold">Edit Customer</h1>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">user3</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-semibold mb-4">General</h2>
                  <div className="grid gap-4">
                    <div>
                      <label className="text-sm font-medium">Company</label>
                      <Input
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <Input
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Phone</label>
                      <Input
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Fax</label>
                      <Input
                        value={formData.fax}
                        onChange={(e) => setFormData({ ...formData, fax: e.target.value })}
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="billing-contact"
                        checked={formData.billingContact}
                        onChange={(e) => setFormData({ ...formData, billingContact: e.target.checked })}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <label htmlFor="billing-contact" className="text-sm">
                        Billing contact
                      </label>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Defines the billing contact to use for payment requests & shortcodes.
                      There can only be one for a customer.
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-lg font-semibold mb-4">Billing</h2>
                  <div className="grid gap-4">
                    <div>
                      <label className="text-sm font-medium">Address</label>
                      <Input
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">City</label>
                      <Input
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">State</label>
                      <Input
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">ZIP</label>
                      <Input
                        value={formData.zip}
                        onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Country</label>
                      <Input
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white">
                    Update Customer
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </main>
    </div>
  )
} 