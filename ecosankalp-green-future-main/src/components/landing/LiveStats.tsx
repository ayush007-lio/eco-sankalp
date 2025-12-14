import { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Trash2, Recycle, Users, TreePine } from 'lucide-react';

const AnimatedCounter = ({ end, duration = 2000, suffix = '' }: { end: number; duration?: number; suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  );
};

export const LiveStats = () => {
  const { liveStats } = useApp();

  const stats = [
    {
      icon: Trash2,
      label: 'Waste Reported',
      value: liveStats.wasteReported,
      suffix: ' tonnes',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
    },
    {
      icon: Recycle,
      label: 'Waste Treated',
      value: liveStats.wasteTreated,
      suffix: ' tonnes',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
    {
      icon: Users,
      label: 'Active Warriors',
      value: liveStats.activeUsers,
      suffix: '+',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      icon: TreePine,
      label: 'Trees Planted',
      value: liveStats.treesPlanted,
      suffix: '',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Live Impact Dashboard
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Real-Time Environmental Impact
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Watch as citizens across India come together to make a measurable difference in waste management.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="stat-card animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-3 rounded-xl ${stat.bgColor} mb-4`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-muted-foreground">Treatment Progress</span>
            <span className="text-sm font-bold text-primary">
              {Math.round((liveStats.wasteTreated / liveStats.wasteReported) * 100)}% Treated
            </span>
          </div>
          <div className="h-4 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000"
              style={{ width: `${(liveStats.wasteTreated / liveStats.wasteReported) * 100}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            {(liveStats.wasteReported - liveStats.wasteTreated).toLocaleString()} tonnes pending treatment
          </p>
        </div>
      </div>
    </section>
  );
};
