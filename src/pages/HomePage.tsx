import React from 'react';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import AboutSection from '../components/home/AboutSection';
import HelpSection from '../components/home/HelpSection';
import ContactSection from '../components/home/ContactSection';
import FeaturedCourts from '../components/home/FeaturedCourts';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <HelpSection />
      <FeaturedCourts />
      <ContactSection />
    </div>
  );
};

export default HomePage;
