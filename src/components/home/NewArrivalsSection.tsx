
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getNewArrivals } from '@/data/products';
import ProductGrid from '@/components/products/ProductGrid';
import SectionContainer from '@/components/ui/section-container';

const NewArrivalsSection: React.FC = () => {
  const { t } = useLanguage();
  const newProducts = getNewArrivals(4);
  
  return (
    <SectionContainer
      title={t('home.newArrivals.title')}
      subtitle={t('home.newArrivals.subtitle')}
      className="bg-aurora-softgray"
    >
      <ProductGrid products={newProducts} columns={4} />
    </SectionContainer>
  );
};

export default NewArrivalsSection;
