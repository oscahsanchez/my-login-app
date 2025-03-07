"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { AppSidebar } from "@/components/app-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Quote {
  id: string
  customer: string
  dueDate: string
  total: string
  owner: string
  status: string
  customerNotes?: string;
  createdDate?: string;
  productionDate?: string;
  customerDate?: string;
  invoiceDate?: string;
  terms?: string;
  paymentDate?: string;
}

const quotes: Quote[] = [
  { id: "22577", customer: "Elishaday Kassa - Chick-fil-A Su...", dueDate: "Mar 6, 2025", total: "$0.00", owner: "Corey Creswell", status: "QUOTE", createdDate: "Feb 1, 2025", productionDate: "Feb 15, 2025" },
  { id: "22576", customer: "Quincy Adkins - BATTLE L.P. GAS CO", dueDate: "Mar 28, 2025", total: "$481.96", owner: "Corey Creswell", status: "QUOTE APPROVED", createdDate: "Feb 5, 2025", productionDate: "Feb 20, 2025" },
  { id: "22575", customer: "Lisa Milecki - Terracon - Southern...", dueDate: "Mar 6, 2025", total: "$1,985.76", owner: "Mary-Peyton Licerio", status: "QUOTE" },
  { id: "22574", customer: "Lisa Milecki - Terracon - Southern...", dueDate: "Mar 6, 2025", total: "$1,797.12", owner: "Mary-Peyton Licerio", status: "QUOTE" },
  { id: "22571", customer: "Joseph Fyffe - GE Aerospace", dueDate: "Mar 6, 2025", total: "$1,005.27", owner: "Corey Creswell", status: "QUOTE APPROVED" },
  { id: "22568", customer: "Kelsey Smith - Lively Grove Farms", dueDate: "Apr 3, 2025", total: "$1,014.48", owner: "Mary-Peyton Licerio", status: "QUOTE" },
  { id: "22567", customer: "Amy Jackson - Creature Theory", dueDate: "Apr 3, 2025", total: "$619.20", owner: "Mary-Peyton Licerio", status: "QUOTE APPROVED" },
  { id: "22565", customer: "Judy Tolsdorf - Champion Chevrolet", dueDate: "Mar 27, 2025", total: "$622.35", owner: "Corey Creswell", status: "QUOTE APPROVED" },
];

// Predefined customer options
const customerOptions = [
  "Elishaday Kassa - Chick-fil-A Su...",
  "Quincy Adkins - BATTLE L.P. GAS CO",
  "Lisa Milecki - Terracon - Southern...",
  "Joseph Fyffe - GE Aerospace",
  "Kelsey Smith - Lively Grove Farms",
  "Amy Jackson - Creature Theory",
  "Judy Tolsdorf - Champion Chevrolet",
];

const categoryOptions = [
  "Socks",
  "Beanies",
  "Accessories",
  "Others"
];

