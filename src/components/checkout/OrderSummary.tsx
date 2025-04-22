
import React from 'react';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useLanguage } from '@/contexts/LanguageContext';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  total: number;
  isSubmitting: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({
  items,
  subtotal,
  shippingCost,
  taxAmount,
  total,
  isSubmitting
}) => {
  const { formatPrice } = useCurrency();
  const { t, language } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow p-6 sticky top-28">
      <h2 className="text-lg font-playfair font-medium text-aurora-dark mb-4">
        {t('checkout.review')}
      </h2>
      
      <div className="divide-y">
        {items.map((item) => {
          const productName = language === 'en' ? item.product.nameEn : item.product.nameEs;
          return (
            <div key={item.product.id} className="py-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md">
                  <img 
                    src={item.product.images[0]} 
                    alt={productName} 
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-aurora-dark">{productName}</p>
                  <p className="text-xs text-aurora-neutral">
                    {item.quantity} x {formatPrice(item.product.priceUSD)}
                  </p>
                </div>
              </div>
              <p className="text-sm font-medium text-aurora-neutral">
                {formatPrice(item.product.priceUSD * item.quantity)}
              </p>
            </div>
          );
        })}
      </div>
      
      <div className="space-y-2 pt-4 mt-4 border-t">
        <div className="flex justify-between">
          <span className="text-aurora-neutral">{t('cart.subtotal')}</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-aurora-neutral">{t('cart.shipping')}</span>
          <span>
            {shippingCost === 0 
              ? (language === 'en' ? 'Free' : 'Gratis') 
              : formatPrice(shippingCost)}
          </span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-aurora-neutral">{t('cart.tax')}</span>
          <span>{formatPrice(taxAmount)}</span>
        </div>
        
        <div className="flex justify-between pt-2 mt-2 border-t font-medium text-lg">
          <span>{t('cart.total')}</span>
          <span className="text-aurora-purple">{formatPrice(total)}</span>
        </div>
      </div>
      
      <Button
        type="submit"
        className="w-full mt-6 bg-aurora-purple hover:bg-aurora-darkpurple text-white"
        disabled={isSubmitting}
      >
        {isSubmitting 
          ? (language === 'en' ? 'Processing...' : 'Procesando...') 
          : t('checkout.placeOrder')}
      </Button>
    </div>
  );
};

export default OrderSummary;
