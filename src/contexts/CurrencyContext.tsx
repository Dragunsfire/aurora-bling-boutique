
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define available currencies
export type Currency = 'USD' | 'VES';

// Define currency symbols
export const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  VES: 'Bs.'
};

// Define exchange rate (fixed for now)
// 1 USD = X VES
const EXCHANGE_RATE = 38.5;

// Define context type
interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatPrice: (priceUSD: number) => string;
  convertPrice: (priceUSD: number) => number;
  currencySymbol: string;
}

// Create context with default values
const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'USD',
  setCurrency: () => {},
  formatPrice: (price: number) => `$${price.toFixed(2)}`,
  convertPrice: (price: number) => price,
  currencySymbol: '$'
});

// Provider component
export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currency, setCurrency] = useState<Currency>('USD');

  // Convert price from USD to selected currency
  const convertPrice = (priceUSD: number): number => {
    if (currency === 'USD') return priceUSD;
    return priceUSD * EXCHANGE_RATE;
  };

  // Format price with currency symbol and proper decimals
  const formatPrice = (priceUSD: number): string => {
    const convertedPrice = convertPrice(priceUSD);
    const symbol = CURRENCY_SYMBOLS[currency];
    
    // Format differently based on currency
    if (currency === 'USD') {
      return `${symbol}${convertedPrice.toFixed(2)}`;
    } else {
      // VES typically doesn't show decimals
      return `${symbol} ${Math.round(convertedPrice).toLocaleString()}`;
    }
  };

  return (
    <CurrencyContext.Provider 
      value={{ 
        currency, 
        setCurrency, 
        formatPrice, 
        convertPrice,
        currencySymbol: CURRENCY_SYMBOLS[currency]
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

// Custom hook for using the currency context
export const useCurrency = (): CurrencyContextType => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};
