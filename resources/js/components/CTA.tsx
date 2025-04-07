
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <div className="w-full py-24 bg-blue-600">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to transform your events?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of event professionals who are creating exceptional experiences with Eventtia.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
              Request Demo
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-blue-700 group">
              <span>Contact Sales</span>
              <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
          <p className="text-blue-200 mt-8">
            No credit card required. Free trial available.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CTA;
