import React from 'react';
import { useForm as useReactHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm as useInertiaForm, router } from '@inertiajs/react';
import { toast } from 'sonner';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Calendar, MapPin, Clock, Users, Tags } from 'lucide-react';

// Schéma de validation
const formSchema = z.object({
    title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
    description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
    date: z.string().min(1, { message: 'Date is required' }),
    time: z.string().min(1, { message: 'Time is required' }),
    location: z.string().min(3, { message: 'Location must be at least 3 characters' }),
    capacity: z.coerce.number().min(1, { message: 'Capacity must be at least 1' }),
    category: z.string().min(1, { message: 'Please select a category' }),
    ticketPrice: z.coerce.number().min(0, { message: 'Ticket price must be a positive number' }),
});

type FormValues = z.infer<typeof formSchema>;

const CreateEvent: React.FC = () => {
    const formHook = useReactHookForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            date: '',
            time: '',
            location: '',
            capacity: 100,
            category: '',
            ticketPrice: 0,
        },
    });

    const inertiaForm = useInertiaForm<FormValues>({
        ...formHook.getValues(),
    });

    const onSubmit = (values: FormValues) => {
        router.post('/events', values, {
            onSuccess: () => {
                toast.success('Event created successfully!');
                router.visit('/dashboard/events');
            },
            onError: (errors) => {
                toast.error('Failed to create event');
                console.error(errors);
            },
            preserveScroll: true,
        });
    };

    return (
        <div className="max-w-2xl mx-auto">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Event</CardTitle>
                    <CardDescription>Create a new event for your attendees</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...formHook}>
                        <form onSubmit={formHook.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={formHook.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Event Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter event title" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={formHook.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Event Description</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Describe your event"
                                                className="min-h-[120px]"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={formHook.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="conference">Conference</SelectItem>
                                                <SelectItem value="seminar">Seminar</SelectItem>
                                                <SelectItem value="workshop">Workshop</SelectItem>
                                                <SelectItem value="networking">Networking</SelectItem>
                                                <SelectItem value="corporate">Corporate</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={formHook.control}
                                    name="date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4" />
                                                Date
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="date" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={formHook.control}
                                    name="time"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Clock className="h-4 w-4" />
                                                Time
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="time" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <FormField
                                control={formHook.control}
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4" />
                                            Location
                                        </FormLabel>
                                        <FormControl>
                                            <Input placeholder="Event location" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <FormField
                                    control={formHook.control}
                                    name="capacity"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Users className="h-4 w-4" />
                                                Capacity
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="number" min="1" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={formHook.control}
                                    name="ticketPrice"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="flex items-center gap-2">
                                                <Tags className="h-4 w-4" />
                                                Ticket Price
                                            </FormLabel>
                                            <FormControl>
                                                <Input type="number" min="0" step="0.01" placeholder="0.00" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex justify-end space-x-4 pt-4">
                                <Button type="button" variant="outline" onClick={() => router.visit('/dashboard/events')}>
                                    Cancel
                                </Button>
                                <Button type="submit">
                                    Create Event
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};
CreateEvent.layout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default CreateEvent;
