
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product, products, ProductCategory } from '@/data/products';
import { Pencil, Trash, Plus } from 'lucide-react';
import { useCurrency } from '@/contexts/CurrencyContext';

const AdminProducts: React.FC = () => {
  const { formatPrice } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Filter products based on search term
  const filteredProducts = searchTerm
    ? products.filter(product => 
        product.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.nameEs.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;
  
  // Handle product selection for editing
  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsEditDialogOpen(true);
  };
  
  // Handle product deletion
  const handleDeleteProduct = (productId: string) => {
    // In a real app, this would call an API to delete the product
    alert(`Product ${productId} would be deleted in a real application.`);
  };
  
  // Handle updating product stock
  const handleUpdateStock = (product: Product, newStock: number) => {
    // In a real app, this would call an API to update the stock
    alert(`Stock for ${product.nameEn} would be updated to ${newStock} in a real application.`);
  };
  
  // Mock add product function
  const handleAddProduct = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, this would call an API to add the product
    alert('Product would be added in a real application.');
    setIsAddDialogOpen(false);
  };
  
  // Mock update product function
  const handleUpdateProduct = (event: React.FormEvent) => {
    event.preventDefault();
    // In a real app, this would call an API to update the product
    alert(`Product ${selectedProduct?.nameEn} would be updated in a real application.`);
    setIsEditDialogOpen(false);
  };
  
  return (
    <AdminLayout title="Products Management">
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Products</CardTitle>
          <Button 
            onClick={() => setIsAddDialogOpen(true)}
            className="bg-aurora-purple hover:bg-aurora-darkpurple"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </CardHeader>
        <CardContent>
          {/* Search */}
          <div className="mb-4">
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-md"
            />
          </div>
          
          {/* Products Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-xs uppercase text-gray-500 bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left">Image</th>
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Name (EN)</th>
                  <th className="px-4 py-2 text-left">Name (ES)</th>
                  <th className="px-4 py-2 text-left">Category</th>
                  <th className="px-4 py-2 text-left">Price (USD)</th>
                  <th className="px-4 py-2 text-left">Stock</th>
                  <th className="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <img 
                        src={product.images[0]} 
                        alt={product.nameEn} 
                        className="h-12 w-12 object-cover rounded-md"
                      />
                    </td>
                    <td className="px-4 py-3 text-sm">{product.id}</td>
                    <td className="px-4 py-3">{product.nameEn}</td>
                    <td className="px-4 py-3">{product.nameEs}</td>
                    <td className="px-4 py-3">{product.category}</td>
                    <td className="px-4 py-3">{formatPrice(product.priceUSD)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-2">
                        <span className={`${product.stock < 5 ? 'text-red-500 font-medium' : ''}`}>
                          {product.stock}
                        </span>
                        <input 
                          type="number" 
                          min="0" 
                          defaultValue={product.stock.toString()}
                          className="w-16 h-8 border rounded-md text-center"
                          onBlur={(e) => handleUpdateStock(product, parseInt(e.target.value, 10))}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                
                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-4 py-3 text-center text-gray-500">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Add Product Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
            <DialogDescription>
              Add a new product to your inventory.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleAddProduct}>
            <Tabs defaultValue="english">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="english">English</TabsTrigger>
                <TabsTrigger value="spanish">Spanish</TabsTrigger>
              </TabsList>
              
              <TabsContent value="english" className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="nameEn">Name (English)</Label>
                  <Input id="nameEn" placeholder="Product name in English" required />
                </div>
                
                <div>
                  <Label htmlFor="descriptionEn">Description (English)</Label>
                  <textarea 
                    id="descriptionEn" 
                    className="w-full min-h-24 p-2 border rounded-md" 
                    placeholder="Product description in English"
                    required
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="spanish" className="space-y-4 pt-4">
                <div>
                  <Label htmlFor="nameEs">Name (Spanish)</Label>
                  <Input id="nameEs" placeholder="Product name in Spanish" required />
                </div>
                
                <div>
                  <Label htmlFor="descriptionEs">Description (Spanish)</Label>
                  <textarea 
                    id="descriptionEs" 
                    className="w-full min-h-24 p-2 border rounded-md" 
                    placeholder="Product description in Spanish"
                    required
                  />
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <select 
                  id="category" 
                  className="w-full h-10 px-3 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="necklaces">Necklaces</option>
                  <option value="bracelets">Bracelets</option>
                  <option value="earrings">Earrings</option>
                  <option value="rings">Rings</option>
                  <option value="hairAccessories">Hair Accessories</option>
                  <option value="watches">Watches</option>
                </select>
              </div>
              
              <div>
                <Label htmlFor="stock">Stock</Label>
                <Input id="stock" type="number" min="0" defaultValue="0" required />
              </div>
              
              <div>
                <Label htmlFor="priceUSD">Price (USD)</Label>
                <Input id="priceUSD" type="number" min="0" step="0.01" required />
              </div>
              
              <div>
                <Label htmlFor="priceVES">Price (VES)</Label>
                <Input id="priceVES" type="number" min="0" step="0.01" />
                <p className="text-xs text-gray-500 mt-1">Leave empty to auto-calculate from USD</p>
              </div>
            </div>
            
            <div className="mt-4">
              <Label htmlFor="images">Images (URLs)</Label>
              <Input id="images" placeholder="Image URL" required />
              <p className="text-xs text-gray-500 mt-1">Enter image URLs separated by commas</p>
            </div>
            
            <div className="mt-4">
              <Label>
                <input type="checkbox" className="mr-2" />
                Featured Product
              </Label>
            </div>
            
            <DialogFooter className="mt-6">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-aurora-purple hover:bg-aurora-darkpurple">
                Add Product
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Product Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>
              Update product information.
            </DialogDescription>
          </DialogHeader>
          
          {selectedProduct && (
            <form onSubmit={handleUpdateProduct}>
              <Tabs defaultValue="english">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="english">English</TabsTrigger>
                  <TabsTrigger value="spanish">Spanish</TabsTrigger>
                </TabsList>
                
                <TabsContent value="english" className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="edit-nameEn">Name (English)</Label>
                    <Input id="edit-nameEn" defaultValue={selectedProduct.nameEn} required />
                  </div>
                  
                  <div>
                    <Label htmlFor="edit-descriptionEn">Description (English)</Label>
                    <textarea 
                      id="edit-descriptionEn" 
                      className="w-full min-h-24 p-2 border rounded-md" 
                      defaultValue={selectedProduct.descriptionEn}
                      required
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="spanish" className="space-y-4 pt-4">
                  <div>
                    <Label htmlFor="edit-nameEs">Name (Spanish)</Label>
                    <Input id="edit-nameEs" defaultValue={selectedProduct.nameEs} required />
                  </div>
                  
                  <div>
                    <Label htmlFor="edit-descriptionEs">Description (Spanish)</Label>
                    <textarea 
                      id="edit-descriptionEs" 
                      className="w-full min-h-24 p-2 border rounded-md" 
                      defaultValue={selectedProduct.descriptionEs}
                      required
                    />
                  </div>
                </TabsContent>
              </Tabs>
              
              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="edit-category">Category</Label>
                  <select 
                    id="edit-category" 
                    className="w-full h-10 px-3 border border-gray-300 rounded-md"
                    defaultValue={selectedProduct.category}
                    required
                  >
                    <option value="necklaces">Necklaces</option>
                    <option value="bracelets">Bracelets</option>
                    <option value="earrings">Earrings</option>
                    <option value="rings">Rings</option>
                    <option value="hairAccessories">Hair Accessories</option>
                    <option value="watches">Watches</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="edit-stock">Stock</Label>
                  <Input 
                    id="edit-stock" 
                    type="number" 
                    min="0" 
                    defaultValue={selectedProduct.stock.toString()} 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-priceUSD">Price (USD)</Label>
                  <Input 
                    id="edit-priceUSD" 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    defaultValue={selectedProduct.priceUSD.toString()} 
                    required 
                  />
                </div>
                
                <div>
                  <Label htmlFor="edit-priceVES">Price (VES)</Label>
                  <Input 
                    id="edit-priceVES" 
                    type="number" 
                    min="0" 
                    step="0.01" 
                    defaultValue={(selectedProduct.priceUSD * 38.5).toString()} 
                  />
                  <p className="text-xs text-gray-500 mt-1">Leave empty to auto-calculate from USD</p>
                </div>
              </div>
              
              <div className="mt-4">
                <Label htmlFor="edit-images">Images (URLs)</Label>
                <Input 
                  id="edit-images" 
                  defaultValue={selectedProduct.images.join(',')} 
                  required 
                />
                <p className="text-xs text-gray-500 mt-1">Enter image URLs separated by commas</p>
              </div>
              
              <div className="mt-4">
                <Label>
                  <input 
                    type="checkbox" 
                    className="mr-2" 
                    defaultChecked={selectedProduct.featured} 
                  />
                  Featured Product
                </Label>
              </div>
              
              <DialogFooter className="mt-6">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-aurora-purple hover:bg-aurora-darkpurple">
                  Update Product
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminProducts;
