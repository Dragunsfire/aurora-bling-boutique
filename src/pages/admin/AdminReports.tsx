
import React, { useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateSalesReport, SalesReport } from '@/data/orders';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const AdminReports = () => {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [showCurrency, setShowCurrency] = useState<'USD' | 'VES' | 'both'>('both');
  
  // Generate reports based on selected period
  const report = generateSalesReport(period);
  
  // Prepare data for charts
  const statusData = Object.entries(report.salesByStatus).map(([status, value]) => ({
    status,
    value
  }));
  
  const currencyData = Object.entries(report.salesByCurrency).map(([currency, value]) => ({
    currency,
    value
  }));
  
  const filterCurrencyData = () => {
    if (showCurrency === 'both') return currencyData;
    return currencyData.filter(item => item.currency === showCurrency);
  };
  
  return (
    <AdminLayout>
      <div className="container mx-auto p-4 space-y-8">
        <h1 className="text-2xl font-playfair font-bold text-aurora-dark">Sales Reports</h1>
        
        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="status">By Status</TabsTrigger>
            <TabsTrigger value="currency">By Currency</TabsTrigger>
          </TabsList>
          
          <div className="flex gap-4 mt-4">
            <TabsTrigger 
              value={period === 'daily' ? 'active' : ''}
              onClick={() => setPeriod('daily')}
              className={`px-4 py-2 rounded ${period === 'daily' ? 'bg-aurora-purple text-white' : 'bg-gray-100'}`}
            >
              Daily
            </TabsTrigger>
            <TabsTrigger 
              value={period === 'weekly' ? 'active' : ''}
              onClick={() => setPeriod('weekly')}
              className={`px-4 py-2 rounded ${period === 'weekly' ? 'bg-aurora-purple text-white' : 'bg-gray-100'}`}
            >
              Weekly
            </TabsTrigger>
            <TabsTrigger 
              value={period === 'monthly' ? 'active' : ''}
              onClick={() => setPeriod('monthly')}
              className={`px-4 py-2 rounded ${period === 'monthly' ? 'bg-aurora-purple text-white' : 'bg-gray-100'}`}
            >
              Monthly
            </TabsTrigger>
          </div>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-5">
                <h3 className="text-sm text-aurora-neutral">Total Sales</h3>
                <p className="text-3xl font-medium mt-2">${report.totalSales.toFixed(2)}</p>
              </Card>
              
              <Card className="p-5">
                <h3 className="text-sm text-aurora-neutral">Orders</h3>
                <p className="text-3xl font-medium mt-2">{report.orderCount}</p>
              </Card>
              
              <Card className="p-5">
                <h3 className="text-sm text-aurora-neutral">Avg. Order Value</h3>
                <p className="text-3xl font-medium mt-2">${report.averageOrderValue.toFixed(2)}</p>
              </Card>
              
              <Card className="p-5">
                <h3 className="text-sm text-aurora-neutral">Period</h3>
                <p className="text-3xl font-medium mt-2 capitalize">{period}</p>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="p-5">
                <h3 className="text-base font-medium mb-4">Sales by Status</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={statusData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="status" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Sales']} />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
              
              <Card className="p-5">
                <h3 className="text-base font-medium mb-4">Sales by Currency</h3>
                <div className="flex items-center space-x-2 mb-4">
                  <Switch 
                    id="currency-toggle" 
                    checked={showCurrency !== 'both'} 
                    onCheckedChange={() => setShowCurrency(showCurrency === 'both' ? 'USD' : 'both')}
                  />
                  <Label htmlFor="currency-toggle">
                    {showCurrency === 'both' ? 'Show Both Currencies' : `Show ${showCurrency} Only`}
                  </Label>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={filterCurrencyData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="currency" />
                    <YAxis />
                    <Tooltip formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Sales']} />
                    <Bar dataKey="value" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="status" className="mt-6">
            <Card className="p-5">
              <h3 className="text-lg font-medium mb-4">Sales by Order Status</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={statusData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="status" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Sales']} />
                  <Legend />
                  <Bar dataKey="value" name="Sales" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>
          
          <TabsContent value="currency" className="mt-6">
            <Card className="p-5">
              <h3 className="text-lg font-medium mb-4">Sales by Currency</h3>
              <div className="flex items-center space-x-2 mb-4">
                <Switch 
                  id="currency-toggle-detail" 
                  checked={showCurrency !== 'both'} 
                  onCheckedChange={() => {
                    if (showCurrency === 'both') setShowCurrency('USD');
                    else if (showCurrency === 'USD') setShowCurrency('VES');
                    else setShowCurrency('both');
                  }}
                />
                <Label htmlFor="currency-toggle-detail">
                  {showCurrency === 'both' 
                    ? 'Show Both Currencies' 
                    : `Show ${showCurrency} Only`}
                </Label>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={filterCurrencyData()}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="currency" />
                  <YAxis />
                  <Tooltip formatter={(value: any) => [`$${Number(value).toFixed(2)}`, 'Sales']} />
                  <Legend />
                  <Bar dataKey="value" name="Sales" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminReports;
