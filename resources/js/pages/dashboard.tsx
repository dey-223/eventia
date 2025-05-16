import DashboardLayout from '@/layouts/DashboardLayout';
import React from 'react';
import { Link } from '@inertiajs/react';
import {
    Progress
} from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import {
    Card,
    CardContent,
    CardDescription,

    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Calendar, Users, Ticket, BarChart, TrendingUp,
    Clock, CalendarDays, ArrowRight, Plus
} from 'lucide-react';

interface EventSummary {
    id: number;
    title: string;
    date: string;
    registered: number;
    capacity: number;
    status: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
}

const dashboard: React.FC = () => {
    const eventStats = {
        totalEvents: 12,
        upcomingEvents: 5,
        pastEvents: 6,
        cancelledEvents: 1
    };

    const totalAttendees = 840;
    const totalRevenue = 24850.75;

    const upcomingEvents: EventSummary[] = [
        {
            id: 1,
            title: 'Annual Tech Conference',
            date: '2025-06-15',
            registered: 342,
            capacity: 500,
            status: 'upcoming'
        },
        {
            id: 2,
            title: 'Developer Meetup',
            date: '2025-07-10',
            registered: 78,
            capacity: 100,
            status: 'upcoming'
        },
        {
            id: 3,
            title: 'Product Design Workshop',
            date: '2025-05-22',
            registered: 50,
            capacity: 50,
            status: 'ongoing'
        }
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'upcoming': return 'bg-green-100 text-green-800';
            case 'ongoing': return 'bg-blue-100 text-blue-800';
            case 'past': return 'bg-gray-100 text-gray-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">Hi !</h1>
                <p className="text-gray-500">Welcome back to your event management console</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Cards */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Events</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{eventStats.totalEvents}</div>
                        <div className="flex items-center pt-1">
                            <span className="text-xs text-muted-foreground mr-1">
                                {eventStats.upcomingEvents} upcoming
                            </span>
                            <Badge variant="outline" className="bg-green-50 text-xs">
                                +2 this month
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Attendees</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalAttendees.toLocaleString()}</div>
                        <div className="flex items-center pt-1">
                            <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                            <span className="text-xs text-green-600 mr-1">+12%</span>
                            <span className="text-xs text-muted-foreground">from last month</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Revenue</CardTitle>
                        <Ticket className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
                        <div className="flex items-center pt-1">
                            <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                            <span className="text-xs text-green-600 mr-1">+8%</span>
                            <span className="text-xs text-muted-foreground">vs previous period</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Registration Rate</CardTitle>
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">76%</div>
                        <Progress value={76} className="h-1 mt-2" />
                        <div className="text-xs text-muted-foreground pt-1">
                            Avg. event capacity filled
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Tabs defaultValue="upcoming">
                <TabsList>
                    <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                </TabsList>

                <TabsContent value="upcoming" className="space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-medium">Your Next Events</h2>
                        <Link href="/dashboard/CreateEvent">
                            <Button size="sm" className="h-8">
                                <Plus className="h-3.5 w-3.5 mr-1" /> New Event
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {upcomingEvents.map(event => (
                            <Card key={event.id}>
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between">
                                        <Badge className={getStatusColor(event.status)}>
                                            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                                        </Badge>
                                    </div>
                                    <CardTitle className="mt-2 text-base">{event.title}</CardTitle>
                                    <CardDescription className="flex items-center text-xs">
                                        <CalendarDays className="h-3 w-3 mr-1" />
                                        {new Date(event.date).toLocaleDateString()}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pb-3">
                                    <div className="flex justify-between items-center text-sm pb-2">
                                        <span className="text-gray-500 flex items-center">
                                            <Users className="h-3.5 w-3.5 mr-1" />
                                            {event.registered}/{event.capacity}
                                        </span>
                                        <span className="text-gray-500">
                                            {Math.round((event.registered / event.capacity) * 100)}% filled
                                        </span>
                                    </div>
                                    <Progress value={(event.registered / event.capacity) * 100} className="h-1" />
                                </CardContent>
                                <div className="px-6 pb-4">
                                    <Link href="/dashboard/eventDetail/">
                                        <Button variant="outline" size="sm" className="w-full">
                                            View Details <ArrowRight className="h-3.5 w-3.5 ml-1" />
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <Link href="/dashboard/eventList">
                            <Button variant="link">
                                View all events <ArrowRight className="h-4 w-4 ml-1" />
                            </Button>
                        </Link>
                    </div>
                </TabsContent>

                <TabsContent value="performance" className="space-y-4">
                    <h2 className="text-lg font-medium">Event Performance</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Registration Trends</CardTitle>
                                <CardDescription>Last 30 days</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[200px] flex items-center justify-center">
                                <div className="text-center text-gray-500">
                                    <BarChart className="h-16 w-16 mx-auto text-gray-300" />
                                    <p className="mt-2">Chart visualization would appear here</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Popular Event Categories</CardTitle>
                                <CardDescription>Based on attendance</CardDescription>
                            </CardHeader>
                            <CardContent className="h-[200px] flex items-center justify-center">
                                <div className="text-center text-gray-500">
                                    <BarChart className="h-16 w-16 mx-auto text-gray-300" />
                                    <p className="mt-2">Chart visualization would appear here</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest actions on your account</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="flex">
                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                                <Users className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-medium">New registration</p>
                                <p className="text-sm text-gray-500">Emily Davis registered for Annual Tech Conference</p>
                                <div className="flex items-center mt-1 text-xs text-gray-400">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>2 hours ago</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                                <Calendar className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="font-medium">Event created</p>
                                <p className="text-sm text-gray-500">You created Developer Meetup event</p>
                                <div className="flex items-center mt-1 text-xs text-gray-400">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>1 day ago</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex">
                            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                                <Ticket className="h-5 w-5 text-amber-600" />
                            </div>
                            <div>
                                <p className="font-medium">Payment received</p>
                                <p className="text-sm text-gray-500">$299.99 payment for Annual Tech Conference</p>
                                <div className="flex items-center mt-1 text-xs text-gray-400">
                                    <Clock className="h-3 w-3 mr-1" />
                                    <span>2 days ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};




dashboard.layout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default dashboard;