
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SectionContainer from '@/components/ui/section-container';
import ProductGrid from '@/components/products/ProductGrid';
import { useLanguage } from '@/contexts/LanguageContext';
import { ProductCategory, products, getProductsByCategory } from '@/data/products';

const ShopPage: React.FC = () => {
  const { t } = useLanguage();
  const { categoryId } = useParams<{ categoryId?: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter products by category if provided
  const categoryProducts = categoryId 
    ? getProductsByCategory(categoryId as ProductCategory)
    : products;
    
  // Filter products by search term
  const filteredProducts = searchTerm 
    ? categoryProducts.filter(product => 
        product.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.nameEs.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : categoryProducts;
  
  // Get the category name for the title if applicable
  const categoryName = categoryId ? t(`category.${categoryId}`) : null;
  
  return (
    <Layout>
      <SectionContainer
        title={categoryName || t('nav.shop')}
      >
        {/* Search input */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder={t('nav.search')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-aurora-purple"
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        
        {/* Products */}
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} columns={4} />
        ) : (
          <div className="text-center py-8">
            <p className="text-lg text-gray-500">
              {t('No products found')}
            </p>
          </div>
        )}
      </SectionContainer>
    </Layout>
  );
};

export default ShopPage;
