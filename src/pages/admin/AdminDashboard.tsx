
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllOrders } from '@/data/orders';
import { products } from '@/data/products';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Package, ShoppingCart, DollarSign, Users } from 'lucide-react';

// Helper function to format large numbers
const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

const AdminDashboard: React.FC = () => {
  const { formatPrice } = useCurrency();
  const orders = getAllOrders();
  
  // Calculate dashboard statistics
  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const lowStockProducts = products.filter(product => product.stock < 5).length;
  
  const recentOrders = orders.slice(0, 5);
  
  // Calculate revenue by currency
  const usdRevenue = orders
    .filter(order => order.currency === 'USD')
    .reduce((sum, order) => sum + order.total, 0);
  
  const vesRevenue = orders
    .filter(order => order.currency === 'VES')
    .reduce((sum, order) => sum + order.total, 0);
  
  return (
    <AdminLayout title="Dashboard">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatPrice(totalRevenue)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalOrders)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(totalProducts)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <Package className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">{formatNumber(lowStockProducts)}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Recent Orders */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              Showing the latest {recentOrders.length} orders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="text-xs uppercase text-gray-500 bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Order ID</th>
                    <th className="px-4 py-2 text-left">Customer</th>
                    <th className="px-4 py-2 text-left">Date</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">{order.id}</td>
                      <td className="px-4 py-3">{order.user.name}</td>
                      <td className="px-4 py-3">
                        {order.createdAt.toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                          order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                          order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium">
                        {formatPrice(order.total)}
                      </td>
                    </tr>
                  ))}
                  
                  {recentOrders.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-4 py-3 text-center text-gray-500">
                        No orders found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-gray-50 px-6 py-3">
            <a href="/admin/orders" className="text-sm text-blue-600 hover:underline">
              View all orders
            </a>
          </CardFooter>
        </Card>
      </div>
      
      {/* Revenue by Currency */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>USD Revenue</CardTitle>
            <CardDescription>
              Total sales in US Dollars
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${formatNumber(usdRevenue)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>VES Revenue</CardTitle>
            <CardDescription>
              Total sales in Venezuelan Bolivars
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">Bs. {formatNumber(vesRevenue)}</div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
