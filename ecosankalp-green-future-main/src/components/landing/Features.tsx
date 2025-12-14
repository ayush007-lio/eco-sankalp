import { 
  GraduationCap, 
  Camera, 
  Gift, 
  MapPin, 
  Shield, 
  Smartphone,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const features = [
  {
    icon: GraduationCap,
    title: 'Waste Warrior Training',
    description: 'Complete mandatory training modules to become a certified waste management champion. Learn segregation, composting, and safe disposal.',
    link: '/training',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: Camera,
    title: 'Snap & Report',
    description: 'Spot uncollected waste? Snap a photo, tag the location, and submit. Track your reports from submission to resolution.',
    link: '/report',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Gift,
    title: 'Green Rewards',
    description: 'Earn Green Points for every action. Redeem them for eco-friendly products, discounts, or donate to environmental causes.',
    link: '/shop',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: MapPin,
    title: 'Facility Locator',
    description: 'Find nearby recycling centers, biomethanization plants, and authorized scrap dealers with our interactive map.',
    link: '/facilities',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Shield,
    title: 'Verified Impact',
    description: 'Every report is verified by Green Champions. Watch your contribution create real, measurable change in your community.',
    link: '/dashboard',
    color: 'from-rose-500 to-red-500',
  },
  {
    icon: Smartphone,
    title: 'Mobile First',
    description: 'Access all features on the go. Our mobile-optimized interface makes reporting and tracking effortless from anywhere.',
    link: '/report',
    color: 'from-indigo-500 to-violet-500',
  },
];

export const Features = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Platform Features
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Everything You Need to{' '}
            <span className="gradient-text">Make a Difference</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From training to reporting to rewards, EcoSankalp provides all the tools you need to become an environmental champion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="feature-card group animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">{feature.description}</p>
              <Link to={feature.link}>
                <Button variant="ghost" className="p-0 h-auto text-primary group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
