
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getAllOrders } from '@/data/orders';

const OrdersTable = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');
  const orders = getAllOrders();
  
  // Filter orders based on selected time range
  const getFilteredOrders = () => {
    const now = new Date();
    let dateFilter: Date;
    
    if (timeRange === 'week') {
      dateFilter = new Date(now.setDate(now.getDate() - 7));
    } else if (timeRange === 'month') {
      dateFilter = new Date(now.setMonth(now.getMonth() - 1));
    } else {
      dateFilter = new Date(now.setFullYear(now.getFullYear() - 1));
    }
    
    return orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      return orderDate >= dateFilter;
    });
  };
  
  const filteredOrders = getFilteredOrders();
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders Overview</CardTitle>
        <CardDescription>View and manage recent orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="month" onValueChange={(value) => setTimeRange(value as 'week' | 'month' | 'year')}>
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="week">Last Week</TabsTrigger>
            <TabsTrigger value="month">Last Month</TabsTrigger>
            <TabsTrigger value="year">Last Year</TabsTrigger>
          </TabsList>
          <TabsContent value="week" className="mt-4">
            <OrdersTableContent orders={filteredOrders} />
          </TabsContent>
          <TabsContent value="month" className="mt-4">
            <OrdersTableContent orders={filteredOrders} />
          </TabsContent>
          <TabsContent value="year" className="mt-4">
            <OrdersTableContent orders={filteredOrders} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface OrdersTableContentProps {
  orders: ReturnType<typeof getAllOrders>;
}

const OrdersTableContent: React.FC<OrdersTableContentProps> = ({ orders }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">No orders found</TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id.slice(0, 8)}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    order.status === 'completed' 
                      ? 'bg-green-100 text-green-800' 
                      : order.status === 'processing' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </TableCell>
                <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
