
export type PaymentMethodType = 
  | 'creditCard'
  | 'bankTransfer'
  | 'crypto'
  | 'zelle'
  | 'pagoMovil'
  | 'bolivaresCash'
  | 'usdCash'
  | 'bolivaresTransfer'
  | 'binance';

export interface PaymentProof {
  id: string;
  orderId: string;
  imageUrl: string;
  uploadedAt: Date;
}

export interface PaymentMethodInfo {
  type: PaymentMethodType;
  nameEn: string;
  nameEs: string;
  instructionsEn: string;
  instructionsEs: string;
  accountInfo?: string;
  requiresProof: boolean;
}

export const PAYMENT_METHODS: PaymentMethodInfo[] = [
  {
    type: 'creditCard',
    nameEn: 'Credit Card',
    nameEs: 'Tarjeta de Crédito',
    instructionsEn: 'Pay securely with your credit card',
    instructionsEs: 'Pague de forma segura con su tarjeta de crédito',
    requiresProof: false
  },
  {
    type: 'zelle',
    nameEn: 'Zelle',
    nameEs: 'Zelle',
    instructionsEn: 'Send payment to email@store.com via Zelle. Upload the payment confirmation screenshot.',
    instructionsEs: 'Envíe el pago a email@store.com vía Zelle. Suba la captura de pantalla de confirmación del pago.',
    accountInfo: 'email@store.com',
    requiresProof: true
  },
  {
    type: 'pagoMovil',
    nameEn: 'Pago Móvil',
    nameEs: 'Pago Móvil',
    instructionsEn: 'Send payment through Pago Móvil to our account. Upload the confirmation screenshot.',
    instructionsEs: 'Envíe el pago a través de Pago Móvil a nuestra cuenta. Suba la captura de pantalla de confirmación.',
    accountInfo: 'Banco: XXX\nCédula: V-12345678\nTeléfono: 0412-1234567',
    requiresProof: true
  },
  {
    type: 'binance',
    nameEn: 'Binance',
    nameEs: 'Binance',
    instructionsEn: 'Send USDT to our Binance account. Upload the transaction screenshot.',
    instructionsEs: 'Envíe USDT a nuestra cuenta de Binance. Suba la captura de pantalla de la transacción.',
    accountInfo: 'Binance Pay ID: 123456789',
    requiresProof: true
  },
  {
    type: 'crypto',
    nameEn: 'Cryptocurrency',
    nameEs: 'Criptomoneda',
    instructionsEn: 'Send USDT to our wallet address. Upload the transaction confirmation.',
    instructionsEs: 'Envíe USDT a nuestra dirección de wallet. Suba la confirmación de la transacción.',
    accountInfo: 'USDT-TRC20: TWxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    requiresProof: true
  },
  {
    type: 'bolivaresTransfer',
    nameEn: 'Bolívares Bank Transfer',
    nameEs: 'Transferencia en Bolívares',
    instructionsEn: 'Transfer to our bank account and upload the payment confirmation.',
    instructionsEs: 'Transfiera a nuestra cuenta bancaria y suba la confirmación del pago.',
    accountInfo: 'Banco XXX\nCuenta: 0000-0000-00-0000000000\nRIF: J-000000000',
    requiresProof: true
  },
  {
    type: 'usdCash',
    nameEn: 'USD Cash (In-store)',
    nameEs: 'Efectivo USD (En tienda)',
    instructionsEn: 'Pay in cash at our physical store.',
    instructionsEs: 'Pague en efectivo en nuestra tienda física.',
    requiresProof: false
  },
  {
    type: 'bolivaresCash',
    nameEn: 'Bolívares Cash (In-store)',
    nameEs: 'Efectivo Bs. (En tienda)',
    instructionsEn: 'Pay in Bolívares cash at our physical store.',
    instructionsEs: 'Pague en efectivo en Bolívares en nuestra tienda física.',
    requiresProof: false
  }
];
