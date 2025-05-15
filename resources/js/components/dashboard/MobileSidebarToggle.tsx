
import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Calendar, Plus, Settings } from 'lucide-react';

const MobileNavigation: React.FC = () => {
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-10">
            <div className="flex justify-around items-center py-2">
                <Link to="/dashboard" className="flex flex-col items-center text-xs text-gray-600">
                    <LayoutDashboard className="h-6 w-6" />
                    <span>Overview</span>
                </Link>
                <Link to="/dashboard/events" className="flex flex-col items-center text-xs text-gray-600">
                    <Calendar className="h-6 w-6" />
                    <span>Events</span>
                </Link>
                <Link to="/dashboard/events/create" className="flex flex-col items-center text-xs text-gray-600">
                    <Plus className="h-6 w-6" />
                    <span>Create</span>
                </Link>
                <Link to="/dashboard/settings" className="flex flex-col items-center text-xs text-gray-600">
                    <Settings className="h-6 w-6" />
                    <span>Settings</span>
                </Link>
            </div>
        </div>
    );
};

export default MobileNavigation;