// Replace the existing itemStyles object with the new array
const itemStyles = [
    { id: "1", Style: "Wrist Band - 4.75\" Length" },
    { id: "2", Style: "Wrist Band - 5.25\" Length" },
    { id: "3", Style: "Beverly - Can" },
    { id: "4", Style: "Beverly - Bottle" },
    { id: "5", Style: "Scarf - Fringed" },
    { id: "6", Style: "Bombshell Leg Warmers - Full Length" },
    { id: "7", Style: "Bombshell Leg Warmers - 15\" Length" },
    { id: "8", Style: "The Pom" },
    { id: "9", Style: "The OG" },
    { id: "10", Style: "The Waffle" },
    { id: "11", Style: "The Plush" },
    { id: "12", Style: "The Micro Waffle" },
    { id: "13", Style: "The Skull Noggin" },
    { id: "14", Style: "The Summit" },
    { id: "15", Style: "The Ridgeline" },
    { id: "16", Style: "The Lumberjack" },
    { id: "17", Style: "The Fringe" },
    { id: "18", Style: "The Trailhead" },
    { id: "19", Style: "The Moose" },
    { id: "20", Style: "The Evergreen" },
    { id: "21", Style: "The Backcountry" },
    { id: "22", Style: "The Ranger" },
    { id: "23", Style: "The Cable Guy" },
    { id: "24", Style: "The Chunk" },
    { id: "25", Style: "The Fuzz" },
    { id: "26", Style: "The Conservationist" },
    { id: "27", Style: "The Chalet" },
    { id: "28", Style: "The Icon - Classic Crew Sock" },
    { id: "29", Style: "The Running Man - Polyblend Performance Sock" },
    { id: "30", Style: "Arryved Style - Quarter Cushion Performance" },
    { id: "31", Style: "Red Bull Crew" },
    { id: "32", Style: "The Cyclist - Cotton Blend Performance Crew" },
    { id: "33", Style: "Ankle/Low Cut - Cotton Blend Sock" },
    { id: "34", Style: "200 Needle Dress Sock" },
    { id: "35", Style: "No Show - Cotton Blend Sock" },
    { id: "36", Style: "360 DTG Printed Crew Sock" },
    { id: "37", Style: "Sublimated Crew Sock" },
    { id: "38", Style: "Youth Classic Crew Sock" },
    { id: "39", Style: "Tie Dye Crew" },
    { id: "40", Style: "Knee High Performance (No Cushion)" },
    { id: "41", Style: "Wool Dress Sock" },
    { id: "42", Style: "Marled Crew Sock" },
    { id: "43", Style: "Wool Crew Sock" },
    { id: "44", Style: "Waffle Knit Crew Sock" },
    { id: "45", Style: "Chunky Marled Crew Sock" },
    { id: "46", Style: "Chunky Ankle Sock" },
    { id: "47", Style: "Wool Ankle Sock" },
    { id: "484", Style: "Wool Boot Sock - High Crew" },
    { id: "49", Style: "Wool Snow Crew" },
    { id: "50", Style: "Organic Scrunchy Sock" },
    { id: "51", Style: "The Contender - Technical Performance Crew" },
    { id: "52", Style: "Ankle/Low Cut Performance Sock - Cotton Blend" },
    { id: "53", Style: "Ankle Performance Sock - No Cushion" },
    { id: "54", Style: "The Slalom - Merino Wool Blend Ski Sock" },
    { id: "55", Style: "The Squeeze - Classic Compression Sock" },
    { id: "56", Style: "The Aurora - Sheer Crew Sock" },
    { id: "57", Style: "The Goal Getter - Technical Soccer Performance Sock" },
    { id: "58", Style: "Bombshell - Half Cushion Quarter Crew" },
    { id: "59", Style: "Bombshell - Slouch Sock" },
    { id: "60", Style: "True Werk Boot Cut Werksock" },
    { id: "61", Style: "True Werk Lightweight Werk Sock" },
    { id: "62", Style: "Pleasing Style Crew Sock" },
    { id: "63", Style: "Amiri Crew Sock - Adult" },
    { id: "64", Style: "Amiri Crew Sock - Youth" },
    { id: "65", Style: "Aime Leon Dore Crew Sock - Import" },
    { id: "66", Style: "Aime Leon Dore Crew Sock - Domestic" },
    { id: "67", Style: "Aime Leon Dore No Show Sock - Domestic" },
    { id: "68", Style: "HRC Classic Logo Sock - Corporate" },
    { id: "69", Style: "HRC Classic Logo Sock - Franchise" },
    { id: "70", Style: "HRC Burnout Logo Sock - Franchise" },
];

