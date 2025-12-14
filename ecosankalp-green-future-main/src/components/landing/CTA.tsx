import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';

const benefits = [
  'Complete free training & get certified',
  'Earn Green Points for every report',
  'Track your environmental impact',
  'Connect with like-minded warriors',
];

export const CTA = () => {
  const { isAuthenticated } = useApp();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Become a Waste Warrior?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            Join thousands of citizens making India cleaner, one report at a time. Your journey to environmental leadership starts here.
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center gap-3 text-left">
                <CheckCircle className="h-5 w-5 text-primary-foreground shrink-0" />
                <span className="text-primary-foreground/90">{benefit}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button variant="hero" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 group">
                  Go to Dashboard
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/auth?mode=signup">
                  <Button variant="hero" size="xl" className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 group">
                    Join EcoSankalp Free
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/auth">
                  <Button variant="hero-outline" size="xl">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>

          <p className="mt-6 text-sm text-primary-foreground/60">
            No credit card required. Start making an impact today.
          </p>
        </div>
      </div>
    </section>
  );
};
