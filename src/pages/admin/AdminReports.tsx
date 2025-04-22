
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateSalesReport, SalesReport } from '@/data/orders';
import { useCurrency } from '@/contexts/CurrencyContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const AdminReports: React.FC = () => {
  const { formatPrice } = useCurrency();
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('monthly');
  
  // Generate report based on selected period
  const report = generateSalesReport(period);
  
  // Prepare data for bar chart (sales by status)
  const statusData = Object.entries(report.salesByStatus).map(([status, amount]) => ({
    status: status.charAt(0).toUpperCase() + status.slice(1),
    amount
  }));
  
  // Prepare data for pie chart (sales by currency)
  const currencyData = Object.entries(report.salesByCurrency).map(([currency, amount]) => ({
    currency,
    amount,
    value: amount // for pie chart
  }));
  
  // Colors for charts
  const COLORS = ['#9b87f5', '#7E69AB', '#D6BCFA', '#FFDEE2', '#F1F0FB'];
  
  return (
    <AdminLayout title="Sales Reports">
      {/* Period Selection */}
      <div className="mb-6">
        <div className="bg-white rounded-lg p-4 shadow">
          <div className="text-lg font-medium mb-4">Select Report Period</div>
          <div className="flex space-x-2">
            <button
              onClick={() => setPeriod('daily')}
              className={`px-4 py-2 rounded-md ${
                period === 'daily'
                  ? 'bg-aurora-purple text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Daily
            </button>
            <button
              onClick={() => setPeriod('weekly')}
              className={`px-4 py-2 rounded-md ${
                period === 'weekly'
                  ? 'bg-aurora-purple text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setPeriod('monthly')}
              className={`px-4 py-2 rounded-md ${
                period === 'monthly'
                  ? 'bg-aurora-purple text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Monthly
            </button>
          </div>
        </div>
      </div>
      
      {/* Report Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(report.totalSales)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Order Count</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{report.orderCount}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {report.averageOrderValue > 0 
                ? formatPrice(report.averageOrderValue) 
                : '$0.00'}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-gray-500">Period</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold capitalize">{period}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales by Status (Bar Chart) */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Order Status</CardTitle>
            <CardDescription>Breakdown of sales by order status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={statusData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
                  />
                  <Legend />
                  <Bar dataKey="amount" fill="#9b87f5" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Sales by Currency (Pie Chart) */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Currency</CardTitle>
            <CardDescription>Breakdown of sales by currency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={currencyData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="currency"
                    label={({ currency, percent }) => 
                      `${currency}: ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {currencyData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Sales Details Table */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Sales Details</CardTitle>
          <CardDescription>Detailed breakdown of sales</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-xs uppercase text-gray-500 bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-right">Amount</th>
                  <th className="px-4 py-2 text-right">Percentage</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr className="font-medium">
                  <td className="px-4 py-2">Total Sales</td>
                  <td className="px-4 py-2 text-right">{formatPrice(report.totalSales)}</td>
                  <td className="px-4 py-2 text-right">100%</td>
                </tr>
                
                {/* Status breakdown */}
                <tr>
                  <td colSpan={3} className="px-4 py-2 bg-gray-50 font-medium">
                    By Status
                  </td>
                </tr>
                {Object.entries(report.salesByStatus).map(([status, amount]) => {
                  const percentage = report.totalSales > 0
                    ? (amount / report.totalSales) * 100
                    : 0;
                  
                  return (
                    <tr key={status}>
                      <td className="px-4 py-2 capitalize">{status}</td>
                      <td className="px-4 py-2 text-right">{formatPrice(amount)}</td>
                      <td className="px-4 py-2 text-right">
                        {percentage.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
                
                {/* Currency breakdown */}
                <tr>
                  <td colSpan={3} className="px-4 py-2 bg-gray-50 font-medium">
                    By Currency
                  </td>
                </tr>
                {Object.entries(report.salesByCurrency).map(([currency, amount]) => {
                  const percentage = report.totalSales > 0
                    ? (amount / report.totalSales) * 100
                    : 0;
                  
                  return (
                    <tr key={currency}>
                      <td className="px-4 py-2">{currency}</td>
                      <td className="px-4 py-2 text-right">{formatPrice(amount)}</td>
                      <td className="px-4 py-2 text-right">
                        {percentage.toFixed(1)}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminReports;
