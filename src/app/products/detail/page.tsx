"use client"

import { useState, useEffect } from "react"
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
import Head from 'next/head'

interface ProductDetails {
  id: string | null
  InternalID: string
  Category: string
  Style: string
  Status: string
}

const productData: ProductDetails[] = [
    { "id": "1", "InternalID": "LKA-WB01", "Category": "Accesories", "Style": "Wrist Band - 4.75\" Length", "Status": "" },
    { "id": "2", "InternalID": "LKA-WB02", "Category": "Accesories", "Style": "Wrist Band - 5.25\" Length", "Status": "" },
    { "id": "3", "InternalID": "LK019-CBEV01", "Category": "Accesories", "Style": "Beverly - Can", "Status": "" },
    { "id": "4", "InternalID": "LK020-BBEV02", "Category": "Accesories", "Style": "Beverly - Bottle", "Status": "" },
    { "id": "5", "InternalID": "LKA-SCF01", "Category": "Accesories", "Style": "Scarf - Fringed", "Status": "" },
    { "id": "6", "InternalID": "LKABS-LGWM-01", "Category": "Accesories", "Style": "Bombshell Leg Warmers - Full Length", "Status": "" },
    { "id": "7", "InternalID": "LKABS-LGWM-02", "Category": "Accesories", "Style": "Bombshell Leg Warmers - 15\" Length", "Status": "" },
    { "id": "8", "InternalID": "LKB-101", "Category": "Beanies", "Style": "The Pom", "Status": "" },
    { "id": "9", "InternalID": "LKB-102", "Category": "Beanies", "Style": "The OG", "Status": "" },
    { "id": "10", "InternalID": "LKB-103", "Category": "Beanies", "Style": "The Waffle", "Status": "" },
    { "id": "11", "InternalID": "LKB-104", "Category": "Beanies", "Style": "The Plush", "Status": "" },
    { "id": "12", "InternalID": "LKB-105", "Category": "Beanies", "Style": "The Micro Waffle", "Status": "" },
    { "id": "13", "InternalID": "LKB-106", "Category": "Beanies", "Style": "The Skull Noggin", "Status": "" },
    { "id": "14", "InternalID": "LKB-107", "Category": "Beanies", "Style": "The Summit", "Status": "" },
    { "id": "15", "InternalID": "LKB-108", "Category": "Beanies", "Style": "The Ridgeline", "Status": "" },
    { "id": "16", "InternalID": "LKB-109", "Category": "Beanies", "Style": "The Lumberjack", "Status": "" },
    { "id": "17", "InternalID": "LKB-110", "Category": "Beanies", "Style": "The Fringe", "Status": "" },
    { "id": "18", "InternalID": "LKB-111", "Category": "Beanies", "Style": "The Trailhead", "Status": "" },
    { "id": "19", "InternalID": "LKB-112", "Category": "Beanies", "Style": "The Moose", "Status": "" },
    { "id": "20", "InternalID": "LKB-113", "Category": "Beanies", "Style": "The Evergreen", "Status": "" },
    { "id": "21", "InternalID": "LKB-114", "Category": "Beanies", "Style": "The Backcountry", "Status": "" },
    { "id": "22", "InternalID": "LKB-115", "Category": "Beanies", "Style": "The Ranger", "Status": "" },
    { "id": "23", "InternalID": "LKB-116", "Category": "Beanies", "Style": "The Cable Guy", "Status": "" },
    { "id": "24", "InternalID": "LKB-117", "Category": "Beanies", "Style": "The Chunk", "Status": "" },
    { "id": "25", "InternalID": "LKB-118", "Category": "Beanies", "Style": "The Fuzz", "Status": "" },
    { "id": "26", "InternalID": "LKB-119", "Category": "Beanies", "Style": "The Conservationist", "Status": "" },
    { "id": "27", "InternalID": "LKB-120", "Category": "Beanies", "Style": "The Chalet", "Status": "" },
    { "id": "28", "InternalID": "LK001", "Category": "Socks", "Style": "The Icon - Classic Crew Sock", "Status": "" },
    { "id": "29", "InternalID": "LK002", "Category": "Socks", "Style": "The Running Man - Polyblend Performance Sock", "Status": "" },
    { "id": "30", "InternalID": "LK003qc", "Category": "Socks", "Style": "Arryved Style - Quarter Cushion Performance", "Status": "" },
    { "id": "31", "InternalID": "LK005hc", "Category": "Socks", "Style": "Red Bull Crew", "Status": "" },
    { "id": "32", "InternalID": "LK005hc-lowcrew", "Category": "Socks", "Style": "The Cyclist - Cotton Blend Performance Crew", "Status": "" },
    { "id": "33", "InternalID": "LK006", "Category": "Socks", "Style": "Ankle/Low Cut - Cotton Blend Sock", "Status": "" },
    { "id": "34", "InternalID": "LK007", "Category": "Socks", "Style": "200 Needle Dress Sock", "Status": "" },
    { "id": "35", "InternalID": "LK009", "Category": "Socks", "Style": "No Show - Cotton Blend Sock", "Status": "" },
    { "id": "36", "InternalID": "LK010dtg", "Category": "Socks", "Style": "360 DTG Printed Crew Sock", "Status": "" },
    { "id": "37", "InternalID": "LK011sub", "Category": "Socks", "Style": "Sublimated Crew Sock", "Status": "" },
    { "id": "38", "InternalID": "LK012y", "Category": "Socks", "Style": "Youth Classic Crew Sock", "Status": "" },
    { "id": "39", "InternalID": "LK013", "Category": "Socks", "Style": "Tie Dye Crew", "Status": "" },
    { "id": "40", "InternalID": "LK014nc", "Category": "Socks", "Style": "Knee High Performance (No Cushion)", "Status": "" },
    { "id": "41", "InternalID": "LK015", "Category": "Socks", "Style": "Wool Dress Sock", "Status": "" },
    { "id": "42", "InternalID": "LK018", "Category": "Socks", "Style": "Marled Crew Sock", "Status": "" },
    { "id": "43", "InternalID": "LK022", "Category": "Socks", "Style": "Wool Crew Sock", "Status": "" },
    { "id": "44", "InternalID": "LK024", "Category": "Socks", "Style": "Waffle Knit Crew Sock", "Status": "" },
    { "id": "45", "InternalID": "LK025", "Category": "Socks", "Style": "Chunky Marled Crew Sock", "Status": "" },
    { "id": "46", "InternalID": "LK026", "Category": "Socks", "Style": "Chunky Ankle Sock", "Status": "" },
    { "id": "47", "InternalID": "LK027", "Category": "Socks", "Style": "Wool Ankle Sock", "Status": "" },
    { "id": "484", "InternalID": "LK028", "Category": "Socks", "Style": "Wool Boot Sock - High Crew", "Status": "" },
    { "id": "49", "InternalID": "LK029", "Category": "Socks", "Style": "Wool Snow Crew", "Status": "" },
    { "id": "50", "InternalID": "LK032", "Category": "Socks", "Style": "Organic Scrunchy Sock", "Status": "" },
    { "id": "51", "InternalID": "LK033", "Category": "Socks", "Style": "The Contender - Technical Performance Crew", "Status": "" },
    { "id": "52", "InternalID": "LK035", "Category": "Socks", "Style": "Ankle/Low Cut Performance Sock - Cotton Blend", "Status": "" },
    { "id": "53", "InternalID": "LK036nc", "Category": "Socks", "Style": "Ankle Performance Sock - No Cushion", "Status": "" },
    { "id": "54", "InternalID": "LK037", "Category": "Socks", "Style": "The Slalom - Merino Wool Blend Ski Sock", "Status": "" },
    { "id": "55", "InternalID": "LK038", "Category": "Socks", "Style": "The Squeeze - Classic Compression Sock", "Status": "" },
    { "id": "56", "InternalID": "LK039", "Category": "Socks", "Style": "The Aurora - Sheer Crew Sock", "Status": "" },
    { "id": "57", "InternalID": "LK041", "Category": "Socks", "Style": "The Goal Getter - Technical Soccer Performance Sock", "Status": "" },
    { "id": "58", "InternalID": "LKBS034hc", "Category": "Socks", "Style": "Bombshell - Half Cushion Quarter Crew", "Status": "" },
    { "id": "59", "InternalID": "LKBS040", "Category": "Socks", "Style": "Bombshell - Slouch Sock", "Status": "" },
    { "id": "60", "InternalID": "LKTW001", "Category": "Socks", "Style": "True Werk Boot Cut Werksock", "Status": "" },
    { "id": "61", "InternalID": "LKTW002", "Category": "Socks", "Style": "True Werk Lightweight Werk Sock", "Status": "" },
    { "id": "62", "InternalID": "LK-P-001", "Category": "Socks", "Style": "Pleasing Style Crew Sock", "Status": "" },
    { "id": "63", "InternalID": "LK-AMIRI-A", "Category": "Socks", "Style": "Amiri Crew Sock - Adult", "Status": "" },
    { "id": "64", "InternalID": "LK-AMIRI-Y", "Category": "Socks", "Style": "Amiri Crew Sock - Youth", "Status": "" },
    { "id": "65", "InternalID": "LK-ALD", "Category": "Socks", "Style": "Aime Leon Dore Crew Sock - Import", "Status": "" },
    { "id": "66", "InternalID": "SOCALD-CR", "Category": "Socks", "Style": "Aime Leon Dore Crew Sock - Domestic", "Status": "" },
    { "id": "67", "InternalID": "SOCALD-NS", "Category": "Socks", "Style": "Aime Leon Dore No Show Sock - Domestic", "Status": "" },
    { "id": "68", "InternalID": "LK021C", "Category": "Socks", "Style": "HRC Classic Logo Sock - Corporate", "Status": "" },
    { "id": "69", "InternalID": "LK021CF", "Category": "Socks", "Style": "HRC Classic Logo Sock - Franchise", "Status": "" },
    { "id": "70", "InternalID": "LK021BF", "Category": "Socks", "Style": "HRC Burnout Logo Sock - Franchise", "Status": "" },
    // ... (additional products)
];

