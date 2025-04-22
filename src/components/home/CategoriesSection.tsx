
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { getAllCategories } from '@/data/products';
import SectionContainer from '@/components/ui/section-container';

const CategoriesSection: React.FC = () => {
  const { t } = useLanguage();
  const categories = getAllCategories();
  
  return (
    <SectionContainer
      title={t('home.categories.title')}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/shop/category/${category.id}`}
            className="group"
          >
            <div className="overflow-hidden rounded-lg shadow-md aspect-square">
              <div
                className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{ backgroundImage: `url(${category.imageUrl})` }}
              >
                <div className="flex items-end justify-center h-full bg-gradient-to-t from-black/50 to-transparent p-4">
                  <h3 className="text-white font-medium text-center font-playfair">
                    {t(`category.${category.id}`)}
                  </h3>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </SectionContainer>
  );
};

export default CategoriesSection;
