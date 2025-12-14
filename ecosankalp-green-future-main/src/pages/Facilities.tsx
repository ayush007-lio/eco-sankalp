import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useApp } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Clock, Factory, Recycle, Store } from 'lucide-react';

const Facilities = () => {
  const navigate = useNavigate();
  const { isAuthenticated, facilities } = useApp();

  useEffect(() => {
    if (!isAuthenticated) navigate('/auth');
  }, [isAuthenticated, navigate]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'biomethanization': return Factory;
      case 'recycling': return Recycle;
      default: return Store;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'biomethanization': return 'from-emerald-500 to-teal-500';
      case 'recycling': return 'from-blue-500 to-cyan-500';
      default: return 'from-amber-500 to-orange-500';
    }
  };

  return (
    <Layout showFooter={false}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-2xl bg-primary/10">
            <MapPin className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Facility Locator</h1>
            <p className="text-muted-foreground">Find recycling centers and waste facilities near you</p>
          </div>
        </div>

        {/* Map Placeholder */}
        <Card className="mb-8 overflow-hidden">
          <div className="h-64 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-primary/30 mx-auto mb-2" />
              <p className="text-muted-foreground">Interactive map coming soon</p>
            </div>
          </div>
        </Card>

        {/* Facility List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => {
            const Icon = getIcon(facility.type);
            return (
              <Card key={facility.id} className="card-hover">
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${getColor(facility.type)}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{facility.name}</CardTitle>
                      <Badge variant="outline" className="mt-1 capitalize">{facility.type}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{facility.location.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{facility.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{facility.hours}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Facilities;
