
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="w-full bg-white py-32 mt-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 animate-fade-in">
              The #1 Event Management Solution
            </h1>
            <p className="text-xl text-gray-600 mb-8 animate-fade-in" style={{animationDelay: "0.2s"}}>
              Build unforgettable event experiences with the most comprehensive event technology platform.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 animate-fade-in" style={{animationDelay: "0.4s"}}>
              <Button size="lg" className="gradient-primary">
                Request Demo
              </Button>
              <Button variant="outline" size="lg" className="group">
                <span>See How It Works</span>
                <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <div className="mt-8 text-sm text-gray-500 animate-fade-in" style={{animationDelay: "0.6s"}}>
              Trusted by leading brands worldwide
            </div>
            <div className="flex flex-wrap mt-4 gap-8 animate-fade-in" style={{animationDelay: "0.8s"}}>
              <div className="w-24 h-8 bg-gray-200 rounded opacity-50"></div>
              <div className="w-24 h-8 bg-gray-200 rounded opacity-50"></div>
              <div className="w-24 h-8 bg-gray-200 rounded opacity-50"></div>
              <div className="w-24 h-8 bg-gray-200 rounded opacity-50"></div>
            </div>
          </div>
          <div className="md:w-1/2 md:pl-12 animate-fade-in" style={{animationDelay: "0.4s"}}>
            <div className="relative">
              <div className="w-full h-[400px] bg-gray-100 rounded-lg shadow-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-60"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[80%] h-[80%] bg-white rounded-lg shadow-lg">
                    <div className="p-4">
                      <div className="w-24 h-4 bg-blue-100 rounded mb-4"></div>
                      <div className="w-full h-40 bg-gray-50 rounded mb-4"></div>
                      <div className="flex gap-4 mb-4">
                        <div className="w-1/3 h-16 bg-gray-50 rounded"></div>
                        <div className="w-1/3 h-16 bg-gray-50 rounded"></div>
                        <div className="w-1/3 h-16 bg-gray-50 rounded"></div>
                      </div>
                      <div className="w-full h-24 bg-gray-50 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-blue-600 rounded-full opacity-10"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-600 rounded-full opacity-10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
