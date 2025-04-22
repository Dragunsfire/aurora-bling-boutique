
import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

const HeroBanner: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="relative h-[70vh] min-h-[400px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1800)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 hero-gradient"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 h-full flex items-center">
        <div className="max-w-xl text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-playfair mb-4 animate-fade-in">
            {t('home.hero.title')}
          </h1>
          <p className="text-lg md:text-xl mb-8 animate-fade-in">
            {t('home.hero.subtitle')}
          </p>
          <Button 
            asChild
            size="lg" 
            className="bg-white text-aurora-darkpurple hover:bg-aurora-lightpurple animate-fade-in"
          >
            <Link to="/shop">
              {t('home.hero.cta')}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
