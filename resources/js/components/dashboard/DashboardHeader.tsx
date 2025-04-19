
import React from 'react';
import { Link} from '@inertiajs/react';
import { User, ChevronRight, LogOut } from 'lucide-react';

import { toast } from 'sonner';

interface DashboardHeaderProps {
  currentUser: any;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ currentUser }) => {
 
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 md:px-6 fixed top-0 left-0 right-0 z-30">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-xl font-bold text-blue-600 mr-8">
            Eventtia
          </Link>
          <h1 className="text-lg font-semibold text-gray-800 hidden md:block">Dashboard</h1>
        </div>
        
        {currentUser && (
          <div className="flex items-center space-x-4">
            <div className="relative group">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                <User size={18} />
                <span className="hidden md:inline">{currentUser.name}</span>
                <ChevronRight size={16} className="transform group-hover:rotate-90 transition-transform" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 hidden group-hover:block">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="font-medium">{currentUser.name}</p>
                  <p className="text-sm text-gray-500">{currentUser.email}</p>
                </div>
                <Link href="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 rounded-md">
                  Account Settings
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                >
                  <LogOut size={16} className="mr-2" />
                  Log out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;