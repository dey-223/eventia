
import React from 'react';
import { Calendar, Users, Layout, Send, Star, Shield } from 'lucide-react';

const featuresList = [
    {
        icon: <Calendar className="h-12 w-12 text-blue-600" />,
        title: "Event Registration",
        description: "Create beautiful registration forms and manage your attendees with ease."
    },
    {
        icon: <Users className="h-12 w-12 text-blue-600" />,
        title: "Networking",
        description: "Connect your attendees through our AI-powered matchmaking system."
    },
    {
        icon: <Layout className="h-12 w-12 text-blue-600" />,
        title: "Virtual Venue",
        description: "Craft immersive virtual experiences that mimic in-person events."
    },
    {
        icon: <Send className="h-12 w-12 text-blue-600" />,
        title: "Email Marketing",
        description: "Send targeted communications to drive registrations and engagement."
    },
    {
        icon: <Star className="h-12 w-12 text-blue-600" />,
        title: "Analytics",
        description: "Get real-time insights into your event performance and ROI."
    },
    {
        icon: <Shield className="h-12 w-12 text-blue-600" />,
        title: "Security",
        description: "Enterprise-grade security to protect your data and your attendees."
    }
];

const Features: React.FC = () => {
    return (
        <div className="w-full py-24 bg-gray-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        All the tools you need to create exceptional events
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Our comprehensive platform gives you everything you need to manage your events from start to finish.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuresList.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 hover-scale"
                        >
                            <div className="mb-6">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                            <p className="text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Features;
