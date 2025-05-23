import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown, User, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { props } = usePage();
    const currentUser = props.auth?.user;

    const handleLogout = () => {
        router.post('/logout', {}, {
            onSuccess: () => {
                toast.success('Déconnexion réussie');
            },
            onError: () => {
                toast.error('Échec de la déconnexion');
            },
        });
        setIsOpen(false);
    };

    return (
        <nav className="w-full py-4 bg-white shadow-sm fixed top-0 z-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="text-xl font-bold text-blue-600">
                            Eventtiaaa
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/events" className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                            <Calendar size={16} />
                            <span>Événements</span>
                        </Link>

                        <div className="relative group">
                            <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                                <span>Solutions</span>
                                <ChevronDown size={16} />
                            </button>
                            <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 hidden group-hover:block">
                                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md">Corporate Events</Link>
                                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md">Conferences</Link>
                                <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md">Trade Shows</Link>
                            </div>
                        </div>

                        <Link href="/pricing" className="text-gray-600 hover:text-blue-600">Pricing</Link>
                        <Link href="/resources" className="text-gray-600 hover:text-blue-600">Resources</Link>
                        <Link href="/about" className="text-gray-600 hover:text-blue-600">About</Link>
                        <Link href="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
                    </div>

                    {/* Action Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {currentUser ? (
                            <div className="relative group">
                                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                                    <User size={20} />
                                    <span>{currentUser.name}</span>
                                    <ChevronDown size={16} />
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 hidden group-hover:block">
                                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md">Dashboard</Link>
                                    <Link href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md">My Events</Link>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                                    >
                                        Log out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
                                <Link href="/register">
                                    <Button className="gradient-primary">Sign Up</Button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-blue-600 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden mt-4 pb-4">
                        <Link href="/events" className="block py-2 text-gray-600 hover:text-blue-600">Events</Link>
                        <Link href="#" className="block py-2 text-gray-600 hover:text-blue-600">Solutions</Link>
                        <Link href="/pricing" className="block py-2 text-gray-600 hover:text-blue-600">Pricing</Link>
                        <Link href="/resources" className="block py-2 text-gray-600 hover:text-blue-600">Resources</Link>
                        <Link href="/about" className="block py-2 text-gray-600 hover:text-blue-600">About</Link>
                        <Link href="/contact" className="block py-2 text-gray-600 hover:text-blue-600">Contact</Link>

                        {currentUser ? (
                            <div className="border-t border-gray-200 mt-2 pt-2">
                                <div className="flex items-center space-x-2 py-2">
                                    <User size={20} className="text-gray-600" />
                                    <span className="font-medium">{currentUser.name}</span>
                                </div>
                                <Link href="/dashboard" className="block py-2 text-gray-600 hover:text-blue-600">Dashboard</Link>
                                <Link href="#" className="block py-2 text-gray-600 hover:text-blue-600">My Events</Link>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left py-2 text-red-600 hover:text-red-700"
                                >
                                    Log out
                                </button>
                            </div>
                        ) : (
                            <>
                                <Link href="/login" className="block py-2 text-gray-600 hover:text-blue-600">Login</Link>
                                <Link href="/register">
                                    <Button className="w-full mt-4 gradient-primary">Sign Up</Button>
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;