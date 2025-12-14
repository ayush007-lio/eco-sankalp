import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Camera,
  GraduationCap,
  QrCode,
  ShoppingBag,
  Leaf,
  Trophy,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

const quickActions = [
  { icon: Camera, label: 'Report Waste', href: '/report', color: 'from-blue-500 to-cyan-500' },
  { icon: GraduationCap, label: 'Start Training', href: '/training', color: 'from-emerald-500 to-teal-500' },
  { icon: QrCode, label: 'My QR Code', href: '/profile', color: 'from-purple-500 to-pink-500' },
  { icon: ShoppingBag, label: 'Shop Now', href: '/shop', color: 'from-amber-500 to-orange-500' },
];

const wasteData = [
  { name: 'Organic', value: 45, color: '#10B981' },
  { name: 'Recyclable', value: 30, color: '#3B82F6' },
  { name: 'Hazardous', value: 10, color: '#EF4444' },
  { name: 'Other', value: 15, color: '#8B5CF6' },
];

const activityData = [
  { day: 'Mon', reports: 2 },
  { day: 'Tue', reports: 5 },
  { day: 'Wed', reports: 3 },
  { day: 'Thu', reports: 7 },
  { day: 'Fri', reports: 4 },
  { day: 'Sat', reports: 8 },
  { day: 'Sun', reports: 6 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, reports, trainingProgress, trainingModules } = useApp();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const userReports = reports.filter((r) => r.userId === user.id);
  const pendingReports = userReports.filter((r) => r.status === 'pending').length;
  const cleanedReports = userReports.filter((r) => r.status === 'cleaned').length;
  const completedModules = trainingModules.filter((m) => m.isCompleted).length;

  const getLevelTitle = (level: number) => {
    const titles = ['Beginner', 'Waste Warrior', 'Eco Champion', 'Green Legend', 'Earth Guardian'];
    return titles[Math.min(level - 1, titles.length - 1)];
  };

  return (
    <Layout showFooter={false}>
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Hello, {user.name.split(' ')[0]}! 👋
              </h1>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                  <Trophy className="h-3 w-3 mr-1" />
                  Level {user.level} {getLevelTitle(user.level)}
                </Badge>
                {!user.trainingCompleted && (
                  <Badge variant="outline" className="border-warning text-warning">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Training Required
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
                <Leaf className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Green Points</p>
                  <p className="text-lg font-bold text-primary">{user.greenPoints}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Training Alert */}
        {trainingProgress < 100 && (
          <Card className="mb-8 border-warning/50 bg-warning/5">
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-warning/20">
                  <GraduationCap className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Complete Your Training</p>
                  <p className="text-sm text-muted-foreground">
                    {completedModules}/{trainingModules.length} modules completed • Unlock all features
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="flex-1 sm:w-32">
                  <Progress value={trainingProgress} className="h-2" />
                </div>
                <span className="text-sm font-medium text-warning">{trainingProgress}%</span>
                <Link to="/training">
                  <Button size="sm" variant="warning">
                    Continue
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {quickActions.map((action) => (
            <Link key={action.label} to={action.href}>
              <Card className="card-hover cursor-pointer group h-full">
                <CardContent className="flex flex-col items-center justify-center py-6 text-center">
                  <div className={`p-4 rounded-2xl bg-gradient-to-br ${action.color} mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">{action.label}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Reports Overview */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Camera className="h-5 w-5 text-primary" />
                My Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-warning/10 mx-auto mb-2">
                    <Clock className="h-5 w-5 text-warning" />
                  </div>
                  <p className="text-2xl font-bold">{pendingReports}</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10 mx-auto mb-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-2xl font-bold">{userReports.length - pendingReports - cleanedReports}</p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center h-10 w-10 rounded-full bg-success/10 mx-auto mb-2">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  </div>
                  <p className="text-2xl font-bold">{cleanedReports}</p>
                  <p className="text-xs text-muted-foreground">Cleaned</p>
                </div>
              </div>
              <Link to="/report" className="block mt-4">
                <Button variant="outline" className="w-full">
                  View All Reports
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Waste Distribution */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                Waste Distribution
              </CardTitle>
              <CardDescription>Your segregation pattern</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={wasteData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {wasteData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {wasteData.map((entry) => (
                  <div key={entry.name} className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                    <span className="text-xs text-muted-foreground">{entry.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Weekly Activity */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Weekly Activity
              </CardTitle>
              <CardDescription>Reports this week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-40">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={activityData}>
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                    <YAxis hide />
                    <Tooltip />
                    <Bar dataKey="reports" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <Link to="/report">
                <Button variant="ghost" size="sm">
                  View All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {userReports.length === 0 ? (
              <div className="text-center py-12">
                <div className="inline-flex p-4 rounded-full bg-muted mb-4">
                  <Camera className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No Reports Yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start your waste warrior journey by reporting uncollected waste in your area.
                </p>
                <Link to="/report">
                  <Button>
                    <Camera className="h-4 w-4 mr-2" />
                    Report Your First Waste
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {userReports.slice(0, 5).map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="h-12 w-12 rounded-lg bg-muted overflow-hidden shrink-0">
                      <img
                        src={report.imageUrl}
                        alt="Report"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{report.description}</p>
                      <p className="text-sm text-muted-foreground truncate">{report.location.address}</p>
                    </div>
                    <Badge
                      variant={
                        report.status === 'cleaned'
                          ? 'default'
                          : report.status === 'verified'
                          ? 'secondary'
                          : 'outline'
                      }
                      className={
                        report.status === 'cleaned'
                          ? 'bg-success text-success-foreground'
                          : report.status === 'verified'
                          ? 'bg-primary/10 text-primary'
                          : ''
                      }
                    >
                      {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
