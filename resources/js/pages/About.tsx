
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="w-full bg-white py-32 mt-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Eventtia</h1>
              <p className="text-xl text-gray-600 mb-8">
                Transforming event experiences through innovative technology.
              </p>
            </div>
          </div>
        </div>

        {/* Our Story */}
        <div className="w-full py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="md:w-1/2">
                <div className="aspect-video bg-gray-200 rounded-lg shadow-lg overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-100"></div>
                </div>
              </div>
              <div className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <p className="text-gray-600 mb-4">
                  Founded in 2014, Eventtia was born from a simple observation: event organizers needed better tools to create exceptional experiences.
                </p>
                <p className="text-gray-600 mb-4">
                  Our founders, experienced event professionals themselves, set out to build the most comprehensive event management platform on the market.
                </p>
                <p className="text-gray-600">
                  Today, Eventtia powers thousands of events worldwide, from intimate corporate gatherings to large-scale international conferences.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Mission */}
        <div className="w-full py-16 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 mb-8">
                To empower event professionals with the technology they need to create unforgettable experiences.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-blue-600 font-bold text-xl">1</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Innovation</h3>
                  <p className="text-gray-600">We constantly evolve our platform to stay ahead of industry trends.</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-blue-600 font-bold text-xl">2</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Excellence</h3>
                  <p className="text-gray-600">We strive for excellence in every aspect of our service and support.</p>
                </div>
                <div className="p-6 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-blue-600 font-bold text-xl">3</div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Partnership</h3>
                  <p className="text-gray-600">We build lasting relationships with our clients based on trust and results.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="w-full py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Leadership Team</h2>
              <p className="text-xl text-gray-600">
                Meet the people behind Eventtia's success.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <h3 className="text-xl font-semibold text-center mb-1">Jane Doe</h3>
                  <p className="text-blue-600 text-center mb-4">Co-Founder & CEO</p>
                  <p className="text-gray-600 text-center">Passionate about transforming the events industry through technology.</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full py-16 bg-blue-600">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Join Our Team</h2>
              <p className="text-xl text-blue-100 mb-8">
                We're always looking for talented people to join our growing team.
              </p>
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                <span>View Open Positions</span>
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
