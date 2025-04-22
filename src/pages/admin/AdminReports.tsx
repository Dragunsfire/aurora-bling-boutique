
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import OrdersTable from '@/components/admin/OrdersTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AdminReports = () => {
  return (
    <AdminLayout title="Reports">
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Reports</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Properly structured Tabs component with both TabsList and TabsContent */}
            <Tabs defaultValue="orders">
              <TabsList className="grid w-full max-w-md grid-cols-2">
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
              </TabsList>
              
              <TabsContent value="orders" className="mt-6">
                <OrdersTable />
              </TabsContent>
              
              <TabsContent value="sales" className="mt-6">
                <div className="flex items-center justify-center h-64 border rounded-md">
                  <p className="text-muted-foreground">Sales analytics coming soon</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminReports;
