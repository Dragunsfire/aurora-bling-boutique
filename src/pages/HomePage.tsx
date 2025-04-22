
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroBanner from '@/components/home/HeroBanner';
import CategoriesSection from '@/components/home/CategoriesSection';
import NewArrivalsSection from '@/components/home/NewArrivalsSection';
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <HeroBanner />
      <CategoriesSection />
      <NewArrivalsSection />
      <FeaturedProductsSection />
    </Layout>
  );
};

export default HomePage;
