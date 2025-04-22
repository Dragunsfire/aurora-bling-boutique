
import React from 'react';
import Layout from '@/components/layout/Layout';
import SectionContainer from '@/components/ui/section-container';
import { useLanguage } from '@/contexts/LanguageContext';
import ShippingForm from '@/components/checkout/ShippingForm';
import PaymentMethodForm from '@/components/checkout/PaymentMethodForm';
import OrderSummary from '@/components/checkout/OrderSummary';
import { useCheckout } from '@/components/checkout/useCheckout';
import { PAYMENT_METHODS } from '@/types/payment';

const CheckoutPage: React.FC = () => {
  const { t, language } = useLanguage();
  const {
    shippingInfo,
    paymentInfo,
    errors,
    isSubmitting,
    paymentProof,
    items,
    subtotal,
    shippingCost,
    taxAmount,
    total,
    handleShippingChange,
    handlePaymentChange,
    handlePaymentMethodChange,
    handleProofUpload,
    handleSubmit
  } = useCheckout();

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
