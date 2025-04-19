import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import FeaturesSection from '@/components/FeatureSection';
import CTASection from '@/components/CTASection';
import type { FC } from 'react';

const Home: FC = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <CTASection />
    </>
  );
};

export default Home;
