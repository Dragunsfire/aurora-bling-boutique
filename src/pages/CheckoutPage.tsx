import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SectionContainer from '@/components/ui/section-container';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { createOrder } from '@/data/orders';
import { ShippingInfo, PaymentInfo } from '@/data/orders';
import { useToast } from '@/hooks/use-toast';
import ShippingForm from '@/components/checkout/ShippingForm';
import PaymentMethodForm from '@/components/checkout/PaymentMethodForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import { PAYMENT_METHODS, PaymentMethodType } from '@/types/payment';

const CheckoutPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { currency } = useCurrency();
  const { items, subtotal, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
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
  
  const shippingCost = subtotal > 100 ? 0 : 10;
  const taxRate = 0.07;
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
  
  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handlePaymentMethodChange = (value: PaymentMethodType) => {
    setPaymentInfo(prev => ({ ...prev, method: value }));
    if (errors.paymentProof) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.paymentProof;
        return newErrors;
      });
    }
    setPaymentProof(null);
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
  
  const currentPaymentMethod = PAYMENT_METHODS.find(m => m.type === paymentInfo.method) || PAYMENT_METHODS[0];
  
  return (
    <Layout>
      <SectionContainer title={t('checkout.title')}>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-2 space-y-8">
            <ShippingForm
              shippingInfo={shippingInfo}
              handleShippingChange={handleShippingChange}
              errors={errors}
            />
            
            <PaymentMethodForm
              paymentMethod={currentPaymentMethod}
              paymentInfo={paymentInfo}
              handlePaymentChange={handlePaymentChange}
              handlePaymentMethodChange={handlePaymentMethodChange}
              handleProofUpload={handleProofUpload}
              paymentProof={paymentProof}
              errors={errors}
              language={language}
            />
          </div>
          
          <div>
            <OrderSummary
              items={items}
              subtotal={subtotal}
              shippingCost={shippingCost}
              taxAmount={taxAmount}
              total={total}
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </SectionContainer>
    </Layout>
  );
};

export default CheckoutPage;
