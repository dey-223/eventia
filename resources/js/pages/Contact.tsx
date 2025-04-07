
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

const Contact: React.FC = () => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted');
        // In a real app, you would send this data to your backend
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow">
                {/* Hero Section */}
                <div className="w-full bg-white py-24 mt-16">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
                            <p className="text-xl text-gray-600 mb-8">
                                We'd love to hear from you. Get in touch with our team.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Form and Info */}
                <div className="w-full py-16 bg-gray-50">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="flex flex-col lg:flex-row gap-12">
                            <div className="lg:w-2/3">
                                <h2 className="text-3xl font-bold mb-6">Send us a message</h2>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input id="firstName" placeholder="Enter your first name" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" placeholder="Enter your last name" required />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input id="email" type="email" placeholder="Enter your email address" required />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number (optional)</Label>
                                        <Input id="phone" placeholder="Enter your phone number" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="company">Company (optional)</Label>
                                        <Input id="company" placeholder="Enter your company name" />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message</Label>
                                        <textarea
                                            id="message"
                                            rows={5}
                                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                            placeholder="How can we help you?"
                                            required
                                        ></textarea>
                                    </div>

                                    <Button type="submit" size="lg" className="gradient-primary w-full md:w-auto">
                                        Send Message
                                    </Button>
                                </form>
                            </div>

                            <div className="lg:w-1/3 bg-white p-8 rounded-lg shadow-sm">
                                <h3 className="text-xl font-semibold mb-6">Contact Information</h3>

                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <MapPin className="h-6 w-6 text-blue-600 mr-3 shrink-0" />
                                        <div>
                                            <h4 className="font-medium">Address</h4>
                                            <p className="text-gray-600 mt-1">
                                                1234 Tech Avenue<br />
                                                Suite 567<br />
                                                San Francisco, CA 94107
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Phone className="h-6 w-6 text-blue-600 mr-3 shrink-0" />
                                        <div>
                                            <h4 className="font-medium">Phone</h4>
                                            <p className="text-gray-600 mt-1">+1 (555) 123-4567</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Mail className="h-6 w-6 text-blue-600 mr-3 shrink-0" />
                                        <div>
                                            <h4 className="font-medium">Email</h4>
                                            <p className="text-gray-600 mt-1">info@eventtia-clone.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <Clock className="h-6 w-6 text-blue-600 mr-3 shrink-0" />
                                        <div>
                                            <h4 className="font-medium">Business Hours</h4>
                                            <p className="text-gray-600 mt-1">
                                                Monday - Friday: 9am - 6pm<br />
                                                Saturday - Sunday: Closed
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Section (Placeholder) */}
                <div className="w-full h-96 bg-gray-200">
                    <div className="w-full h-full flex items-center justify-center">
                        <p className="text-gray-600">Map placeholder - In a real app, embed a map here</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
