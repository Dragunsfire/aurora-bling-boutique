
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SectionContainer from '@/components/ui/section-container';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useAuth } from '@/contexts/AuthContext';
import { Order, getOrderById } from '@/data/orders';
import { CheckCircle } from 'lucide-react';

const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const { t, language } = useLanguage();
  const { formatPrice } = useCurrency();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [order, setOrder] = useState<Order | null>(null);
  
  // Check if user is authenticated and get order
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    if (orderId) {
      const foundOrder = getOrderById(orderId);
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        navigate('/');
      }
    }
  }, [orderId, isAuthenticated, navigate]);
  
  if (!order) {
    return (
      <Layout>
        <SectionContainer>
          <div className="text-center py-12">
            <p className="text-lg text-aurora-neutral">
              {language === 'en' ? 'Loading order information...' : 'Cargando información del pedido...'}
            </p>
          </div>
        </SectionContainer>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <SectionContainer>
        <div className="max-w-2xl mx-auto text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-playfair font-medium text-aurora-dark mb-2">
            {t('checkout.orderSuccess')}
          </h1>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-aurora-neutral">{t('checkout.orderNumber')}:</span>
            <span className="font-medium text-aurora-dark">{order.id}</span>
          </div>
          <p className="text-aurora-neutral">
            {t('checkout.orderConfirmation')}
          </p>
        </div>
        
        {/* Order Details */}
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 bg-aurora-softgray border-b">
            <h2 className="text-lg font-medium text-aurora-dark">
              {language === 'en' ? 'Order Details' : 'Detalles del Pedido'}
            </h2>
          </div>
          
          <div className="p-6">
            {/* Order Items */}
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-4">
                {language === 'en' ? 'Items' : 'Artículos'}
              </h3>
              
              <div className="divide-y border-t border-b">
                {order.items.map((item) => {
                  const productName = language === 'en' ? item.product.nameEn : item.product.nameEs;
                  return (
                    <div key={item.product.id} className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                          <img 
                            src={item.product.images[0]} 
                            alt={productName} 
                            className="h-full w-full object-cover object-center"
                          />
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-aurora-dark">{productName}</p>
                          <p className="text-sm text-aurora-neutral">
                            {item.quantity} x {formatPrice(item.product.priceUSD)}
                          </p>
                        </div>
                      </div>
                      <p className="font-medium text-aurora-neutral">
                        {formatPrice(item.product.priceUSD * item.quantity)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shipping Information */}
              <div>
                <h3 className="text-lg font-medium mb-4">
                  {language === 'en' ? 'Shipping Information' : 'Información de Envío'}
                </h3>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-medium">
                    {order.shippingInfo.firstName} {order.shippingInfo.lastName}
                  </p>
                  <p>{order.shippingInfo.address}</p>
                  <p>
                    {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zip}
                  </p>
                  <p>{order.shippingInfo.country}</p>
                  <p className="mt-2">{order.shippingInfo.email}</p>
                  <p>{order.shippingInfo.phone}</p>
                </div>
              </div>
              
              {/* Payment Information */}
              <div>
                <h3 className="text-lg font-medium mb-4">
                  {language === 'en' ? 'Payment Information' : 'Información de Pago'}
                </h3>
                
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="font-medium">
                    {language === 'en' ? 'Payment Method' : 'Método de Pago'}:
                    {' '}
                    {order.paymentInfo.method === 'creditCard' 
                      ? (language === 'en' ? 'Credit Card' : 'Tarjeta de Crédito')
                      : (language === 'en' ? 'Bank Transfer' : 'Transferencia Bancaria')}
                  </p>
                  
                  {order.paymentInfo.method === 'creditCard' && order.paymentInfo.cardNumber && (
                    <p>
                      {language === 'en' ? 'Card ending in' : 'Tarjeta terminada en'}{' '}
                      {order.paymentInfo.cardNumber.slice(-4)}
                    </p>
                  )}
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-aurora-neutral">{t('cart.subtotal')}</span>
                      <span>{formatPrice(order.subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-aurora-neutral">{t('cart.shipping')}</span>
                      <span>
                        {order.shipping === 0 
                          ? (language === 'en' ? 'Free' : 'Gratis') 
                          : formatPrice(order.shipping)}
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-aurora-neutral">{t('cart.tax')}</span>
                      <span>{formatPrice(order.tax)}</span>
                    </div>
                    
                    <div className="flex justify-between pt-2 mt-2 border-t font-medium">
                      <span>{t('cart.total')}</span>
                      <span className="text-aurora-purple">{formatPrice(order.total)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Continue Shopping Button */}
            <div className="mt-8 text-center">
              <Button asChild>
                <Link to="/">{t('checkout.continueShopping')}</Link>
              </Button>
            </div>
          </div>
        </div>
      </SectionContainer>
    </Layout>
  );
};

export default OrderConfirmationPage;
