
import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <div className="text-2xl font-bold text-white mb-4">Eventtia</div>
            <p className="mb-4 text-gray-400">
              The complete event management platform for in-person, virtual, and hybrid events.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Virtual Events</a></li>
              <li><a href="#" className="hover:text-white">In-Person Events</a></li>
              <li><a href="#" className="hover:text-white">Hybrid Events</a></li>
              <li><a href="#" className="hover:text-white">Registration</a></li>
              <li><a href="#" className="hover:text-white">Networking</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Solutions</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Corporate Events</a></li>
              <li><a href="#" className="hover:text-white">Conferences</a></li>
              <li><a href="#" className="hover:text-white">Trade Shows</a></li>
              <li><a href="#" className="hover:text-white">Universities</a></li>
              <li><a href="#" className="hover:text-white">Associations</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; {new Date().getFullYear()} Eventtia. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-white mr-4">Terms</a>
            <a href="#" className="text-gray-400 hover:text-white mr-4">Privacy</a>
            <a href="#" className="text-gray-400 hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
