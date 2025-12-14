import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useApp();
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((s, c) => s + c.product.price * c.quantity, 0);

  const { createOrder, user } = useApp();

  const handlePay = async () => {
    if (!cardName || cardNumber.length < 12) {
      toast.error('Please enter valid payment details');
      return;
    }
    setIsProcessing(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsProcessing(false);
    setIsPayOpen(false);

    // create order
    const order = createOrder(user?.id ?? 'guest', cart);
    clearCart();
    toast.success('Payment successful! Order confirmed.');
    navigate(`/order/${order.id}`);
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-semibold">Your cart is empty</h2>
          <p className="text-muted-foreground mt-2">Add items from the marketplace to get started.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.product.id} className="p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">₹{item.product.price} • {item.product.greenPointsPrice} GP</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}>-</Button>
                    <div className="px-3 py-1 border rounded">{item.quantity}</div>
                    <Button size="sm" onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}>+</Button>
                    <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.product.id)} className="text-destructive">Remove</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">₹{total}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold">₹{total}</span>
                  </div>
                  <Button onClick={() => setIsPayOpen(true)} className="w-full">Proceed to Payment</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Dialog open={isPayOpen} onOpenChange={setIsPayOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Demo Payment</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label>Cardholder Name</Label>
                <Input value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="John Doe" />
              </div>
              <div>
                <Label>Card Number</Label>
                <Input value={cardNumber} onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))} placeholder="4111 1111 1111 1111" />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <Label>Expiry</Label>
                  <Input value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" />
                </div>
                <div className="w-28">
                  <Label>CVV</Label>
                  <Input value={cvv} onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))} placeholder="123" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="ghost" onClick={() => setIsPayOpen(false)}>Cancel</Button>
              <Button onClick={handlePay} disabled={isProcessing}>{isProcessing ? 'Processing...' : `Pay ₹${total}`}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Cart;
