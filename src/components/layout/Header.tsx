
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCurrency, Currency } from '@/contexts/CurrencyContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { currency, setCurrency } = useCurrency();
  const { itemCount } = useCart();
  const { user, logout, isAdmin, isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLanguageChange = (lang: 'en' | 'es') => {
    setLanguage(lang);
    setMobileMenuOpen(false);
  };

  const handleCurrencyChange = (curr: Currency) => {
    setCurrency(curr);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="font-playfair text-2xl font-bold text-aurora-darkpurple">Aurora Bling</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-aurora-neutral hover:text-aurora-purple transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/shop" className="text-aurora-neutral hover:text-aurora-purple transition-colors">
              {t('nav.shop')}
            </Link>
            <Link to="/about" className="text-aurora-neutral hover:text-aurora-purple transition-colors">
              {t('nav.about')}
            </Link>
            <Link to="/contact" className="text-aurora-neutral hover:text-aurora-purple transition-colors">
              {t('nav.contact')}
            </Link>
          </nav>

          {/* Right side - Language, Currency, Cart, Account */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center">
                  {language === 'en' ? 'English' : 'Español'}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('es')}>
                  Español
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Currency Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center">
                  {currency}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleCurrencyChange('USD')}>
                  USD ($)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCurrencyChange('VES')}>
                  VES (Bs.)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Cart */}
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="h-5 w-5 text-aurora-neutral" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-aurora-purple text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Account */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <User className="h-5 w-5 mr-1" />
                    <span className="max-w-[100px] truncate">{user?.name}</span>
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/account" className="w-full">
                      {t('nav.myAccount')}
                    </Link>
                  </DropdownMenuItem>
                  {isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="w-full">
                        {t('nav.admin')}
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout}>
                    {t('nav.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <User className="h-5 w-5 mr-1" />
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="w-full">{t('nav.login')}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/register" className="w-full">{t('nav.register')}</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Link to="/cart" className="relative p-2 mr-4">
              <ShoppingCart className="h-5 w-5 text-aurora-neutral" />
              {itemCount > 0 && (
                <span className="absolute top-0 right-0 bg-aurora-purple text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-aurora-neutral"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="mt-4 md:hidden bg-white rounded-lg shadow-lg p-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-aurora-neutral hover:text-aurora-purple p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.home')}
              </Link>
              <Link 
                to="/shop" 
                className="text-aurora-neutral hover:text-aurora-purple p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.shop')}
              </Link>
              <Link 
                to="/about" 
                className="text-aurora-neutral hover:text-aurora-purple p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.about')}
              </Link>
              <Link 
                to="/contact" 
                className="text-aurora-neutral hover:text-aurora-purple p-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.contact')}
              </Link>

              <div className="border-t pt-4 mt-2">
                {/* Language options */}
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-aurora-neutral">Language:</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className={`px-2 py-1 text-sm rounded ${
                        language === 'en'
                          ? 'bg-aurora-purple text-white'
                          : 'bg-gray-100 text-aurora-neutral'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => handleLanguageChange('es')}
                      className={`px-2 py-1 text-sm rounded ${
                        language === 'es'
                          ? 'bg-aurora-purple text-white'
                          : 'bg-gray-100 text-aurora-neutral'
                      }`}
                    >
                      Español
                    </button>
                  </div>
                </div>

                {/* Currency options */}
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-aurora-neutral">Currency:</span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleCurrencyChange('USD')}
                      className={`px-2 py-1 text-sm rounded ${
                        currency === 'USD'
                          ? 'bg-aurora-purple text-white'
                          : 'bg-gray-100 text-aurora-neutral'
                      }`}
                    >
                      USD ($)
                    </button>
                    <button
                      onClick={() => handleCurrencyChange('VES')}
                      className={`px-2 py-1 text-sm rounded ${
                        currency === 'VES'
                          ? 'bg-aurora-purple text-white'
                          : 'bg-gray-100 text-aurora-neutral'
                      }`}
                    >
                      VES (Bs.)
                    </button>
                  </div>
                </div>

                {/* Account options */}
                <div className="pt-2 border-t mt-2 space-y-2">
                  {isAuthenticated ? (
                    <>
                      <div className="text-center font-medium mb-2">
                        {user?.name}
                      </div>
                      <Link
                        to="/account"
                        className="block bg-aurora-softgray hover:bg-aurora-lightpurple p-2 rounded text-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t('nav.myAccount')}
                      </Link>
                      {isAdmin && (
                        <Link
                          to="/admin"
                          className="block bg-aurora-softgray hover:bg-aurora-lightpurple p-2 rounded text-center"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {t('nav.admin')}
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full bg-aurora-softgray hover:bg-aurora-lightpurple p-2 rounded"
                      >
                        {t('nav.logout')}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block bg-aurora-softgray hover:bg-aurora-lightpurple p-2 rounded text-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t('nav.login')}
                      </Link>
                      <Link
                        to="/register"
                        className="block bg-aurora-softgray hover:bg-aurora-lightpurple p-2 rounded text-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {t('nav.register')}
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
