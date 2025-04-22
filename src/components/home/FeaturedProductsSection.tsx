
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getFeaturedProducts } from '@/data/products';
import ProductGrid from '@/components/products/ProductGrid';
import SectionContainer from '@/components/ui/section-container';

const FeaturedProductsSection: React.FC = () => {
  const { t } = useLanguage();
  const featuredProducts = getFeaturedProducts(4);
  
  return (
    <SectionContainer
      title={t('home.featured.title')}
      subtitle={t('home.featured.subtitle')}
    >
      <ProductGrid products={featuredProducts} columns={4} />
    </SectionContainer>
  );
};

export default FeaturedProductsSection;
