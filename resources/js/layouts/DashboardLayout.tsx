import { Link, usePage, router } from '@inertiajs/react'
import {
    LayoutDashboard,
    Calendar,
    Settings,
    BarChart,
    Users,
    Menu,
    ChevronRight,
    X,
    LogOut,
    User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { useState } from 'react'

interface SidebarItemProps {
    title: string
    path: string
    icon: React.ElementType
    exact?: boolean
    children?: { title: string; path: string; exact?: boolean }[]
    onClick?: () => void
    isSidebarOpen: boolean
    currentUrl: string
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    title,
    path,
    icon: Icon,
    exact = false,
    children,
    onClick,
    isSidebarOpen,
    currentUrl,
}) => {
    const isActive = exact ? currentUrl === path : currentUrl.startsWith(path)

    return (
        <div>
            <Link
                href={path}
                onClick={onClick}
                className={cn(
                    'flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md mb-1 group',
                    isActive && 'bg-blue-50 text-blue-600'
                )}
            >
                <Icon
                    className={cn(
                        'h-5 w-5',
                        isActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
                    )}
                />
                {isSidebarOpen && <span className="ml-3">{title}</span>}
            </Link>

            {isSidebarOpen && children && (
                <div className="pl-10 space-y-1 mt-1">
                    {children.map((child) => {
                        const isChildActive = child.exact
                            ? currentUrl === child.path
                            : currentUrl.startsWith(child.path)
                        return (
                            <Link
                                key={child.path}
                                href={child.path}
                                onClick={onClick}
                                className={cn(
                                    'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md',
                                    isChildActive && 'bg-blue-50 text-blue-600'
                                )}
                            >
                                {child.title}
                            </Link>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { url, props } = usePage()
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
    const user = props.auth?.user

    const handleLogout = () => {
        router.post('/logout', {}, {
            onSuccess: () => toast.success('Déconnexion réussie')
        })
    }

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 py-3 px-4 md:px-6 fixed top-0 left-0 right-0 z-30">
                <div className="flex justify-between items-center">
                    <div className="flex items-center">
                        <Button variant="ghost" size="icon" className="md:hidden mr-2" onClick={() => setIsMobileSidebarOpen(true)}>
                            <Menu />
                        </Button>
                        <Link href="/" className="text-xl font-bold text-blue-600 mr-8">
                            Eventtia
                        </Link>

                    </div>

                    {user && (
                        <div className="flex items-center space-x-4">
                            <div className="relative group">
                                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600">
                                    <User size={18} />
                                    <span className="hidden md:inline">{user.name}</span>
                                    <ChevronRight size={16} className="transform group-hover:rotate-90 transition-transform" />
                                </button>
                                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md p-2 hidden group-hover:block">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="font-medium">{user.name}</p>
                                        <p className="text-xs1
                                         text-gray-500">{user.email}</p>
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

            {/* Layout */}
            <div className="flex-grow flex pt-[4rem]"> {/* padding top to offset fixed header */}
                {/* Sidebar */}
                <div
                    className={cn(
                        'bg-white border-r md:w-64 space-y-4 py-4 px-2 fixed inset-y-0 left-0 transform md:relative md:translate-x-0',
                        {
                            '-translate-x-full': !isMobileSidebarOpen && !isSidebarOpen,
                            'translate-x-0': isMobileSidebarOpen || isSidebarOpen,
                        }
                    )}
                >
                    <div className="flex justify-between items-center px-4">
                        <h2 className="text-lg font-semibold">Dashboard</h2>
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileSidebarOpen(false)} className="md:hidden">
                            <X />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="hidden md:flex">
                            <ChevronRight className={cn('transition-transform', !isSidebarOpen && 'rotate-180')} />
                        </Button>
                    </div>

                    <Separator className="my-2" />

                    <SidebarItem title="Dashboard" path="/dashboard" icon={LayoutDashboard} isSidebarOpen={isSidebarOpen} currentUrl={url} exact />
                    <SidebarItem title="Événements" path="/dashboard/eventList" icon={Calendar} isSidebarOpen={isSidebarOpen} currentUrl={url} exact />
                    <SidebarItem
                        title="Inscriptions"
                        path="/inscriptions"
                        icon={Users}
                        isSidebarOpen={isSidebarOpen}
                        currentUrl={url}
                        children={[
                            { title: 'Liste des inscriptions', path: "/events/participants", exact: true },
                            { title: 'Ajouter une inscription', path: "/inscriptions/create", exact: true },
                        ]}
                    />
                    <SidebarItem title="Statistiques" path="/statistiques" icon={BarChart} isSidebarOpen={isSidebarOpen} currentUrl={url} exact />
                    <SidebarItem title="Paramètres" path="/parametres" icon={Settings} isSidebarOpen={isSidebarOpen} currentUrl={url} exact />

                    <Separator className="my-2" />

                    <button
                        onClick={handleLogout}
                        className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md"
                    >
                        <LogOut size={16} className="mr-2" />
                        Log out
                    </button>
                </div>

                {/* Content */}
                <main className="flex-1 px-4 py-6 bg-gray-50 min-h-screen">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default DashboardLayout;