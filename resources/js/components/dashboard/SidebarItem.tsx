
import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface SidebarItemProps {
    title: string;
    path: string;
    icon: LucideIcon;
    exact: boolean;
    isActive: (path: string, exact: boolean) => boolean;
    isSidebarOpen: boolean;
    children?: {
        title: string;
        path: string;
        exact: boolean;
    }[];
    onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    title,
    path,
    icon: Icon,
    exact,
    isActive,
    isSidebarOpen,
    children,
    onClick,
}) => {
    return (
        <div>
            <Link
                to={path}
                onClick={onClick}
                className={cn(
                    "flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md mb-1 group",
                    isActive(path, exact) && "bg-blue-50 text-blue-600"
                )}
            >
                <Icon
                    className={cn(
                        "h-5 w-5",
                        isActive(path, exact) ? "text-blue-600" : "text-gray-500 group-hover:text-gray-700"
                    )}
                />
                {isSidebarOpen && <span className="ml-3">{title}</span>}
            </Link>

            {isSidebarOpen && children && (
                <div className="pl-10 space-y-1 mt-1">
                    {children.map((child) => (
                        <Link
                            key={child.path}
                            to={child.path}
                            onClick={onClick}
                            className={cn(
                                "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md",
                                isActive(child.path, child.exact) && "bg-blue-50 text-blue-600"
                            )}
                        >
                            {child.title}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SidebarItem;