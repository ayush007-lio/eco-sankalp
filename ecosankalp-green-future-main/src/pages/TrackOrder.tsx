import { useParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const TrackOrder = () => {
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

  const statusMap: Record<string, string> = {
    processing: 'Order Received',
    shipped: 'Shipped',
    in_transit: 'In Transit',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Track Order</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Order ID: <strong>{order.id}</strong></p>
            <p className="text-sm text-muted-foreground">Tracking Number: <strong>{order.trackingNumber}</strong></p>
            <div className="mt-4">
              <Badge className="capitalize">{order.status}</Badge>
              <p className="mt-4">{statusMap[order.status]}</p>
            </div>
            <div className="mt-6 text-sm text-muted-foreground">Estimated delivery: 3-5 business days</div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TrackOrder;
