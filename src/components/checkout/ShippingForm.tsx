
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { ShippingInfo } from '@/data/orders';

interface ShippingFormProps {
  shippingInfo: ShippingInfo;
  handleShippingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errors: Record<string, string>;
}

const ShippingForm: React.FC<ShippingFormProps> = ({
  shippingInfo,
  handleShippingChange,
  errors
}) => {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-playfair font-medium text-aurora-dark mb-4">
        {t('checkout.shipping')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName">{t('checkout.firstName')}</Label>
          <Input
            id="firstName"
            name="firstName"
            value={shippingInfo.firstName}
            onChange={handleShippingChange}
            className={errors.firstName ? 'border-red-500' : ''}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="lastName">{t('checkout.lastName')}</Label>
          <Input
            id="lastName"
            name="lastName"
            value={shippingInfo.lastName}
            onChange={handleShippingChange}
            className={errors.lastName ? 'border-red-500' : ''}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="email">{t('checkout.email')}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={shippingInfo.email}
            onChange={handleShippingChange}
            className={errors.email ? 'border-red-500' : ''}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="phone">{t('checkout.phone')}</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={shippingInfo.phone}
            onChange={handleShippingChange}
            className={errors.phone ? 'border-red-500' : ''}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>
        
        <div className="md:col-span-2">
          <Label htmlFor="address">{t('checkout.address')}</Label>
          <Input
            id="address"
            name="address"
            value={shippingInfo.address}
            onChange={handleShippingChange}
            className={errors.address ? 'border-red-500' : ''}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="city">{t('checkout.city')}</Label>
          <Input
            id="city"
            name="city"
            value={shippingInfo.city}
            onChange={handleShippingChange}
            className={errors.city ? 'border-red-500' : ''}
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="state">{t('checkout.state')}</Label>
          <Input
            id="state"
            name="state"
            value={shippingInfo.state}
            onChange={handleShippingChange}
            className={errors.state ? 'border-red-500' : ''}
          />
          {errors.state && (
            <p className="text-red-500 text-sm mt-1">{errors.state}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="zip">{t('checkout.zip')}</Label>
          <Input
            id="zip"
            name="zip"
            value={shippingInfo.zip}
            onChange={handleShippingChange}
            className={errors.zip ? 'border-red-500' : ''}
          />
          {errors.zip && (
            <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
          )}
        </div>
        
        <div>
          <Label htmlFor="country">{t('checkout.country')}</Label>
          <Input
            id="country"
            name="country"
            value={shippingInfo.country}
            onChange={handleShippingChange}
            className={errors.country ? 'border-red-500' : ''}
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">{errors.country}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
