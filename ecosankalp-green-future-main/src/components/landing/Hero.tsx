import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Leaf, Recycle, Users } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

export const Hero = () => {
  const { isAuthenticated } = useApp();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float opacity-20">
        <Leaf className="h-16 w-16 text-primary-foreground" />
      </div>
      <div className="absolute bottom-40 right-20 animate-float opacity-20" style={{ animationDelay: '1s' }}>
        <Recycle className="h-20 w-20 text-primary-foreground" />
      </div>
      <div className="absolute top-40 right-40 animate-float opacity-20" style={{ animationDelay: '2s' }}>
        <Users className="h-12 w-12 text-primary-foreground" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 backdrop-blur-sm mb-8 animate-fade-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-foreground opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-foreground"></span>
            </span>
            <span className="text-sm font-medium text-primary-foreground">
              Join 45,000+ Waste Warriors across India
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight animate-fade-up" style={{ animationDelay: '0.1s' }}>
            India generates{' '}
            <span className="relative">
              <span className="relative z-10">1.7 lakh tonnes</span>
              <span className="absolute bottom-2 left-0 right-0 h-3 bg-primary-foreground/20 -z-0"></span>
            </span>
            {' '}of waste daily.
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Be the solution. Join EcoSankalp to report, track, and transform waste into opportunity.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="hero" size="xl" className="group">
                  Go to Dashboard
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth?mode=signup">
                  <Button variant="hero" size="xl" className="group">
                    Start Your Journey
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button variant="hero-outline" size="xl" className="group">
                  <Play className="h-5 w-5" />
                  Watch How It Works
                </Button>
              </>
            )}
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex flex-wrap items-center justify-center gap-8 animate-fade-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2 text-primary-foreground/60">
              <Leaf className="h-6 w-6" />
              <span className="text-sm">Ministry of Environment</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/60">
              <Recycle className="h-6 w-6" />
              <span className="text-sm">Swachh Bharat Mission</span>
            </div>
            <div className="flex items-center gap-2 text-primary-foreground/60">
              <Users className="h-6 w-6" />
              <span className="text-sm">Make in India</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};