export default function ProductDetailPage() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('id')

  if (!productId) {
    return <div>Error: Product ID is missing.</div>; // Handle missing ID
  }

  const [product, setProduct] = useState<ProductDetails | null>(null)

  useEffect(() => {
    const foundProduct = productData.find(product => product.id === productId);
    if (!foundProduct) {
      setProduct(null); // Set product to null if not found
    } else {
      setProduct(foundProduct);
    }
  }, [productId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (product) {
      console.log("Updated product:", product)
      // Implement logic to update the product in the database or state
    }
  }

  return (
    <>
      <Head>
        <title>Port City Apparel</title>
      </Head>
      <div className="flex min-h-screen flex-col lg:flex-row">
        <AppSidebar />
        <main className="flex-1 p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between">
              <div>
                <Link 
                  href="/products" 
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Products
                </Link>
                <h1 className="text-2xl font-bold mt-2">Product Details</h1>
              </div>
              <Link href="/products/add">
                <Button className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-200">
                  Add Product
                </Button>
              </Link>
            </div>
          </div>

          {product ? (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Product Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Internal ID</label>
                        <Input
                          value={product.InternalID}
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Category</label>
                        <Input
                          value={product.Category}
                          onChange={(e) => setProduct({ ...product, Category: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Style</label>
                        <textarea
                          className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          value={product.Style}
                          onChange={(e) => setProduct({ ...product, Style: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Status</label>
                        <Select
                          value={product.Status}
                          onValueChange={(value) => setProduct({ ...product, Status: value })}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Decoration Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Decoration Option</label>
                        <Input
                          placeholder="Enter decoration option"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Needed Information/Fields per Option</label>
                        <textarea
                          className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Enter needed information"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Packaging Type</label>
                        <Input
                          placeholder="Enter packaging type"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Custom Options</label>
                        <textarea
                          className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Enter custom options"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Product Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-center">
                      <img 
                        src="https://example.com/path/to/your/image.jpg" // Replace with actual example image URL
                        alt="Product"
                        className="rounded-md"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Supplier Info</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Supplier Name</label>
                        <Input
                          placeholder="Enter supplier name"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Contact Info</label>
                        <Input
                          placeholder="Enter contact information"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Supplier Address</label>
                        <textarea
                          className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                          placeholder="Enter supplier address"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline" type="button">
                  Cancel
                </Button>
                <Button type="submit">
                  Save Changes
                </Button>
              </div>
            </form>
          ) : (
            <div>Error: Product not found.</div>
          )}
        </main>
      </div>
    </>
  )
} 