
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import SectionContainer from '@/components/ui/section-container';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

interface LocationState {
  redirect?: string;
}

const RegisterPage: React.FC = () => {
  const { t, language } = useLanguage();
  const { register, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const redirectPath = state?.redirect || '/';
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Redirect if already logged in
  if (isAuthenticated) {
    navigate(redirectPath);
  }
  
  // Handle registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = language === 'en' ? 'Name is required' : 'El nombre es requerido';
    }
    
    if (!email.trim()) {
      newErrors.email = language === 'en' ? 'Email is required' : 'El correo electrónico es requerido';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = language === 'en' ? 'Invalid email format' : 'Formato de correo electrónico inválido';
    }
    
    if (!password.trim()) {
      newErrors.password = language === 'en' ? 'Password is required' : 'La contraseña es requerida';
    } else if (password.length < 6) {
      newErrors.password = language === 'en' 
        ? 'Password must be at least 6 characters' 
        : 'La contraseña debe tener al menos 6 caracteres';
    }
    
    if (password !== confirmPassword) {
      newErrors.confirmPassword = language === 'en' 
        ? 'Passwords do not match' 
        : 'Las contraseñas no coinciden';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await register(email, password, name);
      // Navigate to redirect path after successful registration
      navigate(redirectPath);
    } catch (error) {
      console.error('Registration error:', error);
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
              {t('auth.register')}
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">{language === 'en' ? 'Name' : 'Nombre'}</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) {
                      const { name, ...restErrors } = errors;
                      setErrors(restErrors);
                    }
                  }}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              
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
                <Label htmlFor="password">{t('auth.password')}</Label>
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
              
              <div>
                <Label htmlFor="confirmPassword">{t('auth.confirmPassword')}</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) {
                      const { confirmPassword, ...restErrors } = errors;
                      setErrors(restErrors);
                    }
                  }}
                  className={errors.confirmPassword ? 'border-red-500' : ''}
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
              
              <Button
                type="submit"
                className="w-full bg-aurora-purple hover:bg-aurora-darkpurple"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? (language === 'en'? 'Creating account...' : 'Creando cuenta...')
                  : t('auth.register')}
              </Button>
              
              <div className="text-center text-sm mt-4">
                <span className="text-aurora-neutral">{t('auth.haveAccount')}</span>
                {' '}
                <Link 
                  to="/login" 
                  className="text-aurora-purple hover:underline"
                  state={{ redirect: redirectPath }}
                >
                  {t('auth.login')}
                </Link>
              </div>
            </form>
          </div>
        </div>
      </SectionContainer>
    </Layout>
  );
};

export default RegisterPage;
