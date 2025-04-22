
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SectionContainer from '@/components/ui/section-container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

interface LocationState {
  redirect?: string;
}

const LoginPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const redirectPath = state?.redirect || '/';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect if already logged in
  if (isAuthenticated) {
    navigate(redirectPath);
  }
  
  // Handle login
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!email.trim()) {
      newErrors.email = language === 'en' ? 'Email is required' : 'El correo electrónico es requerido';
    }
    
    if (!password.trim()) {
      newErrors.password = language === 'en' ? 'Password is required' : 'La contraseña es requerida';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await login(email, password, remember);
      // Navigate to redirect path after successful login
      navigate(redirectPath);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Layout>
      <SectionContainer>
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-2xl font-playfair font-medium text-aurora-dark mb-6 text-center">
              {t('auth.login')}
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">{t('auth.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      const { email, ...restErrors } = errors;
                      setErrors(restErrors);
                    }
                  }}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{t('auth.password')}</Label>
                  <Link 
                    to="/forgot-password" 
                    className="text-sm text-aurora-purple hover:underline"
                  >
                    {t('auth.forgotPassword')}
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      const { password, ...restErrors } = errors;
                      setErrors(restErrors);
                    }
                  }}
                  className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(checked) => setRemember(checked as boolean)}
                />
                <Label 
                  htmlFor="remember" 
                  className="text-sm cursor-pointer"
                >
                  {t('auth.rememberMe')}
                </Label>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-aurora-purple hover:bg-aurora-darkpurple"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? (language === 'en' ? 'Logging in...' : 'Iniciando sesión...')
                  : t('auth.login')}
              </Button>
              
              <div className="text-center text-sm mt-4">
                <span className="text-aurora-neutral">{t('auth.noAccount')}</span>
                {' '}
                <Link 
                  to="/register" 
                  className="text-aurora-purple hover:underline"
                  state={{ redirect: redirectPath }}
                >
                  {t('auth.register')}
                </Link>
              </div>
            </form>
            
            {/* Demo Credentials */}
            <div className="mt-8 pt-6 border-t text-sm text-center">
              <p className="text-aurora-neutral mb-2">
                {language === 'en' 
                  ? 'Demo Credentials:' 
                  : 'Credenciales de demostración:'}
              </p>
              <div className="bg-gray-50 p-3 rounded">
                <p>
                  <span className="font-medium">
                    {language === 'en' ? 'Customer' : 'Cliente'}:
                  </span>
                  {' '}user@example.com / password
                </p>
                <p className="mt-1">
                  <span className="font-medium">
                    {language === 'en' ? 'Admin' : 'Administrador'}:
                  </span>
                  {' '}admin@aurorabling.com / password
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
    </Layout>
  );
};

export default LoginPage;
