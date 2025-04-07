
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const pricingPlans = [
    {
        name: "Starter",
        price: "$99",
        period: "per month",
        description: "Perfect for small events and webinars",
        features: [
            "Up to 5 events per year",
            "100 attendees per event",
            "Basic registration forms",
            "Email notifications",
            "Standard reports"
        ],
        buttonText: "Get Started",
        highlighted: false
    },
    {
        name: "Professional",
        price: "$299",
        period: "per month",
        description: "For growing businesses and recurring events",
        features: [
            "Up to 20 events per year",
            "500 attendees per event",
            "Custom registration forms",
            "Attendee networking",
            "Advanced analytics",
            "API access",
            "Priority support"
        ],
        buttonText: "Start Free Trial",
        highlighted: true
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "pricing",
        description: "For large organizations with complex needs",
        features: [
            "Unlimited events",
            "Unlimited attendees",
            "White label solution",
            "Custom integrations",
            "Dedicated account manager",
            "99.9% SLA uptime",
            "24/7 premium support"
        ],
        buttonText: "Contact Sales",
        highlighted: false
    }
];

const Pricing: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {/* Hero Section */}
                <div className="w-full bg-white py-24 mt-16">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Choose the perfect plan for your event management needs.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Pricing Plans */}
                <div className="w-full py-12 bg-gray-50">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            {pricingPlans.map((plan, index) => (
                                <div
                                    key={index}
                                    className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-200 ${plan.highlighted ? 'scale-105 border-2 border-blue-500' : ''}`}
                                >
                                    {plan.highlighted && (
                                        <div className="bg-blue-500 text-white text-center py-2 font-semibold text-sm">
                                            MOST POPULAR
                                        </div>
                                    )}
                                    <div className="p-8">
                                        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                        <div className="flex items-end mb-4">
                                            <span className="text-4xl font-bold">{plan.price}</span>
                                            <span className="text-gray-500 ml-2">{plan.period}</span>
                                        </div>
                                        <p className="text-gray-600 mb-6">{plan.description}</p>
                                        <Button
                                            className={`w-full mb-8 ${plan.highlighted ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                                            variant={plan.highlighted ? "default" : "outline"}
                                        >
                                            {plan.buttonText}
                                        </Button>
                                        <ul className="space-y-3">
                                            {plan.features.map((feature, i) => (
                                                <li key={i} className="flex items-start">
                                                    <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                                                    <span className="text-gray-600">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="w-full py-16 bg-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-3xl mx-auto">
                            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
                            <div className="space-y-8">
                                {[
                                    {
                                        question: "Can I upgrade or downgrade my plan at any time?",
                                        answer: "Yes, you can upgrade your plan at any time. Downgrades will take effect at the start of your next billing cycle."
                                    },
                                    {
                                        question: "Do you offer discounts for annual billing?",
                                        answer: "Yes, we offer a 15% discount when you choose annual billing instead of monthly."
                                    },
                                    {
                                        question: "Is there a free trial available?",
                                        answer: "Yes, we offer a 14-day free trial on our Professional plan, no credit card required."
                                    },
                                    {
                                        question: "What kind of support is included?",
                                        answer: "All plans include email support. Professional plans include priority support, and Enterprise plans include 24/7 phone and email support."
                                    },
                                    {
                                        question: "Can I get a demo before deciding?",
                                        answer: "Absolutely! You can schedule a personalized demo with our team to see Eventtia in action."
                                    }
                                ].map((faq, index) => (
                                    <div key={index} className="border-b border-gray-200 pb-6">
                                        <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Section */}
                <div className="w-full py-16 bg-gray-50">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-bold mb-6">Still have questions?</h2>
                            <p className="text-xl text-gray-600 mb-8">
                                Our team is ready to help you find the perfect solution for your events.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <Button size="lg" className="gradient-primary">
                                    Schedule a Demo
                                </Button>
                                <Button size="lg" variant="outline">
                                    Contact Sales
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Pricing;
