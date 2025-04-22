
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Order, getAllOrders, OrderStatus, updateOrderStatus } from '@/data/orders';
import { useCurrency } from '@/contexts/CurrencyContext';
import { Search, Eye } from 'lucide-react';

const AdminOrders: React.FC = () => {
  const { formatPrice } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isOrderDetailsOpen, setIsOrderDetailsOpen] = useState(false);
  
  const orders = getAllOrders();
  
  // Filter orders based on search term and status filter
  const filteredOrders = orders.filter(order => {
    const matchesSearch = searchTerm
      ? (order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
         order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
         order.user.email.toLowerCase().includes(searchTerm.toLowerCase()))
      : true;
    
    const matchesFilter = filter === 'all' || order.status === filter;
    
    return matchesSearch && matchesFilter;
  });
  
  // Handle order status change
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    updateOrderStatus(orderId, newStatus);
    
    // If the order being viewed is the one we're updating, update the selected order too
    if (selectedOrder && selectedOrder.id === orderId) {
      const updatedOrder = orders.find(order => order.id === orderId);
      if (updatedOrder) {
        setSelectedOrder(updatedOrder);
      }
    }
  };
  
  // View order details
  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setIsOrderDetailsOpen(true);
  };
  
  return (
    <AdminLayout title="Orders Management">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 mb-4">
            {/* Search */}
            <div className="relative flex-1 min-w-[240px]">
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search by order ID or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            {/* Status filter */}
            <div className="w-[180px]">
              <Select
                value={filter}
                onValueChange={(value: OrderStatus | 'all') => setFilter(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* Orders Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-xs uppercase text-gray-500 bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">Customer</th>
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Currency</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{order.id}</td>
                    <td className="px-4 py-3">
                      <div>
                        <div className="font-medium">{order.user.name}</div>
                        <div className="text-sm text-gray-500">{order.user.email}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {order.createdAt.toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3">{order.currency}</td>
                    <td className="px-4 py-3 font-medium">{formatPrice(order.total)}</td>
                    <td className="px-4 py-3">
                      <Select
                        value={order.status}
                        onValueChange={(value: OrderStatus) => handleStatusChange(order.id, value)}
                      >
                        <SelectTrigger className="h-8 w-[130px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewOrder(order)}
                      >
                        <Eye className="h-4 w-4 mr-1" /> View
                      </Button>
                    </td>
                  </tr>
                ))}
                
                {filteredOrders.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-3 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Order Details Dialog */}
      <Dialog open={isOrderDetailsOpen} onOpenChange={setIsOrderDetailsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Order ID: {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Customer Information */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Customer Information</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p><span className="font-medium">Name:</span> {selectedOrder.user.name}</p>
                    <p><span className="font-medium">Email:</span> {selectedOrder.user.email}</p>
                    <p><span className="font-medium">Language:</span> {selectedOrder.language === 'en' ? 'English' : 'Spanish'}</p>
                  </div>
                </div>
                
                {/* Shipping Information */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Shipping Information</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p>
                      {selectedOrder.shippingInfo.firstName} {selectedOrder.shippingInfo.lastName}
                    </p>
                    <p>{selectedOrder.shippingInfo.address}</p>
                    <p>
                      {selectedOrder.shippingInfo.city}, {selectedOrder.shippingInfo.state} {selectedOrder.shippingInfo.zip}
                    </p>
                    <p>{selectedOrder.shippingInfo.country}</p>
                    <p className="mt-2">{selectedOrder.shippingInfo.phone}</p>
                  </div>
                </div>
                
                {/* Payment Information */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Payment Information</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <p>
                      <span className="font-medium">Method:</span>{' '}
                      {selectedOrder.paymentInfo.method === 'creditCard' 
                        ? 'Credit Card' 
                        : 'Bank Transfer'}
                    </p>
                    {selectedOrder.paymentInfo.method === 'creditCard' && (
                      <>
                        <p><span className="font-medium">Card:</span> •••• {selectedOrder.paymentInfo.cardNumber?.slice(-4)}</p>
                        <p><span className="font-medium">Name on Card:</span> {selectedOrder.paymentInfo.cardName}</p>
                      </>
                    )}
                    <p className="mt-2">
                      <span className="font-medium">Currency:</span> {selectedOrder.currency}
                    </p>
                  </div>
                </div>
                
                {/* Order Status */}
                <div>
                  <h3 className="text-lg font-medium mb-2">Order Status</h3>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="flex items-center justify-between">
                      <p><span className="font-medium">Current Status:</span></p>
                      <Select
                        value={selectedOrder.status}
                        onValueChange={(value: OrderStatus) => handleStatusChange(selectedOrder.id, value)}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="processing">Processing</SelectItem>
                          <SelectItem value="shipped">Shipped</SelectItem>
                          <SelectItem value="delivered">Delivered</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="mt-2">
                      <p><span className="font-medium">Order Date:</span> {selectedOrder.createdAt.toLocaleDateString()}</p>
                      <p>
                        <span className="font-medium">Last Updated:</span> {selectedOrder.updatedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Items */}
              <div>
                <h3 className="text-lg font-medium mb-2">Order Items</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <table className="w-full">
                    <thead className="text-xs uppercase text-gray-500">
                      <tr>
                        <th className="px-2 py-1 text-left">Product</th>
                        <th className="px-2 py-1 text-right">Price</th>
                        <th className="px-2 py-1 text-right">Quantity</th>
                        <th className="px-2 py-1 text-right">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {selectedOrder.items.map((item) => {
                        const productName = selectedOrder.language === 'en' 
                          ? item.product.nameEn 
                          : item.product.nameEs;
                        
                        return (
                          <tr key={item.product.id}>
                            <td className="px-2 py-2">
                              <div className="flex items-center">
                                <img 
                                  src={item.product.images[0]} 
                                  alt={productName} 
                                  className="h-10 w-10 rounded-md object-cover mr-2" 
                                />
                                <span>{productName}</span>
                              </div>
                            </td>
                            <td className="px-2 py-2 text-right">
                              {formatPrice(item.product.priceUSD)}
                            </td>
                            <td className="px-2 py-2 text-right">{item.quantity}</td>
                            <td className="px-2 py-2 text-right font-medium">
                              {formatPrice(item.product.priceUSD * item.quantity)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot className="text-sm">
                      <tr>
                        <td colSpan={3} className="px-2 py-1 text-right">Subtotal:</td>
                        <td className="px-2 py-1 text-right">{formatPrice(selectedOrder.subtotal)}</td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="px-2 py-1 text-right">Shipping:</td>
                        <td className="px-2 py-1 text-right">{formatPrice(selectedOrder.shipping)}</td>
                      </tr>
                      <tr>
                        <td colSpan={3} className="px-2 py-1 text-right">Tax:</td>
                        <td className="px-2 py-1 text-right">{formatPrice(selectedOrder.tax)}</td>
                      </tr>
                      <tr className="font-medium">
                        <td colSpan={3} className="px-2 py-1 text-right">Total:</td>
                        <td className="px-2 py-1 text-right">{formatPrice(selectedOrder.total)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrders;
