import { Head, useForm, router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm as useHookForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import DashboardLayout from '@/Layouts/DashboardLayout';

// Components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Calendar, MapPin, Clock, Users, Tags, Image as ImageIcon, Loader2, X } from 'lucide-react';

// Form schema
const formSchema = z.object({
    title: z.string().min(3, { message: 'Title must be at least 3 characters' }),
    description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
    date: z.string().min(1, { message: 'Date is required' }),
    time: z.string().min(1, { message: 'Time is required' }),
    endTime: z.string().min(1, { message: 'End time is required' }).optional(),
    location: z.string().min(3, { message: 'Location must be at least 3 characters' }),
    capacity: z.coerce.number().min(1, { message: 'Capacity must be at least 1' }),
    category: z.string().min(1, { message: 'Please select a category' }),
    ticketPrice: z.coerce.number().min(0, { message: 'Ticket price must be a positive number' }),
    isOnline: z.boolean().default(false),
    isPrivate: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateEvent() {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors: inertiaErrors } = useForm({
        title: '',
        description: '',
        date: '',
        time: '',
        endTime: '',
        location: '',
        capacity: 100,
        category: '',
        ticketPrice: 0,
        isOnline: false,
        isPrivate: false,
        image: null,
    });

    const form = useHookForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
            date: '',
            time: '',
            endTime: '',
            location: '',
            capacity: 100,
            category: '',
            ticketPrice: 0,
            isOnline: false,
            isPrivate: false,
        },
    });

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
            setData('image', file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    const onSubmit = (values: FormValues) => {
        const formData = new FormData();
    
        formData.append('title', values.title);
        formData.append('description', values.description || '');
        formData.append('start_date', new Date(values.date + ' ' + values.time).toISOString());
        formData.append('end_date', new Date(values.date + ' ' + (values.endTime || values.time)).toISOString());
        formData.append('location', values.location);
        formData.append('max_participants', values.capacity.toString());
        formData.append('event_type', values.category);
        
        if (selectedImage) {
            formData.append('image', selectedImage);
        }
    
        router.post('/dashboard/events', formData, {
            forceFormData: true,
            onSuccess: () => {
                toast.success('Événement créé avec succès');
            },
            onError: () => {
                toast.error("Erreur lors de la création de l'événement");
            }
        });
    };


    return (
        <>
            <Head title="Create New Event" />

            <div className="max-w-2xl mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Create New Event</CardTitle>
                        <CardDescription>Create a new event for your attendees</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="mb-6">
                                        <FormLabel>Event Image</FormLabel>
                                        <div className="mt-2 flex items-center">
                                            <div className="relative w-full">
                                                <div className={`border-2 border-dashed rounded-lg p-4 text-center ${imagePreview ? 'border-green-500' : 'border-gray-300'}`}>
                                                    {imagePreview ? (
                                                        <div className="relative">
                                                            <img
                                                                src={imagePreview}
                                                                alt="Event preview"
                                                                className="mx-auto h-40 w-full object-cover rounded"
                                                            />
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                size="sm"
                                                                className="absolute top-2 right-2 h-8 w-8 p-0 rounded-full bg-white"
                                                                onClick={() => {
                                                                    setSelectedImage(null);
                                                                    setImagePreview(null);
                                                                    setData('image', null);
                                                                }}
                                                            >
                                                                <X size={16} />
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-col items-center justify-center py-4">
                                                            <ImageIcon className="h-12 w-12 text-gray-400" />
                                                            <p className="mt-2 text-sm text-gray-500">Click to upload event image</p>
                                                            <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                                                        </div>
                                                    )}
                                                    <input
                                                        type="file"
                                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                        onChange={handleImageChange}
                                                        accept="image/*"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <FormField
                                        control={form.control}
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
                                        control={form.control}
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
                                        control={form.control}
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

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <FormField
                                            control={form.control}
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
                                            control={form.control}
                                            name="time"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4" />
                                                        Start Time
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input type="time" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="endTime"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4" />
                                                        End Time
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
                                        control={form.control}
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
                                            control={form.control}
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
                                            control={form.control}
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
                                </div>

                                <div className="flex justify-end space-x-4 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => router.visit('/dashboard/events')}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Creating...
                                            </>
                                        ) : 'Create Event'}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

CreateEvent.layout = (page: React.ReactNode) => <DashboardLayout>{page}</DashboardLayout>;