
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, FileText, Play, Calendar, BookOpen } from 'lucide-react';

const resourcesCategories = [
    {
        icon: <FileText className="h-8 w-8 text-blue-600" />,
        title: "Blog Articles",
        description: "Stay up-to-date with the latest trends in event management",
        link: "#blog"
    },
    {
        icon: <Play className="h-8 w-8 text-blue-600" />,
        title: "Webinars",
        description: "Watch on-demand webinars from event industry experts",
        link: "#webinars"
    },
    {
        icon: <Calendar className="h-8 w-8 text-blue-600" />,
        title: "Case Studies",
        description: "Learn how organizations are using Eventtia to create successful events",
        link: "#case-studies"
    },
    {
        icon: <BookOpen className="h-8 w-8 text-blue-600" />,
        title: "Guides",
        description: "In-depth resources to help you master event management",
        link: "#guides"
    }
];

const blogPosts = [
    {
        title: "10 Ways to Increase Attendee Engagement at Virtual Events",
        image: "bg-blue-100",
        category: "Virtual Events",
        date: "April 2, 2025",
        excerpt: "Learn effective strategies to keep your virtual audience engaged and participating throughout your event."
    },
    {
        title: "How to Choose the Right Event Management Software",
        image: "bg-green-100",
        category: "Technology",
        date: "March 28, 2025",
        excerpt: "A comprehensive guide to selecting the event management platform that meets your specific needs."
    },
    {
        title: "The Future of Hybrid Events: Trends to Watch",
        image: "bg-purple-100",
        category: "Industry Trends",
        date: "March 15, 2025",
        excerpt: "Discover the emerging trends shaping the future of hybrid events in 2025 and beyond."
    }
];

const Resources: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {/* Hero Section */}
                <div className="w-full bg-white py-24 mt-16">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">Resources</h1>
                            <p className="text-xl text-gray-600 mb-8">
                                Discover guides, articles, and tools to help you create exceptional events.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Resource Categories */}
                <div className="w-full py-16 bg-gray-50">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {resourcesCategories.map((category, index) => (
                                <a
                                    key={index}
                                    href={category.link}
                                    className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                                >
                                    <div className="mb-4">{category.icon}</div>
                                    <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                                    <p className="text-gray-600 mb-4">{category.description}</p>
                                    <div className="flex items-center text-blue-600 font-medium">
                                        <span>Explore</span>
                                        <ArrowRight size={16} className="ml-1" />
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Latest Blog Posts */}
                <div id="blog" className="w-full py-16 bg-white">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex justify-between items-center mb-12">
                                <h2 className="text-3xl font-bold">Latest Articles</h2>
                                <Button variant="outline" className="group">
                                    <span>View all articles</span>
                                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {blogPosts.map((post, index) => (
                                    <div key={index} className="bg-white rounded-lg overflow-hidden border border-gray-100">
                                        <div className={`h-48 ${post.image}`}></div>
                                        <div className="p-6">
                                            <div className="flex justify-between items-center mb-4">
                                                <span className="text-sm font-medium text-blue-600">{post.category}</span>
                                                <span className="text-sm text-gray-500">{post.date}</span>
                                            </div>
                                            <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                            <a href="#" className="text-blue-600 font-medium flex items-center hover:underline">
                                                <span>Read more</span>
                                                <ArrowRight size={16} className="ml-1" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Webinars Section */}
                <div id="webinars" className="w-full py-16 bg-gray-50">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-7xl mx-auto">
                            <div className="flex justify-between items-center mb-12">
                                <h2 className="text-3xl font-bold">Featured Webinars</h2>
                                <Button variant="outline" className="group">
                                    <span>View all webinars</span>
                                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {[1, 2].map((webinar) => (
                                    <div key={webinar} className="bg-white rounded-lg overflow-hidden border border-gray-100 flex flex-col md:flex-row">
                                        <div className="md:w-2/5 h-48 md:h-auto bg-gray-200 relative">
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center">
                                                    <Play className="h-6 w-6 text-white" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-6 md:w-3/5">
                                            <span className="text-sm font-medium text-blue-600 mb-2 block">On-Demand</span>
                                            <h3 className="text-xl font-semibold mb-3">How to Create Engaging Virtual Networking Sessions</h3>
                                            <p className="text-gray-600 mb-4">Learn how to facilitate meaningful connections between attendees in a virtual environment.</p>
                                            <a href="#" className="text-blue-600 font-medium flex items-center hover:underline">
                                                <span>Watch now</span>
                                                <ArrowRight size={16} className="ml-1" />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter */}
                <div className="w-full py-16 bg-blue-600">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-3xl mx-auto text-center">
                            <h2 className="text-3xl font-bold text-white mb-6">Subscribe to Our Newsletter</h2>
                            <p className="text-xl text-blue-100 mb-8">
                                Get the latest event management tips, trends, and resources delivered straight to your inbox.
                            </p>
                            <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                                <Input placeholder="Enter your email" className="bg-white" />
                                <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                                    Subscribe
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

export default Resources;
