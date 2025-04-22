
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SectionContainer from '@/components/ui/section-container';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency, Currency } from '@/contexts/CurrencyContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { ShoppingCart, Trash } from 'lucide-react';

const CartPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { formatPrice, currency, convertPrice } = useCurrency();
  const { items, removeItem, updateQuantity, subtotal, itemCount } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Calculate additional costs
  const shippingCost = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const taxRate = 0.07; // 7% tax
  const taxAmount = subtotal * taxRate;
  const total = subtotal + shippingCost + taxAmount;
  
  // Handle checkout button click
  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { redirect: '/checkout' } });
    }
  };
  
  return (
    <Layout>
      <SectionContainer title={t('cart.title')}>
        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'en' ? 'Product' : 'Producto'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'en' ? 'Price' : 'Precio'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'en' ? 'Quantity' : 'Cantidad'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {language === 'en' ? 'Total' : 'Total'}
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {/* Actions column */}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {items.map((item) => {
                      const productName = language === 'en' ? item.product.nameEn : item.product.nameEs;
                      const itemTotal = item.product.priceUSD * item.quantity;
                      
                      return (
                        <tr key={item.product.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                                <img
                                  src={item.product.images[0]}
                                  alt={productName}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>
                              <div className="ml-4">
                                <Link
                                  to={`/product/${item.product.id}`}
                                  className="font-medium text-aurora-dark hover:text-aurora-purple"
                                >
                                  {productName}
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {formatPrice(item.product.priceUSD)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="h-8 w-8 p-0"
                              >
                                -
                              </Button>
                              <span className="w-10 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                disabled={item.quantity >= item.product.stock}
                                className="h-8 w-8 p-0"
                              >
                                +
                              </Button>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap font-medium">
                            {formatPrice(itemTotal)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeItem(item.product.id)}
                              className="text-gray-400 hover:text-red-500"
                            >
                              <Trash className="h-5 w-5" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              {/* Continue Shopping */}
              <div className="mt-6">
                <Button variant="outline" asChild>
                  <Link to="/shop">{t('cart.continue')}</Link>
                </Button>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-playfair font-medium text-aurora-dark mb-4">
                  {language === 'en' ? 'Order Summary' : 'Resumen del Pedido'}
                </h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-aurora-neutral">
                      {t('cart.subtotal')} ({itemCount} {itemCount === 1 ? (language === 'en' ? 'item' : 'artículo') : (language === 'en' ? 'items' : 'artículos')})
                    </span>
                    <span className="font-medium">{formatPrice(subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-aurora-neutral">{t('cart.shipping')}</span>
                    <span className="font-medium">
                      {shippingCost === 0 
                        ? (language === 'en' ? 'Free' : 'Gratis') 
                        : formatPrice(shippingCost)}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-aurora-neutral">{t('cart.tax')} (7%)</span>
                    <span className="font-medium">{formatPrice(taxAmount)}</span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-3 mt-3">
                    <div className="flex justify-between font-medium text-lg">
                      <span>{t('cart.total')}</span>
                      <span className="text-aurora-purple">{formatPrice(total)}</span>
                    </div>
                    
                    <div className="text-right text-sm text-gray-500 mt-1">
                      {language === 'en' ? 'Including' : 'Incluyendo'} {taxRate * 100}% {language === 'en' ? 'tax' : 'de impuesto'}
                    </div>
                  </div>
                </div>
                
                <Button
                  className="w-full bg-aurora-purple hover:bg-aurora-darkpurple text-white"
                  onClick={handleCheckout}
                >
                  {t('cart.checkout')}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <ShoppingCart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <h2 className="text-xl font-medium mb-2">{t('cart.empty')}</h2>
            <p className="text-aurora-neutral mb-6">
              {language === 'en' 
                ? 'Your cart is empty. Add some products to continue shopping.' 
                : 'Tu carrito está vacío. Agrega algunos productos para continuar comprando.'}
            </p>
            <Button asChild>
              <Link to="/shop">{t('cart.continue')}</Link>
            </Button>
          </div>
        )}
      </SectionContainer>
    </Layout>
  );
};

export default CartPage;
