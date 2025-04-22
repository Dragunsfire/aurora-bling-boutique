
import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-aurora-softgray pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-playfair text-xl mb-4 text-aurora-dark">{t('footer.about')}</h3>
            <p className="text-aurora-neutral mb-4">{t('footer.aboutText')}</p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="text-aurora-neutral hover:text-aurora-purple transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="text-aurora-neutral hover:text-aurora-purple transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="https://pinterest.com" aria-label="Pinterest" target="_blank" rel="noopener noreferrer" className="text-aurora-neutral hover:text-aurora-purple transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path><path d="M21 12c0 4.418 -3.582 8 -8 8c-1.5 0 -2.897 -.372 -4.127 -1.025l-4.873 1.025l1.025 -4.873a8.001 8.001 0 0 1 -1.025 -4.127c0 -4.418 3.582 -8 8 -8s8 3.582 8 8z"></path></svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-xl mb-4 text-aurora-dark">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-aurora-neutral hover:text-aurora-purple transition-colors">
                  {t('nav.shop')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-aurora-neutral hover:text-aurora-purple transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-aurora-neutral hover:text-aurora-purple transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-aurora-neutral hover:text-aurora-purple transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-aurora-neutral hover:text-aurora-purple transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="font-playfair text-xl mb-4 text-aurora-dark">{t('footer.contact')}</h3>
            <address className="not-italic">
              <p className="text-aurora-neutral mb-2">{t('footer.address')}</p>
              <p className="text-aurora-neutral mb-2">{t('footer.phone')}</p>
              <p className="text-aurora-neutral mb-2">{t('footer.email')}</p>
            </address>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="font-playfair text-xl mb-4 text-aurora-dark">{t('footer.subscribe')}</h3>
            <form className="space-y-2">
              <Input 
                type="email" 
                placeholder="Email" 
                className="bg-white border-aurora-lightpurple"
              />
              <Button className="w-full bg-aurora-purple hover:bg-aurora-darkpurple text-white">
                {t('footer.subscribeButton')}
              </Button>
            </form>
          </div>
        </div>
        
        {/* Bottom footer with copyright */}
        <div className="pt-6 border-t border-gray-200 text-center">
          <p className="text-aurora-neutral text-sm">
            {t('footer.copyright').replace('2025', currentYear.toString())}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
