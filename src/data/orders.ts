import { CartItem } from '../contexts/CartContext';
import { Currency } from '../contexts/CurrencyContext';
import { User } from '../contexts/AuthContext';

// Define order status
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

// Define shipping info
export interface ShippingInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

// Define payment info
export interface PaymentInfo {
  method: PaymentMethodType;
  cardNumber?: string;
  cardName?: string;
  expiration?: string;
  cvv?: string;
  proofImageUrl?: string;
}

// Define order type
export interface Order {
  id: string;
  user: User;
  items: CartItem[];
  shippingInfo: ShippingInfo;
  paymentInfo: PaymentInfo;
  status: OrderStatus;
  currency: Currency;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
  language: 'en' | 'es';
}

// Mock orders data
let orders: Order[] = [];

// Helper functions
export const createOrder = (
  user: User, 
  items: CartItem[], 
  shippingInfo: ShippingInfo, 
  paymentInfo: PaymentInfo,
  currency: Currency,
  subtotal: number,
  shipping: number,
  tax: number,
  total: number,
  language: 'en' | 'es'
): Order => {
  const now = new Date();
  const newOrder: Order = {
    id: `order-${Date.now()}`,
    user,
    items,
    shippingInfo,
    paymentInfo,
    status: 'pending',
    currency,
    subtotal,
    shipping,
    tax,
    total,
    createdAt: now,
    updatedAt: now,
    language
  };
  
  orders.push(newOrder);
  return newOrder;
};

export const getOrderById = (id: string): Order | undefined => {
  return orders.find(order => order.id === id);
};

export const getAllOrders = (): Order[] => {
  return [...orders].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const getUserOrders = (userId: string): Order[] => {
  return orders
    .filter(order => order.user.id === userId)
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

export const updateOrderStatus = (orderId: string, status: OrderStatus): Order | undefined => {
  const orderIndex = orders.findIndex(order => order.id === orderId);
  if (orderIndex >= 0) {
    orders[orderIndex] = { 
      ...orders[orderIndex], 
      status, 
      updatedAt: new Date() 
    };
    return orders[orderIndex];
  }
  return undefined;
};

// Generate sales report
export interface SalesReport {
  period: 'daily' | 'weekly' | 'monthly';
  totalSales: number;
  salesByStatus: Record<OrderStatus, number>;
  salesByCurrency: Record<Currency, number>;
  orderCount: number;
  averageOrderValue: number;
}

export const generateSalesReport = (period: 'daily' | 'weekly' | 'monthly'): SalesReport => {
  const now = new Date();
  let cutoffDate: Date;
  
  switch (period) {
    case 'daily':
      cutoffDate = new Date(now.setDate(now.getDate() - 1));
      break;
    case 'weekly':
      cutoffDate = new Date(now.setDate(now.getDate() - 7));
      break;
    case 'monthly':
      cutoffDate = new Date(now.setMonth(now.getMonth() - 1));
      break;
  }
  
  const filteredOrders = orders.filter(order => order.createdAt >= cutoffDate);
  
  // Calculate sales by status
  const salesByStatus: Record<OrderStatus, number> = {
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0
  };
  
  // Calculate sales by currency
  const salesByCurrency: Record<Currency, number> = {
    USD: 0,
    VES: 0
  };
  
  // Calculate total sales
  let totalSales = 0;
  
  filteredOrders.forEach(order => {
    salesByStatus[order.status] += order.total;
    salesByCurrency[order.currency] += order.total;
    totalSales += order.total;
  });
  
  return {
    period,
    totalSales,
    salesByStatus,
    salesByCurrency,
    orderCount: filteredOrders.length,
    averageOrderValue: filteredOrders.length > 0 ? totalSales / filteredOrders.length : 0
  };
};
