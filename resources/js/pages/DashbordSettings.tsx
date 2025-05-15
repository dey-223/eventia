
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const profileSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
    email: z.string().email({ message: 'Please enter a valid email address' }),
    company: z.string().optional(),
    website: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const passwordSchema = z.object({
    currentPassword: z.string().min(1, { message: 'Current password is required' }),
    newPassword: z.string().min(8, { message: 'Password must be at least 8 characters' }),
    confirmPassword: z.string().min(8, { message: 'Confirm password is required' }),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
});

type PasswordFormValues = z.infer<typeof passwordSchema>;

const DashboardSettings: React.FC = () => {
    // Get current user data from localStorage
    const currentUserStr = localStorage.getItem('currentUser');
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

    const profileForm = useForm<ProfileFormValues>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: currentUser?.name || '',
            email: currentUser?.email || '',
            company: '',
            website: '',
        },
    });

    const passwordForm = useForm<PasswordFormValues>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
        },
    });

    const onProfileSubmit = async (values: ProfileFormValues) => {
        try {
            // In a real app, you would send this to your Laravel API
            // const response = await fetch('http://localhost:8000/api/profile', {
            //   method: 'PUT',
            //   headers: {
            //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
            //     'Content-Type': 'application/json',
            //     'Accept': 'application/json',
            //   },
            //   body: JSON.stringify(values)
            // });

            // const data = await response.json();

            // if (!response.ok) {
            //   throw new Error(data.message || 'Failed to update profile');
            // }

            // Update local storage with new profile info
            const updatedUser = { ...currentUser, name: values.name, email: values.email };
            localStorage.setItem('currentUser', JSON.stringify(updatedUser));

            toast.success('Profile updated successfully!');
        } catch (error: any) {
            console.error('Error updating profile:', error);
            toast.error(error.message || 'Failed to update profile');
        }
    };

    const onPasswordSubmit = async (values: PasswordFormValues) => {
        try {
            // In a real app, you would send this to your Laravel API
            // const response = await fetch('http://localhost:8000/api/password', {
            //   method: 'PUT',
            //   headers: {
            //     'Authorization': `Bearer ${localStorage.getItem('token')}`,
            //     'Content-Type': 'application/json',
            //     'Accept': 'application/json',
            //   },
            //   body: JSON.stringify({
            //     current_password: values.currentPassword,
            //     password: values.newPassword,
            //     password_confirmation: values.confirmPassword
            //   })
            // });

            // const data = await response.json();

            // if (!response.ok) {
            //   throw new Error(data.message || 'Failed to update password');
            // }

            toast.success('Password updated successfully!');
            passwordForm.reset();
        } catch (error: any) {
            console.error('Error updating password:', error);
            toast.error(error.message || 'Failed to update password');
        }
    };

    return (
        <div className="space-y-10">
            <h1 className="text-2xl font-bold">Settings</h1>

            {/* Profile Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Update your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...profileForm}>
                        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-6">
                            <FormField
                                control={profileForm.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={profileForm.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="your@email.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={profileForm.control}
                                name="company"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Company (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Your company" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={profileForm.control}
                                name="website"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Website (Optional)</FormLabel>
                                        <FormControl>
                                            <Input placeholder="https://yourwebsite.com" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit">Save Profile</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            {/* Password Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your account password</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...passwordForm}>
                        <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                            <FormField
                                control={passwordForm.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={passwordForm.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={passwordForm.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Confirm New Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="••••••••" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit">Change Password</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default DashboardSettings;