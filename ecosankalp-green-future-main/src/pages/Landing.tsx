import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/landing/Hero';
import { LiveStats } from '@/components/landing/LiveStats';
import { Features } from '@/components/landing/Features';
import { CTA } from '@/components/landing/CTA';

const Landing = () => {
  return (
    <Layout>
      <Hero />
      <LiveStats />
      <Features />
      <CTA />
    </Layout>
  );
};

export default Landing;
