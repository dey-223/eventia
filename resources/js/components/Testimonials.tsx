
import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Eventtia helped us transform our annual conference into a successful hybrid experience that engaged both in-person and virtual attendees.",
    author: "Sarah Johnson",
    position: "Event Director, TechCorp",
    avatar: "bg-gray-300"
  },
  {
    quote: "The registration system is intuitive and the analytics provide valuable insights that help us improve our events every time.",
    author: "Michael Chang",
    position: "Marketing VP, Global Enterprises",
    avatar: "bg-gray-300"
  },
  {
    quote: "We've saved countless hours of manual work by automating our event processes with Eventtia. The ROI is undeniable.",
    author: "Emma Rodriguez",
    position: "Head of Events, Innovate Inc.",
    avatar: "bg-gray-300"
  }
];

const Testimonials: React.FC = () => {
  return (
    <div className="w-full py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by event professionals worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hear from our customers about how Eventtia has transformed their event management.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gray-50 p-8 rounded-lg relative hover:shadow-md transition-shadow"
            >
              <Quote className="h-8 w-8 text-blue-200 absolute top-6 left-6" />
              <div className="pt-8">
                <p className="text-lg text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className={`${testimonial.avatar} w-12 h-12 rounded-full mr-4`}></div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
