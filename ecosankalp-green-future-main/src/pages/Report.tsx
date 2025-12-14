import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Camera, MapPin, Upload, AlertTriangle, Clock, CheckCircle2, Loader2 } from 'lucide-react';

const Report = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, reports, addReport } = useApp();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState<'high' | 'medium' | 'low'>('medium');
  const [address, setAddress] = useState('Block A, Sector 15, Noida');

  useEffect(() => {
    if (!isAuthenticated) navigate('/auth');
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(r => setTimeout(r, 1500));

    addReport({
      userId: user.id,
      userName: user.name,
      imageUrl: '/placeholder.svg',
      location: { lat: 28.6139, lng: 77.209, address },
      description,
      severity,
    });

    toast.success('Report submitted successfully! +25 Green Points earned');
    setDescription('');
    setSeverity('medium');
    setIsSubmitting(false);
  };

  const userReports = reports.filter(r => r.userId === user.id);

  return (
    <Layout showFooter={false}>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-2xl bg-primary/10">
              <Camera className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Snap & Report</h1>
              <p className="text-muted-foreground">Report uncollected waste in your area</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Report Form */}
            <Card>
              <CardHeader>
                <CardTitle>New Report</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Photo Upload */}
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="font-medium">Click to upload photo</p>
                    <p className="text-sm text-muted-foreground">or drag and drop</p>
                  </div>

                  {/* Location */}
                  <div className="space-y-2">
                    <Label>Location</Label>
                    <div className="flex gap-2">
                      <Input value={address} onChange={(e) => setAddress(e.target.value)} />
                      <Button type="button" variant="outline" size="icon">
                        <MapPin className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea 
                      placeholder="Describe the waste situation..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                    />
                  </div>

                  {/* Severity */}
                  <div className="space-y-3">
                    <Label>Severity Level</Label>
                    <RadioGroup value={severity} onValueChange={(v) => setSeverity(v as any)} className="flex gap-4">
                      {['low', 'medium', 'high'].map((s) => (
                        <div key={s} className="flex items-center">
                          <RadioGroupItem value={s} id={s} className="peer sr-only" />
                          <Label
                            htmlFor={s}
                            className={`px-4 py-2 rounded-lg border-2 cursor-pointer capitalize transition-all peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5
                              ${s === 'high' ? 'peer-data-[state=checked]:border-destructive peer-data-[state=checked]:bg-destructive/5' : ''}
                              ${s === 'medium' ? 'peer-data-[state=checked]:border-warning peer-data-[state=checked]:bg-warning/5' : ''}
                            `}
                          >
                            {s}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                    {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                    {isSubmitting ? 'Submitting...' : 'Submit Report'}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Reports History */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Your Reports</h2>
              {userReports.length === 0 ? (
                <Card className="p-8 text-center">
                  <Camera className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No reports yet. Submit your first report!</p>
                </Card>
              ) : (
                userReports.map((report) => (
                  <Card key={report.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="h-20 w-20 rounded-lg bg-muted shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{report.description}</p>
                          <p className="text-sm text-muted-foreground truncate">{report.location.address}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant={report.status === 'cleaned' ? 'default' : 'outline'} className={report.status === 'cleaned' ? 'bg-success' : ''}>
                              {report.status === 'pending' && <Clock className="h-3 w-3 mr-1" />}
                              {report.status === 'cleaned' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                              {report.status}
                            </Badge>
                            <Badge variant="outline" className={report.severity === 'high' ? 'border-destructive text-destructive' : ''}>
                              {report.severity}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Report;