export default function QuoteDetailPage() {
  const searchParams = useSearchParams()
  const quoteId = searchParams.get('id')

  if (!quoteId) {
    return <div>Error: Quote ID is missing.</div>; // Handle missing ID
  }

  const [quote, setQuote] = useState<Quote | null>(null)
  const [activeTab, setActiveTab] = useState("Overview");
  const [quoteItems, setQuoteItems] = useState([
    { category: "", item: "", description: "", logo: "", size: "", qty: 1, price: 0, tax: 0, total: 0 }
  ]);

  // Add a new state for managing the popup visibility and the selected image
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const foundQuote = quotes.find(quote => quote.id === quoteId);
    if (!foundQuote) {
      setQuote(null); // Set quote to null if not found
    } else {
      setQuote(foundQuote);
    }
  }, [quoteId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (quote) {
      console.log("Updated quote:", quote)
      // Implement logic to update the quote in the database or state
    }
  }

  const handleAddItem = () => {
    setQuoteItems([...quoteItems, { category: "", item: "", description: "", logo: "", size: "", qty: 1, price: 0, tax: 0, total: 0 }]);
  };

  const handleChange = (index: number, field: string, value: any) => {
    const newItems = [...quoteItems];
    newItems[index][field] = value;

    // Set the description based on the selected item number
    if (field === "item") {
        const selectedItem = itemStyles.find(item => item.id === value);
        newItems[index].description = selectedItem ? selectedItem.Style : ""; // Set description based on item ID
    }

    if (field === "qty" || field === "price" || field === "tax") {
        newItems[index].total = (newItems[index].qty * newItems[index].price) + newItems[index].tax;
    }
    setQuoteItems(newItems);
  };

  const calculateTotals = () => {
    const subtotal = quoteItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const totalTax = quoteItems.reduce((acc, item) => acc + item.tax, 0);
    const total = subtotal + totalTax;

    return { subtotal, totalTax, total };
  };

  const { subtotal, totalTax, total } = calculateTotals();

  // Function to handle image click
  const handleImageClick = (image: File | null) => {
    if (image) {
        setSelectedImage(URL.createObjectURL(image)); // Create a URL for the image
        setIsPopupOpen(true); // Open the popup
    }
  };

  // Function to close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedImage(null); // Clear the selected image
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AppSidebar />
      <main className="flex-1 p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <Link 
                href="/quotes" 
                className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Quotes
              </Link>
              <h1 className="text-2xl font-bold mt-2">Quote Details</h1>
            </div>
            <Link href="/quotes/add">
              <Button className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-200">
                Add Quote
              </Button>
            </Link>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-4">
          <div className="flex space-x-4">
            {["Overview", "Payments/Expenses", "Messages", "Tasks", "Schedule"].map(tab => (
              <button
                key={tab}
                className={`py-2 px-4 rounded-md ${activeTab === tab ? 'bg-gray-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {quote ? (
          <form onSubmit={handleSubmit}>
            {activeTab === "Overview" && ( // Render cards only if Overview tab is active
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Quote Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex space-x-4"> {/* Flex container for inline fields */}
                        <div className="flex-1">
                          <label className="text-sm font-medium">ID</label>
                          <Input
                            value={quote.id}
                            readOnly
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-sm font-medium">Owner</label>
                          <Input
                            value={quote.owner}
                            readOnly
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-sm font-medium">Status</label>
                          <Input
                            value={quote.status}
                            readOnly
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Customer</label>
                        <select
                          value={quote.customer}
                          onChange={(e) => setQuote({ ...quote, customer: e.target.value })}
                          className="block w-full border border-gray-300 rounded-md p-2"
                        >
                          <option value="" disabled>Select a customer</option>
                          {customerOptions.map((customer) => (
                            <option key={customer} value={customer}>{customer}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Customer Notes</label>
                        <Input
                          value={quote.customerNotes || ""}
                          onChange={(e) => setQuote({ ...quote, customerNotes: e.target.value })}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Conditions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex space-x-4"> {/* Flex container for inline fields */}
                        <div className="flex-1">
                          <label className="text-sm font-medium">Created Date</label>
                          <Input
                            value={quote.createdDate || ""}
                            onChange={(e) => setQuote({ ...quote, createdDate: e.target.value })}
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-sm font-medium">Production Date</label>
                          <Input
                            value={quote.productionDate || ""}
                            onChange={(e) => setQuote({ ...quote, productionDate: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="flex space-x-4"> {/* Flex container for inline fields */}
                        <div className="flex-1">
                          <label className="text-sm font-medium">Customer Date</label>
                          <Input
                            value={quote.dueDate}
                            onChange={(e) => setQuote({ ...quote, dueDate: e.target.value })}
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-sm font-medium">Invoice Date</label>
                          <Input
                            value={quote.invoiceDate || ""}
                            onChange={(e) => setQuote({ ...quote, invoiceDate: e.target.value })}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Terms</label>
                        <Input
                          value={quote.terms || ""}
                          onChange={(e) => setQuote({ ...quote, terms: e.target.value })}
                        />
                      </div>
                      <div className="flex space-x-4"> {/* Flex container for inline fields */}
                        <div className="flex-1">
                          <label className="text-sm font-medium">Payment Date</label>
                          <Input
                            value={quote.paymentDate || ""}
                            onChange={(e) => setQuote({ ...quote, paymentDate: e.target.value })}
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-sm font-medium">Total</label>
                          <Input
                            value={quote.total}
                            onChange={(e) => setQuote({ ...quote, total: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mt-6 md:col-span-2"> {/* Make this card span both columns */}
                  <CardHeader>
                    <CardTitle>Quote Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto"> {/* Added for horizontal scrolling on small screens */}
                      <table className="min-w-full border-collapse border border-gray-200">
                        <thead>
                          <tr>
                            <th className="border border-gray-200 p-2">Category</th>
                            <th className="border border-gray-200 p-2">Item #</th>
                            <th className="border border-gray-200 p-2">Description</th>
                            <th className="border border-gray-200 p-2">Logo</th>
                            <th className="border border-gray-200 p-2">Size</th>
                            <th className="border border-gray-200 p-2">Qty</th>
                            <th className="border border-gray-200 p-2">Price</th>
                            <th className="border border-gray-200 p-2">Tax</th>
                            <th className="border border-gray-200 p-2">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {quoteItems.map((item, index) => (
                            <tr key={index}>
                              <td className="border border-gray-200 p-2">
                                <select
                                  value={item.category}
                                  onChange={(e) => handleChange(index, "category", e.target.value)}
                                  className="border border-gray-300 rounded-md p-2 text-sm w-full"
                                >
                                  <option value="" disabled>Select Category</option>
                                  {categoryOptions.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                  ))}
                                </select>
                              </td>
                              <td className="border border-gray-200 p-2">
                                <select
                                  value={item.item}
                                  onChange={(e) => handleChange(index, "item", e.target.value)}
                                  className="border border-gray-300 rounded-md p-2 text-sm w-full"
                                >
                                  <option value="" disabled>Select Item</option>
                                  {itemStyles.map((style) => (
                                    <option key={style.id} value={style.id}>{style.Style}</option>
                                  ))}
                                </select>
                              </td>
                              <td className="border border-gray-200 p-2">
                                <Input 
                                  value={item.description} 
                                  onChange={(e) => handleChange(index, "description", e.target.value)} 
                                  className="border border-gray-300 rounded-md p-2 text-sm w-full"
                                />
                              </td>
                              <td className="border border-gray-200 p-2">
                                <input 
                                  type="file" 
                                  onChange={(e) => handleChange(index, "logo", e.target.files ? e.target.files[0] : null)} 
                                  className="border border-gray-300 rounded-md p-1 text-sm w-full"
                                  accept="image/*"
                                />
                                {item.logo && (
                                  <div className="mt-2 cursor-pointer" onClick={() => handleImageClick(item.logo)}>
                                    <img 
                                      src={URL.createObjectURL(item.logo)} 
                                      alt="Uploaded Logo" 
                                      className="h-16 w-16 object-cover rounded-md"
                                    />
                                  </div>
                                )}
                              </td>
                              <td className="border border-gray-200 p-2">
                                <Input 
                                  value={item.size} 
                                  onChange={(e) => handleChange(index, "size", e.target.value)} 
                                  className="border border-gray-300 rounded-md p-2 text-sm w-full"
                                />
                              </td>
                              <td className="border border-gray-200 p-2">
                                <Input 
                                  type="number" 
                                  value={item.qty} 
                                  onChange={(e) => handleChange(index, "qty", Number(e.target.value))} 
                                  className="border border-gray-300 rounded-md p-2 text-sm w-full"
                                />
                              </td>
                              <td className="border border-gray-200 p-2">
                                <Input 
                                  type="number" 
                                  value={item.price} 
                                  onChange={(e) => handleChange(index, "price", Number(e.target.value))} 
                                  className="border border-gray-300 rounded-md p-2 text-sm w-full"
                                />
                              </td>
                              <td className="border border-gray-200 p-2">
                                <Input 
                                  type="number" 
                                  value={item.tax} 
                                  onChange={(e) => handleChange(index, "tax", Number(e.target.value))} 
                                  className="border border-gray-300 rounded-md p-2 text-sm w-full"
                                />
                              </td>
                              <td className="border border-gray-200 p-2">
                                <span className="text-lg font-semibold">{item.total.toFixed(2)}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <Button onClick={handleAddItem} className="mt-4">Add Item</Button>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Totals Section */}
            <div className="flex justify-end space-x-4 mt-4">
              <div className="flex flex-col">
                <span className="text-sm font-medium">Subtotal: ${subtotal.toFixed(2)}</span>
                <span className="text-sm font-medium">Tax: ${totalTax.toFixed(2)}</span>
                <span className="text-lg font-bold">Total: ${total.toFixed(2)}</span>
              </div>
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
          <div>Error: Quote not found.</div>
        )}

        {/* Popup for image preview */}
        {isPopupOpen && selectedImage && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"> {/* Darker background for better contrast */}
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl max-h-4xl overflow-hidden"> {/* Increased padding and shadow for depth */}
                    <img src={selectedImage} alt="Uploaded Logo" className="max-w-full max-h-96 object-contain" /> {/* Set max height for the image */}
                    <div className="flex justify-end mt-4">
                        <button onClick={closePopup} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">Close</button>
                    </div>
                </div>
            </div>
        )}

        {activeTab === "Payments/Expenses" && ( // Render the Payments/Expenses tab content
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="text-2xl font-bold">Profit $0.00</div>
                  <div className="mt-2">
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-green-500 rounded-full mr-1"></div>
                      <span>Revenue</span>
                    </div>
                    <div className="flex items-center">
                      <div className="h-2 w-2 bg-red-500 rounded-full mr-1"></div>
                      <span>Expenses</span>
                    </div>
                  </div>
                  {/* Updated chart with dummy data */}
                  <div className="mt-4 w-full">
                    <div className="flex justify-between">
                      <div className="flex flex-col items-center">
                        <div className="h-20 w-10 bg-green-500" style={{ height: '70%' }}></div>
                        <span className="text-sm">Revenue</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-20 w-10 bg-red-500" style={{ height: '40%' }}></div>
                        <span className="text-sm">Expenses</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="h-20 w-10 bg-blue-500" style={{ height: '30%' }}></div>
                        <span className="text-sm">Net Profit</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Payments/Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="text-gray-500">No transactions yet</div>
                  <div className="mt-4 flex space-x-2">
                    <button className="bg-blue-500 text-white rounded-md px-4 py-2">+ Payment Request</button>
                    <button className="bg-green-600 text-white rounded-md px-4 py-2">+ Payment</button>
                    <button className="bg-red-500 text-white rounded-md px-4 py-2">+ Expense</button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "Messages" && ( // Render the Messages tab content
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Send Message</h2>
            <form>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-1">To</label>
                  <input 
                    type="email" 
                    placeholder="recipient@example.com" 
                    className="border border-gray-300 rounded-md p-2 w-full" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Subject line</label>
                  <input 
                    type="text" 
                    placeholder="Subject" 
                    className="border border-gray-300 rounded-md p-2 w-full" 
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea 
                  rows={4} 
                  placeholder="Type your message here..." 
                  className="border border-gray-300 rounded-md p-2 w-full" 
                />
              </div>
              <div className="flex items-center mt-4">
                <button type="button" className="bg-blue-500 text-white rounded-md px-4 py-2 mr-2">
                  Attach Approval
                </button>
                <button type="submit" className="bg-green-600 text-white rounded-md px-4 py-2">
                  Send
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  )
} 