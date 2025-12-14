import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const OrderReceipt = () => {
  const { id } = useParams();
  const { orders } = useApp();

  const order = orders.find((o) => o.id === id);

  if (!order) return (
    <Layout>
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-muted-foreground">Order not found.</p>
      </div>
    </Layout>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Payment Receipt</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Order ID: <strong>{order.id}</strong></p>
            <p className="text-sm text-muted-foreground">Status: <strong className="capitalize">{order.status}</strong></p>
            <p className="text-sm text-muted-foreground">Tracking: <strong>{order.trackingNumber}</strong></p>
            <div className="mt-4">
              <h4 className="font-semibold">Items</h4>
              <ul className="mt-2 space-y-2">
                {order.items.map((it) => (
                  <li key={it.product.id} className="flex items-center justify-between">
                    <span>{it.product.name} x{it.quantity}</span>
                    <span>₹{it.product.price * it.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-muted-foreground">Total Paid</span>
              <span className="font-bold">₹{order.total}</span>
            </div>
            <div className="mt-6 flex gap-3">
              <Link to={`/track/${order.id}`}>
                <Button>Track Order</Button>
              </Link>
              <Button variant="ghost">Download Receipt</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default OrderReceipt;
