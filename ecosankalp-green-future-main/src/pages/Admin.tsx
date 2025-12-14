import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layout } from '@/components/layout/Layout';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Shield, CheckCircle2, XCircle, AlertTriangle, MapPin, Clock } from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, reports, updateReportStatus } = useApp();

  useEffect(() => {
    if (!isAuthenticated) navigate('/admin-auth');
    if (user?.role !== 'admin') navigate('/dashboard');
  }, [isAuthenticated, user, navigate]);

  if (!user || user.role !== 'admin') return null;

  const pendingReports = reports.filter(r => r.status === 'pending');
  const allReports = reports;
  const { queries, closeQuery } = useApp();
  const { orders, updateOrderStatus } = useApp();

  const handleVerify = (reportId: string) => {
    updateReportStatus(reportId, 'verified');
    toast.success('Report verified and assigned to worker');
  };

  const handleReject = (reportId: string) => {
    toast.error('Report rejected');
  };

  return (
    <Layout showFooter={false}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-2xl bg-primary/10">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Green Champion Dashboard</h1>
            <p className="text-muted-foreground">Verify reports and manage waste collection</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card><CardContent className="py-6 text-center">
            <p className="text-3xl font-bold text-warning">{pendingReports.length}</p>
            <p className="text-muted-foreground">Pending Verification</p>
          </CardContent></Card>
          <Card><CardContent className="py-6 text-center">
            <p className="text-3xl font-bold text-primary">{reports.filter(r => r.status === 'verified').length}</p>
            <p className="text-muted-foreground">In Progress</p>
          </CardContent></Card>
          <Card><CardContent className="py-6 text-center">
            <p className="text-3xl font-bold text-success">{reports.filter(r => r.status === 'cleaned').length}</p>
            <p className="text-muted-foreground">Cleaned</p>
          </CardContent></Card>
        </div>

        <Tabs defaultValue="queue">
          <TabsList className="mb-4">
            <TabsTrigger value="queue">Verification Queue</TabsTrigger>
            <TabsTrigger value="all">All Requests</TabsTrigger>
            <TabsTrigger value="queries">Queries</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="queue">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-warning" />
                  Verification Queue
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pendingReports.length === 0 ? (
                  <div className="text-center py-12">
                    <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-4" />
                    <p className="text-lg font-medium">All caught up!</p>
                    <p className="text-muted-foreground">No pending reports to verify</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingReports.map((report) => (
                      <div key={report.id} className="flex flex-col md:flex-row gap-4 p-4 rounded-xl border bg-muted/30">
                        <div className="h-32 w-full md:w-48 rounded-lg bg-muted shrink-0" />
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                              <p className="font-semibold">{report.userName}</p>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-3 w-3" /> {report.location.address}
                              </p>
                            </div>
                            <Badge variant="outline" className={report.severity === 'high' ? 'border-destructive text-destructive' : ''}>
                              {report.severity}
                            </Badge>
                          </div>
                          <p className="text-foreground mb-3">{report.description}</p>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {new Date(report.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex md:flex-col gap-2">
                          <Button onClick={() => handleVerify(report.id)} className="flex-1 bg-success hover:bg-success/90">
                            <CheckCircle2 className="h-4 w-4" /> Verify
                          </Button>
                          <Button variant="destructive" onClick={() => handleReject(report.id)} className="flex-1">
                            <XCircle className="h-4 w-4" /> Reject
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allReports.map((report) => (
                    <div key={report.id} className="p-4 rounded-xl border bg-muted/20">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <p className="font-semibold">{report.userName}</p>
                          <p className="text-sm text-muted-foreground">{report.location.address}</p>
                        </div>
                        <Badge>{report.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="queries">
            <Card>
              <CardHeader>
                <CardTitle>Queries</CardTitle>
              </CardHeader>
              <CardContent>
                {queries.length === 0 ? (
                  <div className="text-center py-8">No queries found.</div>
                ) : (
                  <div className="space-y-4">
                    {queries.map((q) => (
                      <div key={q.id} className="p-4 rounded-xl border bg-muted/10 flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{q.subject}</p>
                          <p className="text-sm text-muted-foreground">From: {q.name} • {q.email}</p>
                          <p className="mt-2 text-sm">{q.message}</p>
                          <p className="text-xs text-muted-foreground mt-2">{new Date(q.createdAt).toLocaleString()}</p>
                        </div>
                        <div className="flex flex-col gap-2 ml-4">
                          <Badge variant="outline" className={q.status === 'open' ? 'border-primary text-primary' : ''}>{q.status}</Badge>
                          {q.status === 'open' && (
                            <Button size="sm" onClick={() => closeQuery(q.id)} className="bg-success hover:bg-success/90">Close</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Orders</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-8">No orders yet.</div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((o) => (
                      <div key={o.id} className="p-4 rounded-xl border bg-muted/10 flex justify-between items-start">
                        <div>
                          <p className="font-semibold">Order {o.id}</p>
                          <p className="text-sm text-muted-foreground">Placed: {new Date(o.createdAt).toLocaleString()}</p>
                          <p className="mt-2 text-sm">Items: {o.items.length}</p>
                          <p className="mt-1 font-semibold">Total: ₹{o.total}</p>
                        </div>
                        <div className="flex flex-col gap-2 ml-4 items-end">
                          <Badge className="capitalize">{o.status}</Badge>
                          <div className="flex gap-2">
                            {o.status !== 'shipped' && <Button size="sm" onClick={() => updateOrderStatus(o.id, 'shipped')}>Mark Shipped</Button>}
                            {o.status !== 'in_transit' && o.status === 'shipped' && <Button size="sm" onClick={() => updateOrderStatus(o.id, 'in_transit')}>In Transit</Button>}
                            {o.status !== 'delivered' && o.status === 'in_transit' && <Button size="sm" onClick={() => updateOrderStatus(o.id, 'delivered')}>Mark Delivered</Button>}
                            {o.status !== 'cancelled' && <Button variant="destructive" size="sm" onClick={() => updateOrderStatus(o.id, 'cancelled')}>Cancel</Button>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Admin;
