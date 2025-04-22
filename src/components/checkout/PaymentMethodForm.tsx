
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PaymentMethodInfo, PaymentMethodType } from '@/types/payment';

interface PaymentMethodFormProps {
  paymentMethod: PaymentMethodInfo;
  paymentInfo: {
    method: PaymentMethodType;
    cardNumber?: string;
    cardName?: string;
    expiration?: string;
    cvv?: string;
  };
  handlePaymentChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleProofUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  paymentProof: File | null;
  errors: Record<string, string>;
  language: 'en' | 'es';
}

const PaymentMethodForm: React.FC<PaymentMethodFormProps> = ({
  paymentMethod,
  paymentInfo,
  handlePaymentChange,
  handleProofUpload,
  paymentProof,
  errors,
  language
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-md space-y-4">
      <p className="text-aurora-neutral">
        {language === 'en' 
          ? paymentMethod.instructionsEn 
          : paymentMethod.instructionsEs}
      </p>
      
      {paymentMethod.accountInfo && (
        <div className="bg-white p-3 rounded border">
          <pre className="text-sm">{paymentMethod.accountInfo}</pre>
        </div>
      )}
      
      {paymentMethod.type === 'creditCard' && (
        <div className="space-y-4">
          <div>
            <Label htmlFor="cardName">
              {language === 'en' ? 'Name on Card' : 'Nombre en la Tarjeta'}
            </Label>
            <Input
              id="cardName"
              name="cardName"
              value={paymentInfo.cardName || ''}
              onChange={handlePaymentChange}
              className={errors.cardName ? 'border-red-500' : ''}
            />
            {errors.cardName && (
              <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="cardNumber">
              {language === 'en' ? 'Card Number' : 'Número de Tarjeta'}
            </Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              value={paymentInfo.cardNumber || ''}
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
              <Label htmlFor="expiration">
                {language === 'en' ? 'Expiration (MM/YY)' : 'Vencimiento (MM/AA)'}
              </Label>
              <Input
                id="expiration"
                name="expiration"
                value={paymentInfo.expiration || ''}
                onChange={handlePaymentChange}
                placeholder="MM/YY"
                className={errors.expiration ? 'border-red-500' : ''}
              />
              {errors.expiration && (
                <p className="text-red-500 text-sm mt-1">{errors.expiration}</p>
              )}
            </div>
            
            <div>
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                name="cvv"
                value={paymentInfo.cvv || ''}
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
      
      {paymentMethod.requiresProof && (
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
  );
};

export default PaymentMethodForm;
