"use client"

import { useState } from "react";
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, Legend
} from 'recharts';

// Dummy data for sales metrics
const salesData = [
  { name: 'Rep 1', sales: 4000, monthlyGoal: 5000, openOrders: 5, openInvoices: 3, paidInvoices: 2, currentSalesMonth: 3000, currentSalesYear: 20000, grossProfit: 20 },
  { name: 'Rep 2', sales: 3000, monthlyGoal: 4000, openOrders: 2, openInvoices: 1, paidInvoices: 1, currentSalesMonth: 2500, currentSalesYear: 15000, grossProfit: 25 },
  // Add more reps as needed
];

// Dummy data for production metrics
const productionData = [
  { name: 'Open Orders', count: 10 },
  { name: 'Shipped Orders', count: 7 },
  { name: 'Orders with Deadlines', count: 5 },
  { name: 'Pending Orders', count: 3 },
  { name: 'Average Days to Produce', days: 5 },
  { name: 'Embroidery QTY', qty: 150 },
  { name: 'Screen Print QTY', qty: 200 },
];

// Dummy data for admin metrics
const adminData = [
  { name: 'Monthly Sales Goal', goal: 5000, current: 4000 },
  { name: 'Yearly Sales Goal', goal: 60000, current: 48000 },
  { name: 'Open Orders', total: 15 },
  { name: 'Open Invoices', total: 8 },
  { name: 'AR Summary', total: 5000 },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('sales');

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <AppSidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboards</h1>

        <div className="mb-4">
          <button onClick={() => setActiveTab('sales')} className={`mr-4 ${activeTab === 'sales' ? 'font-bold' : ''}`}>Sales</button>
          <button onClick={() => setActiveTab('production')} className={`mr-4 ${activeTab === 'production' ? 'font-bold' : ''}`}>Production</button>
          <button onClick={() => setActiveTab('admin')} className={`mr-4 ${activeTab === 'admin' ? 'font-bold' : ''}`}>Admin</button>
          <button onClick={() => setActiveTab('other')} className={`${activeTab === 'other' ? 'font-bold' : ''}`}>Other</button>
        </div>

        {activeTab === 'sales' && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">Monthly Sales Goal and %</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={salesData} animationDuration={500}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value}`, name]} />
                  <Bar dataKey="monthlyGoal" fill="#2563eb" label={{ position: 'top' }} />
                  <Bar dataKey="sales" fill="#16a34a" label={{ position: 'top' }} />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">Open Orders - Per Rep</h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={salesData} dataKey="openOrders" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                    {salesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} Orders`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">Open Invoices - Per Rep</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={salesData} animationDuration={500}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value} Invoices`, name]} />
                  <Bar dataKey="openInvoices" fill="#ea580c" label={{ position: 'top' }} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">Paid Invoices (Last 7 Days) - Per Rep</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={salesData} animationDuration={500}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value} Invoices`, name]} />
                  <Line type="monotone" dataKey="paidInvoices" stroke="#7c3aed" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">Current Sales per Month (Per Rep)</h2>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={salesData} animationDuration={500}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value} Sales`, name]} />
                  <Area type="monotone" dataKey="currentSalesMonth" stroke="#2563eb" fill="#2563eb" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">Current Sales per Year (Per Rep)</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={salesData} animationDuration={500}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value} Sales`, name]} />
                  <Bar dataKey="currentSalesYear" fill="#16a34a" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">Per Rep Gross Profit %</h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={salesData} dataKey="grossProfit" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                    {salesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'production' && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
            {/* Open Orders */}
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">Open Orders</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={productionData.filter(item => item.name === 'Open Orders')} animationDuration={500}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value}`, name]} />
                  <Bar dataKey="count" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Orders Shipped Last 7 Days */}
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">Orders Shipped Last 7 Days</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={productionData.filter(item => item.name === 'Shipped Orders')} animationDuration={500}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value} Orders`, name]} />
                  <Line type="monotone" dataKey="count" stroke="#7c3aed" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Orders with Deadlines */}
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">Orders with Deadlines</h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={productionData.filter(item => item.name === 'Orders with Deadlines')} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                    {productionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} Orders`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Order Statuses */}
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">Order Statuses</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={productionData.filter(item => item.name === 'Pending Orders')} animationDuration={500}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value} Orders`, name]} />
                  <Bar dataKey="count" fill="#ea580c" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Average Days to Produce */}
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">Average Days to Produce</h2>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={productionData.filter(item => item.name === 'Average Days to Produce')} animationDuration={500}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value} Days`, name]} />
                  <Area type="monotone" dataKey="days" stroke="#2563eb" fill="#2563eb" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Embroidery QTY Produced Current Month */}
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">Embroidery QTY Produced Current Month</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={productionData.filter(item => item.name === 'Embroidery QTY')} animationDuration={500}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value} Units`, name]} />
                  <Bar dataKey="qty" fill="#16a34a" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Screen Print QTY Current Month */}
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">Screen Print QTY Current Month</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={productionData.filter(item => item.name === 'Screen Print QTY')} animationDuration={500}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value} Units`, name]} />
                  <Bar dataKey="qty" fill="#ea580c" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'admin' && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
            {/* Monthly Sales Goal and % */}
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">Monthly Sales Goal and %</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={adminData} animationDuration={500}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value}`, name]} />
                  <Bar dataKey="current" fill="#2563eb" />
                  <Bar dataKey="goal" fill="#16a34a" />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Yearly Sales Goal and % */}
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">Yearly Sales Goal and %</h2>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={adminData} animationDuration={500}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value}`, name]} />
                  <Line type="monotone" dataKey="current" stroke="#7c3aed" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Open Orders - Total */}
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">Open Orders - Total</h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={adminData.filter(item => item.name === 'Open Orders')} dataKey="total" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                    {adminData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [`${value} Orders`, name]} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Open Invoices - Total */}
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">Open Invoices - Total</h2>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={adminData.filter(item => item.name === 'Open Invoices')} animationDuration={500}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value}`, name]} />
                  <Bar dataKey="total" fill="#ea580c" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* AR Summary */}
            <div className="rounded-lg border bg-card p-6">
              <h2 className="mb-4 text-xl font-semibold">AR Summary</h2>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={adminData.filter(item => item.name === 'AR Summary')} animationDuration={500}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value, name) => [`${value}`, name]} />
                  <Area type="monotone" dataKey="total" stroke="#2563eb" fill="#2563eb" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

