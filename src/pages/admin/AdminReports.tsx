
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import OrdersTable from '@/components/admin/OrdersTable';

const AdminReports = () => {
  return (
    <AdminLayout title="Reports">
      <OrdersTable />
    </AdminLayout>
  );
};

export default AdminReports;
