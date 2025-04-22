
import React, { ReactNode } from 'react';

interface SectionContainerProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

const SectionContainer: React.FC<SectionContainerProps> = ({
  title,
  subtitle,
  children,
  className = ''
}) => {
  return (
    <section className={`py-12 ${className}`}>
      <div className="container mx-auto px-4">
        {(title || subtitle) && (
          <div className="mb-10 text-center">
            {title && (
              <h2 className="text-3xl md:text-4xl font-playfair font-medium text-aurora-dark mb-2">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-aurora-neutral max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};

export default SectionContainer;
