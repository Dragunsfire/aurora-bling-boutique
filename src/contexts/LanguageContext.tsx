
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define available languages
export type Language = 'en' | 'es';

// Define context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.shop': 'Shop',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.cart': 'Cart',
    'nav.admin': 'Admin',
    'nav.logout': 'Logout',
    'nav.myAccount': 'My Account',

    // Homepage
    'home.hero.title': 'Elegant Jewelry for the Modern Woman',
    'home.hero.subtitle': 'Discover our exquisite collection of handcrafted jewelry',
    'home.hero.cta': 'Shop Now',
    'home.categories.title': 'Shop by Category',
    'home.newArrivals.title': 'New Arrivals',
    'home.newArrivals.subtitle': 'The latest additions to our collection',
    'home.featured.title': 'Featured Products',
    'home.featured.subtitle': 'Our most popular items',

    // Product
    'product.addToCart': 'Add to Cart',
    'product.availability': 'Availability',
    'product.inStock': 'In Stock',
    'product.outOfStock': 'Out of Stock',
    'product.quantity': 'Quantity',
    'product.shipping': 'Shipping & Returns',
    'product.shippingInfo': 'Free shipping on all US orders over $50',
    'product.relatedProducts': 'You might also like',
    'product.details': 'Product Details',
    'product.specifications': 'Specifications',

    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.continue': 'Continue Shopping',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Shipping',
    'cart.tax': 'Tax',
    'cart.total': 'Total',
    'cart.checkout': 'Proceed to Checkout',
    'cart.remove': 'Remove',
    'cart.update': 'Update',

    // Checkout
    'checkout.title': 'Checkout',
    'checkout.contact': 'Contact Information',
    'checkout.shipping': 'Shipping Address',
    'checkout.payment': 'Payment Method',
    'checkout.review': 'Review Order',
    'checkout.firstName': 'First Name',
    'checkout.lastName': 'Last Name',
    'checkout.email': 'Email',
    'checkout.phone': 'Phone',
    'checkout.address': 'Address',
    'checkout.city': 'City',
    'checkout.state': 'State/Province',
    'checkout.zip': 'Zip/Postal Code',
    'checkout.country': 'Country',
    'checkout.cardName': 'Name on Card',
    'checkout.cardNumber': 'Card Number',
    'checkout.expiration': 'Expiration Date',
    'checkout.cvv': 'CVV',
    'checkout.placeOrder': 'Place Order',
    'checkout.orderSuccess': 'Order Placed Successfully!',
    'checkout.orderNumber': 'Order Number',
    'checkout.orderConfirmation': 'Thank you for your order. We have emailed your order confirmation.',
    'checkout.continueShopping': 'Continue Shopping',

    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.noAccount': "Don't have an account?",
    'auth.haveAccount': 'Already have an account?',
    'auth.rememberMe': 'Remember Me',
    'auth.loginSuccess': 'Logged in successfully',
    'auth.registerSuccess': 'Registered successfully',
    'auth.logoutSuccess': 'Logged out successfully',

    // Footer
    'footer.about': 'About Us',
    'footer.aboutText': 'Aurora Bling is a luxury jewelry brand offering timeless pieces for the modern woman.',
    'footer.contact': 'Contact Us',
    'footer.address': '123 Jewelry St, New York, NY 10001',
    'footer.phone': '+1 (123) 456-7890',
    'footer.email': 'info@aurorabling.com',
    'footer.subscribe': 'Subscribe to our newsletter',
    'footer.subscribeButton': 'Subscribe',
    'footer.copyright': '© 2025 Aurora Bling. All rights reserved.',
    'footer.terms': 'Terms & Conditions',
    'footer.privacy': 'Privacy Policy',

    // Categories
    'category.necklaces': 'Necklaces',
    'category.bracelets': 'Bracelets',
    'category.earrings': 'Earrings',
    'category.rings': 'Rings',
    'category.hairAccessories': 'Hair Accessories',
    'category.watches': 'Watches',
  },
  es: {
    // Navigation
    'nav.home': 'Inicio',
    'nav.shop': 'Tienda',
    'nav.about': 'Nosotros',
    'nav.contact': 'Contacto',
    'nav.login': 'Iniciar Sesión',
    'nav.register': 'Registro',
    'nav.cart': 'Carrito',
    'nav.admin': 'Admin',
    'nav.logout': 'Cerrar Sesión',
    'nav.myAccount': 'Mi Cuenta',

    // Homepage
    'home.hero.title': 'Joyería Elegante para la Mujer Moderna',
    'home.hero.subtitle': 'Descubre nuestra exquisita colección de joyería artesanal',
    'home.hero.cta': 'Comprar Ahora',
    'home.categories.title': 'Comprar por Categoría',
    'home.newArrivals.title': 'Nuevas Llegadas',
    'home.newArrivals.subtitle': 'Las últimas adiciones a nuestra colección',
    'home.featured.title': 'Productos Destacados',
    'home.featured.subtitle': 'Nuestros artículos más populares',

    // Product
    'product.addToCart': 'Añadir al Carrito',
    'product.availability': 'Disponibilidad',
    'product.inStock': 'En Stock',
    'product.outOfStock': 'Agotado',
    'product.quantity': 'Cantidad',
    'product.shipping': 'Envío y Devoluciones',
    'product.shippingInfo': 'Envío gratuito en todos los pedidos de EE.UU. superiores a $50',
    'product.relatedProducts': 'También te puede gustar',
    'product.details': 'Detalles del Producto',
    'product.specifications': 'Especificaciones',

    // Cart
    'cart.title': 'Carrito de Compras',
    'cart.empty': 'Tu carrito está vacío',
    'cart.continue': 'Continuar Comprando',
    'cart.subtotal': 'Subtotal',
    'cart.shipping': 'Envío',
    'cart.tax': 'Impuesto',
    'cart.total': 'Total',
    'cart.checkout': 'Proceder al Pago',
    'cart.remove': 'Eliminar',
    'cart.update': 'Actualizar',

    // Checkout
    'checkout.title': 'Pago',
    'checkout.contact': 'Información de Contacto',
    'checkout.shipping': 'Dirección de Envío',
    'checkout.payment': 'Método de Pago',
    'checkout.review': 'Revisar Pedido',
    'checkout.firstName': 'Nombre',
    'checkout.lastName': 'Apellido',
    'checkout.email': 'Correo Electrónico',
    'checkout.phone': 'Teléfono',
    'checkout.address': 'Dirección',
    'checkout.city': 'Ciudad',
    'checkout.state': 'Estado/Provincia',
    'checkout.zip': 'Código Postal',
    'checkout.country': 'País',
    'checkout.cardName': 'Nombre en la Tarjeta',
    'checkout.cardNumber': 'Número de Tarjeta',
    'checkout.expiration': 'Fecha de Vencimiento',
    'checkout.cvv': 'CVV',
    'checkout.placeOrder': 'Realizar Pedido',
    'checkout.orderSuccess': '¡Pedido Realizado con Éxito!',
    'checkout.orderNumber': 'Número de Pedido',
    'checkout.orderConfirmation': 'Gracias por tu pedido. Hemos enviado una confirmación a tu correo electrónico.',
    'checkout.continueShopping': 'Continuar Comprando',

    // Auth
    'auth.login': 'Iniciar Sesión',
    'auth.register': 'Registrarse',
    'auth.email': 'Correo Electrónico',
    'auth.password': 'Contraseña',
    'auth.confirmPassword': 'Confirmar Contraseña',
    'auth.forgotPassword': '¿Olvidaste tu contraseña?',
    'auth.noAccount': '¿No tienes una cuenta?',
    'auth.haveAccount': '¿Ya tienes una cuenta?',
    'auth.rememberMe': 'Recordarme',
    'auth.loginSuccess': 'Sesión iniciada con éxito',
    'auth.registerSuccess': 'Registro exitoso',
    'auth.logoutSuccess': 'Sesión cerrada con éxito',

    // Footer
    'footer.about': 'Sobre Nosotros',
    'footer.aboutText': 'Aurora Bling es una marca de joyería de lujo que ofrece piezas atemporales para la mujer moderna.',
    'footer.contact': 'Contáctanos',
    'footer.address': '123 Calle Joyería, Nueva York, NY 10001',
    'footer.phone': '+1 (123) 456-7890',
    'footer.email': 'info@aurorabling.com',
    'footer.subscribe': 'Suscríbete a nuestro boletín',
    'footer.subscribeButton': 'Suscribirse',
    'footer.copyright': '© 2025 Aurora Bling. Todos los derechos reservados.',
    'footer.terms': 'Términos y Condiciones',
    'footer.privacy': 'Política de Privacidad',

    // Categories
    'category.necklaces': 'Collares',
    'category.bracelets': 'Pulseras',
    'category.earrings': 'Pendientes',
    'category.rings': 'Anillos',
    'category.hairAccessories': 'Accesorios para el Cabello',
    'category.watches': 'Relojes',
  }
};

// Provider component
export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
