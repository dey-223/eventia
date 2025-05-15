import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import {
    Calendar,
    Plus,
    Search,
    Filter,
    Eye,
    Pencil,
    Trash2,
    ArrowUpDown,
    Download
} from 'lucide-react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

interface Event {
    id: number;
    title: string;
    date: string;
    time: string;
    location: string;
    capacity: number;
    registered: number;
    status: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
    category: string;
}

const EventsList: React.FC = () => {
    // Données statiques de démonstration
    const [events, setEvents] = useState<Event[]>([
        {
            id: 1,
            title: 'Conférence Annuelle Tech',
            date: '2025-06-15',
            time: '09:00',
            location: 'Paris, France',
            capacity: 500,
            registered: 342,
            status: 'upcoming',
            category: 'conférence'
        },
        {
            id: 2,
            title: 'Rencontre Développeurs',
            date: '2025-07-10',
            time: '18:30',
            location: 'En ligne',
            capacity: 100,
            registered: 78,
            status: 'upcoming',
            category: 'networking'
        },
        {
            id: 3,
            title: 'Atelier Design Produit',
            date: '2025-05-22',
            time: '10:00',
            location: 'Lyon, France',
            capacity: 50,
            registered: 50,
            status: 'ongoing',
            category: 'workshop'
        },
        {
            id: 4,
            title: 'Webinaire Marketing',
            date: '2025-01-05',
            time: '15:00',
            location: 'En ligne',
            capacity: 200,
            registered: 143,
            status: 'past',
            category: 'séminaire'
        },
        {
            id: 5,
            title: 'Événement Annulé',
            date: '2025-03-18',
            time: '14:00',
            location: 'Marseille, France',
            capacity: 150,
            registered: 45,
            status: 'cancelled',
            category: 'divers'
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const handleDelete = (id: number) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
            setEvents(events.filter(event => event.id !== id));
            toast.success('Événement supprimé avec succès');
        }
    };

    // Simuler l'exportation des événements
    const handleExport = () => {
        toast.success('Exportation des événements réussie (simulation)');
    };

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || event.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const statusColors = {
        upcoming: 'bg-green-100 text-green-800',
        ongoing: 'bg-blue-100 text-blue-800',
        past: 'bg-gray-100 text-gray-800',
        cancelled: 'bg-red-100 text-red-800'
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Mes Événements</h1>
                    <p className="text-gray-500">Gérez et surveillez vos événements</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleExport}>
                        <Download className="mr-2 h-4 w-4" /> Exporter
                    </Button>
                    <Link href="/dashbord/CreateEvent">
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="mr-2 h-4 w-4" /> Créer un Événement
                        </Button>
                    </Link>
                </div>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <CardTitle>Liste des Événements</CardTitle>
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                placeholder="Rechercher des événements..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                        >
                            <SelectTrigger className="w-[180px]">
                                <Filter className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="Filtrer par statut" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous les statuts</SelectItem>
                                <SelectItem value="upcoming">À venir</SelectItem>
                                <SelectItem value="ongoing">En cours</SelectItem>
                                <SelectItem value="past">Passés</SelectItem>
                                <SelectItem value="cancelled">Annulés</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[250px]">
                                        <div className="flex items-center space-x-1">
                                            Nom de l'événement
                                            <ArrowUpDown className="h-4 w-4" />
                                        </div>
                                    </TableHead>
                                    <TableHead>Date & Heure</TableHead>
                                    <TableHead>Lieu</TableHead>
                                    <TableHead>Capacité</TableHead>
                                    <TableHead>Statut</TableHead>
                                    <TableHead className="w-[100px]">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredEvents.length > 0 ? (
                                    filteredEvents.map(event => (
                                        <TableRow key={event.id}>
                                            <TableCell className="font-medium">{event.title}</TableCell>
                                            <TableCell>
                                                {new Date(event.date).toLocaleDateString('fr-FR')} à {event.time}
                                            </TableCell>
                                            <TableCell>{event.location}</TableCell>
                                            <TableCell>
                                                {event.registered}/{event.capacity}
                                                <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
                                                    <div
                                                        className="h-full bg-blue-600 rounded-full"
                                                        style={{ width: `${(event.registered / event.capacity) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={statusColors[event.status]}>
                                                    {event.status === 'upcoming' && 'À venir'}
                                                    {event.status === 'ongoing' && 'En cours'}
                                                    {event.status === 'past' && 'Passé'}
                                                    {event.status === 'cancelled' && 'Annulé'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="sm">
                                                            Actions
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                        <DropdownMenuSeparator />
                                                        <DropdownMenuItem>
                                                            <Link href={`/dashboard/events/${event.id}`} className="flex w-full items-center">
                                                                <Eye className="mr-2 h-4 w-4" /> Voir détails
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem>
                                                            <Link href={`/dashboard/events/${event.id}/edit`} className="flex w-full items-center">
                                                                <Pencil className="mr-2 h-4 w-4" /> Modifier
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600">
                                                            <button
                                                                className="flex w-full items-center"
                                                                onClick={() => handleDelete(event.id)}
                                                            >
                                                                <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                                                            </button>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            <div className="flex flex-col items-center justify-center text-gray-500">
                                                <Calendar className="h-8 w-8 mb-2" />
                                                <span>Aucun événement trouvé</span>
                                                <Link href="/dashboard/events/create">
                                                    <Button variant="link" className="mt-2">
                                                        Créer votre premier événement
                                                    </Button>
                                                </Link>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
EventsList.layout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default EventsList;