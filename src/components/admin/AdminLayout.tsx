
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { useAuth } from '@/contexts/AuthContext';
import { Home, Package, ClipboardList, BarChart } from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { isAdmin, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if not authenticated or not admin
  React.useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/login');
    }
  }, [isAdmin, isAuthenticated, navigate]);
  
  if (!isAuthenticated || !isAdmin) {
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 border-r hidden md:block">
          <div className="p-4">
            <h2 className="text-xl font-medium mb-4">Admin Panel</h2>
            <nav className="space-y-1">
              <Link 
                to="/admin" 
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-700 hover:bg-aurora-softgray"
              >
                <Home className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/admin/products" 
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-700 hover:bg-aurora-softgray"
              >
                <Package className="h-5 w-5" />
                <span>Products</span>
              </Link>
              <Link 
                to="/admin/orders" 
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-700 hover:bg-aurora-softgray"
              >
                <ClipboardList className="h-5 w-5" />
                <span>Orders</span>
              </Link>
              <Link 
                to="/admin/reports" 
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-700 hover:bg-aurora-softgray"
              >
                <BarChart className="h-5 w-5" />
                <span>Reports</span>
              </Link>
            </nav>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 bg-gray-50 overflow-y-auto">
          <div className="container mx-auto p-4 md:p-6">
            <h1 className="text-2xl font-bold mb-6">{title}</h1>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
