
import { LucideIcon } from 'lucide-react';

export interface SidebarNavItem {
    title: string;
    icon: LucideIcon;
    path: string;
    exact: boolean;
    children?: {
        title: string;
        path: string;
        exact: boolean;
    }[];
}