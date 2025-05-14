import { Head, Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  User,
  ArrowLeft,
  Pencil,
  BarChart2,
  Ticket,
  MessageSquare
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';


// Define attendee type
interface Attendee {
  id: number;
  name: string;
  email: string;
  registrationDate: string;
  ticketType: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  avatar?: string;
}

// Event type definition with more details
interface DetailedEvent {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  capacity: number;
  registered: number;
  status: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
  category: string;
  organizer: string;
  ticketPrice: number;
  attendees: Attendee[];
}

function EventDetail() {
  const { id } = usePage().props; // Get id from Inertia props
  const [event, setEvent] = useState<DetailedEvent | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      const mockEvent: DetailedEvent = {
        id: parseInt(id || '0', 10),
        title: 'Annual Tech Conference 2025',
        description: 'Join us for the biggest tech conference of the year. Learn from industry experts, network with peers, and discover the latest innovations in technology.',
        date: '2025-06-15',
        time: '09:00',
        endTime: '18:00',
        location: 'San Francisco Convention Center, 747 Howard St, San Francisco, CA 94103',
        capacity: 500,
        registered: 342,
        status: 'upcoming',
        category: 'conference',
        organizer: 'Tech Innovations Inc.',
        ticketPrice: 299.99,
        attendees: [
          { id: 1, name: 'John Doe', email: 'john@example.com', registrationDate: '2025-03-15', ticketType: 'VIP', status: 'confirmed', avatar: 'https://ui.shadcn.com/avatars/01.png' },
          { id: 2, name: 'Jane Smith', email: 'jane@example.com', registrationDate: '2025-03-16', ticketType: 'Standard', status: 'confirmed', avatar: 'https://ui.shadcn.com/avatars/02.png' },
          { id: 3, name: 'Robert Johnson', email: 'robert@example.com', registrationDate: '2025-03-18', ticketType: 'Standard', status: 'pending' },
          { id: 4, name: 'Emily Davis', email: 'emily@example.com', registrationDate: '2025-03-20', ticketType: 'VIP', status: 'confirmed', avatar: 'https://ui.shadcn.com/avatars/03.png' },
          { id: 5, name: 'Michael Wilson', email: 'michael@example.com', registrationDate: '2025-03-21', ticketType: 'Standard', status: 'cancelled' },
        ]
      };
      setEvent(mockEvent);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleSendReminders = () => {
    toast.success('Reminders sent to all attendees');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800">Event not found</h2>
        <p className="text-gray-600 mt-2">The event you're looking for doesn't exist or has been removed.</p>
        <Link href="/dashboard/events">
          <Button className="mt-6">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Events
          </Button>
        </Link>
      </div>
    );
  }

  const registrationRate = (event.registered / event.capacity) * 100;

  return (
    <>
      <Head title={event.title} />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <Link href="/dashboard/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{event.title}</h1>
            <Badge className={`ml-2 ${event.status === 'upcoming' ? 'bg-green-100 text-green-800' :
              event.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                event.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
              }`}>
              {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Link href="/dashboard/editEvent">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Pencil className="mr-2 h-4 w-4" /> Edit Event
              </Button>
            </Link>
          </div>
        </div>

        {/* Event Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Information</CardTitle>
                <CardDescription>Complete details about this event</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-medium text-gray-600 mb-2">Description</h3>
                  <p>{event.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Date</h4>
                        <p className="text-gray-600">{new Date(event.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Time</h4>
                        <p className="text-gray-600">{event.time} - {event.endTime}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Location</h4>
                        <p className="text-gray-600">{event.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Ticket className="h-5 w-5 text-gray-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Ticket Price</h4>
                        <p className="text-gray-600">${event.ticketPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="attendees">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="attendees">Attendees</TabsTrigger>
                <TabsTrigger value="statistics">Statistics</TabsTrigger>
                <TabsTrigger value="communication">Communication</TabsTrigger>
              </TabsList>
              <TabsContent value="attendees" className="mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Registered Attendees</CardTitle>
                      <Badge variant="outline" className="ml-2">
                        {event.registered} / {event.capacity}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Attendee</TableHead>
                            <TableHead>Registration Date</TableHead>
                            <TableHead>Ticket Type</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {event.attendees.map(attendee => (
                            <TableRow key={attendee.id}>
                              <TableCell>
                                <div className="flex items-center gap-3">
                                  <Avatar>
                                    <AvatarImage src={attendee.avatar} />
                                    <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <div className="font-medium">{attendee.name}</div>
                                    <div className="text-sm text-gray-500">{attendee.email}</div>
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>{new Date(attendee.registrationDate).toLocaleDateString()}</TableCell>
                              <TableCell>{attendee.ticketType}</TableCell>
                              <TableCell>
                                <Badge className={getStatusColor(attendee.status)}>
                                  {attendee.status.charAt(0).toUpperCase() + attendee.status.slice(1)}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">Export Attendee List</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="statistics" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Statistics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">Registration Rate</span>
                        <span>{Math.round(registrationRate)}%</span>
                      </div>
                      <Progress value={registrationRate} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="py-4">
                          <CardTitle className="text-base flex items-center">
                            <Users className="mr-2 h-4 w-4" />
                            Attendance
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="py-0">
                          <div className="text-2xl font-bold">{event.registered} / {event.capacity}</div>
                          <p className="text-sm text-gray-500">Registered attendees</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="py-4">
                          <CardTitle className="text-base flex items-center">
                            <Ticket className="mr-2 h-4 w-4" />
                            Revenue
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="py-0">
                          <div className="text-2xl font-bold">${(event.registered * event.ticketPrice).toLocaleString()}</div>
                          <p className="text-sm text-gray-500">Total ticket sales</p>
                        </CardContent>
                      </Card>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="communication" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Attendee Communication</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Message Templates</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button variant="outline" className="justify-start">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Event Reminder
                        </Button>
                        <Button variant="outline" className="justify-start">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Event Update
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div>
                      <h3 className="font-medium">Quick Actions</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                        <Button onClick={handleSendReminders}>
                          Send Event Reminders
                        </Button>
                        <Button variant="outline">
                          Download Attendee Contacts
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Event Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Capacity</p>
                    <p className="text-gray-500">{event.registered}/{event.capacity} registered</p>
                    <Progress value={registrationRate} className="h-1 mt-1" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Category</p>
                    <p className="text-gray-500">{event.category.charAt(0).toUpperCase() + event.category.slice(1)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">Organizer</p>
                    <p className="text-gray-500">{event.organizer}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Print Event Details
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Confirmed</span>
                  <Badge variant="outline" className="bg-green-50">
                    {event.attendees.filter(a => a.status === 'confirmed').length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Pending</span>
                  <Badge variant="outline" className="bg-yellow-50">
                    {event.attendees.filter(a => a.status === 'pending').length}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Cancelled</span>
                  <Badge variant="outline" className="bg-red-50">
                    {event.attendees.filter(a => a.status === 'cancelled').length}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

EventDetail.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>;

export default EventDetail;