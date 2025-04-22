
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/contexts/CurrencyContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language } = useLanguage();
  const { formatPrice } = useCurrency();
  
  // Get product name and description based on current language
  const productName = language === 'en' ? product.nameEn : product.nameEs;
  
  return (
    <div className="product-card overflow-hidden rounded-lg bg-white shadow">
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative h-64 overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={productName} 
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
          {product.stock <= 0 && (
            <div className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 text-xs font-medium uppercase">
              {language === 'en' ? 'Sold Out' : 'Agotado'}
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-aurora-dark truncate">{productName}</h3>
          <div className="mt-2 flex items-center justify-between">
            <p className="font-medium text-aurora-purple">
              {formatPrice(product.priceUSD)}
            </p>
            <div className="text-sm text-gray-500">
              {product.category}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
