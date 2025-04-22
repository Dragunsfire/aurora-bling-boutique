import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SectionContainer from '@/components/ui/section-container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { createOrder } from '@/data/orders';
import { ShippingInfo, PaymentInfo } from '@/data/orders';
import { PAYMENT_METHODS, PaymentMethodType } from '@/types/payment';
import { useToast } from '@/components/ui/use-toast';

const CheckoutPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { formatPrice, currency } = useCurrency();
  const { items, subtotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });
  
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    method: 'creditCard',
  });
  
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const { toast } = useToast();
  
  const shippingCost = subtotal > 100 ? 0 : 10; // Free shipping over $100
  const taxRate = 0.07; // 7% tax
  const taxAmount = subtotal * taxRate;
  const total = subtotal + shippingCost + taxAmount;
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { state: { redirect: '/checkout' } });
    } else if (items.length === 0) {
      navigate('/cart');
    }
  }, [isAuthenticated, items.length, navigate]);
  
  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPaymentInfo(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  const handleProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: language === 'en' ? 'Error' : 'Error',
          description: language === 'en' 
            ? 'Image size must be less than 5MB' 
            : 'El tamaño de la imagen debe ser menor a 5MB',
          variant: 'destructive'
        });
        return;
      }
      setPaymentProof(file);
    }
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!shippingInfo.firstName.trim()) {
      newErrors.firstName = language === 'en' ? 'First name is required' : 'El nombre es requerido';
    }
    
    if (!shippingInfo.lastName.trim()) {
      newErrors.lastName = language === 'en' ? 'Last name is required' : 'El apellido es requerido';
    }
    
    if (!shippingInfo.email.trim()) {
      newErrors.email = language === 'en' ? 'Email is required' : 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(shippingInfo.email)) {
      newErrors.email = language === 'en' ? 'Invalid email format' : 'Formato de correo electrónico inválido';
    }
    
    if (!shippingInfo.phone.trim()) {
      newErrors.phone = language === 'en' ? 'Phone number is required' : 'El número de teléfono es requerido';
    }
    
    if (!shippingInfo.address.trim()) {
      newErrors.address = language === 'en' ? 'Address is required' : 'La dirección es requerida';
    }
    
    if (!shippingInfo.city.trim()) {
      newErrors.city = language === 'en' ? 'City is required' : 'La ciudad es requerida';
    }
    
    if (!shippingInfo.state.trim()) {
      newErrors.state = language === 'en' ? 'State is required' : 'El estado es requerido';
    }
    
    if (!shippingInfo.zip.trim()) {
      newErrors.zip = language === 'en' ? 'ZIP code is required' : 'El código postal es requerido';
    }
    
    if (!shippingInfo.country.trim()) {
      newErrors.country = language === 'en' ? 'Country is required' : 'El país es requerido';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validatePaymentInfo = (): boolean => {
    const selectedMethod = PAYMENT_METHODS.find(m => m.type === paymentInfo.method);
    if (!selectedMethod) return false;
    
    const newErrors: Record<string, string> = {};
    
    if (selectedMethod.requiresProof && !paymentProof) {
      newErrors.paymentProof = language === 'en' 
        ? 'Payment proof is required' 
        : 'Se requiere comprobante de pago';
    }
    
    if (paymentInfo.method === 'creditCard') {
      if (!paymentInfo.cardName?.trim()) {
        newErrors.cardName = language === 'en' ? 'Card name is required' : 'El nombre en la tarjeta es requerido';
      }
      
      if (!paymentInfo.cardNumber?.trim()) {
        newErrors.cardNumber = language === 'en' ? 'Card number is required' : 'El número de tarjeta es requerido';
      } else if (!/^\d{16}$/.test(paymentInfo.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = language === 'en' ? 'Invalid card number' : 'Número de tarjeta inválido';
      }
      
      if (!paymentInfo.expiration?.trim()) {
        newErrors.expiration = language === 'en' ? 'Expiration date is required' : 'La fecha de vencimiento es requerida';
      } else if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiration)) {
        newErrors.expiration = language === 'en' ? 'Invalid format (MM/YY)' : 'Formato inválido (MM/AA)';
      }
      
      if (!paymentInfo.cvv?.trim()) {
        newErrors.cvv = language === 'en' ? 'CVV is required' : 'El CVV es requerido';
      } else if (!/^\d{3,4}$/.test(paymentInfo.cvv)) {
        newErrors.cvv = language === 'en' ? 'Invalid CVV' : 'CVV inválido';
      }
    }
    
    setErrors(prev => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !validatePaymentInfo()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let proofImageUrl;
      if (paymentProof) {
        proofImageUrl = URL.createObjectURL(paymentProof);
      }
      
      const finalPaymentInfo: PaymentInfo = {
        ...paymentInfo,
        proofImageUrl
      };
      
      if (user) {
        const order = createOrder(
          user,
          items,
          shippingInfo,
          finalPaymentInfo,
          currency,
          subtotal,
          shippingCost,
          taxAmount,
          total,
          language
        );
        
        clearCart();
        
        navigate(`/order-confirmation/${order.id}`);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: language === 'en' ? 'Error' : 'Error',
        description: language === 'en' 
          ? 'There was an error processing your order' 
          : 'Hubo un error procesando su orden',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const currentPaymentMethod = PAYMENT_METHODS.find(m => m.type === paymentInfo.method);
  
  return (
    <Layout>
      <SectionContainer title={t('checkout.title')}>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-2 space-y-8">
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
            
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-playfair font-medium text-aurora-dark mb-4">
                {t('checkout.payment')}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="method">
                    {language === 'en' ? 'Payment Method' : 'Método de Pago'}
                  </Label>
                  <select
                    id="method"
                    name="method"
                    value={paymentInfo.method}
                    onChange={handlePaymentChange}
                    className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aurora-purple"
                  >
                    {PAYMENT_METHODS.map(method => (
                      <option key={method.type} value={method.type}>
                        {language === 'en' ? method.nameEn : method.nameEs}
                      </option>
                    ))}
                  </select>
                </div>
                
                {currentPaymentMethod && (
                  <div className="bg-gray-50 p-4 rounded-md space-y-4">
                    <p className="text-aurora-neutral">
                      {language === 'en' 
                        ? currentPaymentMethod.instructionsEn 
                        : currentPaymentMethod.instructionsEs}
                    </p>
                    
                    {currentPaymentMethod.accountInfo && (
                      <div className="bg-white p-3 rounded border">
                        <pre className="text-sm">{currentPaymentMethod.accountInfo}</pre>
                      </div>
                    )}
                    
                    {currentPaymentMethod.type === 'creditCard' && (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="cardName">{t('checkout.cardName')}</Label>
                          <Input
                            id="cardName"
                            name="cardName"
                            value={paymentInfo.cardName}
                            onChange={handlePaymentChange}
                            className={errors.cardName ? 'border-red-500' : ''}
                          />
                          {errors.cardName && (
                            <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="cardNumber">{t('checkout.cardNumber')}</Label>
                          <Input
                            id="cardNumber"
                            name="cardNumber"
                            value={paymentInfo.cardNumber}
                            onChange={handlePaymentChange}
                            placeholder="**** **** **** ****"
                            className={errors.cardNumber ? 'border-red-500' : ''}
                          />
                          {errors.cardNumber && (
                            <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>
                          )}
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="expiration">{t('checkout.expiration')}</Label>
                            <Input
                              id="expiration"
                              name="expiration"
                              value={paymentInfo.expiration}
                              onChange={handlePaymentChange}
                              placeholder="MM/YY"
                              className={errors.expiration ? 'border-red-500' : ''}
                            />
                            {errors.expiration && (
                              <p className="text-red-500 text-sm mt-1">{errors.expiration}</p>
                            )}
                          </div>
                          
                          <div>
                            <Label htmlFor="cvv">{t('checkout.cvv')}</Label>
                            <Input
                              id="cvv"
                              name="cvv"
                              value={paymentInfo.cvv}
                              onChange={handlePaymentChange}
                              className={errors.cvv ? 'border-red-500' : ''}
                            />
                            {errors.cvv && (
                              <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {currentPaymentMethod.requiresProof && (
                      <div>
                        <Label htmlFor="paymentProof">
                          {language === 'en' ? 'Upload Payment Proof' : 'Subir Comprobante de Pago'}
                        </Label>
                        <Input
                          id="paymentProof"
                          type="file"
                          accept="image/*"
                          onChange={handleProofUpload}
                          className={errors.paymentProof ? 'border-red-500' : ''}
                        />
                        {errors.paymentProof && (
                          <p className="text-red-500 text-sm mt-1">{errors.paymentProof}</p>
                        )}
                        {paymentProof && (
                          <div className="mt-2">
                            <img
                              src={URL.createObjectURL(paymentProof)}
                              alt="Payment proof"
                              className="max-h-32 rounded-md"
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div>
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
          </div>
        </form>
      </SectionContainer>
    </Layout>
  );
};

export default CheckoutPage;
