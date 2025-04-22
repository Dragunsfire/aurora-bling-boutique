
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SectionContainer from '@/components/ui/section-container';
import ProductGrid from '@/components/products/ProductGrid';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useCart } from '@/contexts/CartContext';
import { getProductById, getRelatedProducts } from '@/data/products';

const ProductPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { formatPrice } = useCurrency();
  const { addItem } = useCart();
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Get product details
  const product = productId ? getProductById(productId) : undefined;
  
  // Get related products
  const relatedProducts = product ? getRelatedProducts(product, 4) : [];
  
  // Handle add to cart
  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };
  
  // Handle quantity change
  const handleQuantityChange = (value: number) => {
    if (value >= 1 && value <= (product?.stock || 1)) {
      setQuantity(value);
    }
  };
  
  // Handle image navigation
  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
  };
  
  // If product not found
  if (!product) {
    return (
      <Layout>
        <SectionContainer>
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium mb-4">
              {language === 'en' ? 'Product Not Found' : 'Producto No Encontrado'}
            </h2>
            <p className="mb-6">
              {language === 'en' 
                ? 'The product you are looking for does not exist or has been removed.' 
                : 'El producto que estás buscando no existe o ha sido eliminado.'}
            </p>
            <Button onClick={() => navigate('/shop')}>
              {language === 'en' ? 'Back to Shop' : 'Volver a la Tienda'}
            </Button>
          </div>
        </SectionContainer>
      </Layout>
    );
  }
  
  // Get product name and description based on current language
  const productName = language === 'en' ? product.nameEn : product.nameEs;
  const productDescription = language === 'en' ? product.descriptionEn : product.descriptionEs;
  
  return (
    <Layout>
      <SectionContainer>
        {/* Product Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Images */}
          <div>
            <div className="mb-4 overflow-hidden rounded-lg h-[400px] md:h-[500px] bg-gray-100">
              <img 
                src={product.images[currentImageIndex]} 
                alt={productName} 
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageClick(index)}
                    className={`rounded-md overflow-hidden h-20 w-20 border-2 transition ${
                      index === currentImageIndex 
                        ? 'border-aurora-purple' 
                        : 'border-transparent'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${productName} thumbnail ${index + 1}`} 
                      className="w-full h-full object-cover object-center"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Information */}
          <div>
            <h1 className="text-3xl font-playfair font-medium text-aurora-dark mb-2">
              {productName}
            </h1>
            
            <div className="text-2xl font-medium text-aurora-purple mb-4">
              {formatPrice(product.priceUSD)}
            </div>
            
            <div className="mb-6">
              <p className="text-aurora-neutral">
                {productDescription}
              </p>
            </div>
            
            {/* Availability */}
            <div className="mb-6">
              <div className="flex items-center">
                <span className="font-medium mr-2">{t('product.availability')}:</span>
                {product.stock > 0 ? (
                  <span className="text-green-600">
                    {t('product.inStock')} ({product.stock})
                  </span>
                ) : (
                  <span className="text-red-600">{t('product.outOfStock')}</span>
                )}
              </div>
            </div>
            
            {/* Quantity and Add to Cart */}
            {product.stock > 0 && (
              <div className="mb-8">
                <div className="mb-4">
                  <label className="block font-medium mb-2">{t('product.quantity')}</label>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= product.stock}
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <Button
                  className="w-full bg-aurora-purple hover:bg-aurora-darkpurple text-white"
                  onClick={handleAddToCart}
                >
                  {t('product.addToCart')}
                </Button>
              </div>
            )}
            
            {/* Shipping Information */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-medium mb-2">{t('product.shipping')}</h3>
              <p className="text-aurora-neutral">{t('product.shippingInfo')}</p>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-playfair font-medium text-aurora-dark mb-6 text-center">
              {t('product.relatedProducts')}
            </h2>
            <ProductGrid products={relatedProducts} columns={4} />
          </div>
        )}
      </SectionContainer>
    </Layout>
  );
};

export default ProductPage;
