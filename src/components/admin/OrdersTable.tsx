
import React from 'react';
import { format } from 'date-fns';
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Order, OrderStatus } from '@/data/orders';
import { getAllOrders } from '@/data/orders';

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-200 text-yellow-800';
    case 'processing':
      return 'bg-blue-200 text-blue-800';
    case 'shipped':
      return 'bg-purple-200 text-purple-800';
    case 'delivered':
      return 'bg-green-200 text-green-800';
    case 'cancelled':
      return 'bg-red-200 text-red-800';
    default:
      return 'bg-gray-200 text-gray-800';
  }
};

const OrdersTable: React.FC = () => {
  const orders = getAllOrders();
  
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
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No orders found
              </TableCell>
            </TableRow>
          ) : (
            orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id.substring(0, 8)}...</TableCell>
                <TableCell>{`${order.shippingInfo.firstName} ${order.shippingInfo.lastName}`}</TableCell>
                <TableCell>{format(order.createdAt, 'MMM dd, yyyy')}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`${getStatusColor(order.status)}`}>
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {order.currency === 'USD' ? '$' : 'Bs.'}{order.total.toFixed(2)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrdersTable;
