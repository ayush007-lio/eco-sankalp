import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { ShoppingBag, Leaf, ShoppingCart } from 'lucide-react';

const Shop = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, products, addToCart } = useApp();

  useEffect(() => {
    if (!isAuthenticated) navigate('/auth');
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart(product, false);
    toast.success(`${product.name} added to cart!`);
    navigate('/cart');
  };

  return (
    <Layout showFooter={false}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-primary/10">
              <ShoppingBag className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Green Marketplace</h1>
              <p className="text-muted-foreground">Eco-friendly products for sustainable living</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
            <Leaf className="h-5 w-5 text-primary" />
            <span className="font-bold text-primary">{user.greenPoints} GP</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden card-hover">
              <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <ShoppingBag className="h-16 w-16 text-primary/30" />
              </div>
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  {!product.inStock && <Badge variant="destructive">Out of Stock</Badge>}
                </div>
                <p className="text-sm text-muted-foreground mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-foreground">₹{product.price}</p>
                    <p className="text-sm text-primary">or {product.greenPointsPrice} GP</p>
                  </div>
                  <Button onClick={() => handleAddToCart(product)} disabled={!product.inStock}>
                    <ShoppingCart className="h-4 w-4" />
                    Add
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
