import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/react';
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
    start_date: string;
    end_date: string;
    location: string;
    max_participants: number;
    registered?: number;
    statut: string;
    event_type: string;
    is_mock?: boolean;
    id_organisateur?: number | null;
}
interface CustomPageProps extends PageProps {
    events: Event[];
    [key: string]: unknown;
}
const EventsList: React.FC = () => {
    const { props } = usePage<CustomPageProps>();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const allEvents = [...
        props.events || [],

    {
        id: -1,
        title: 'Conférence Annuelle Tech 2025',
        start_date: '2025-06-15T09:00:00',
        end_date: '2025-06-15T17:00:00',
        location: 'Paris, France',
        max_participants: 500,
        registered: 342,
        statut: 'planifié',
        event_type: 'conférence',
        is_mock: true,
        id_organisateur: null
    },
    {
        id: -2,
        title: 'Atelier Design ',
        start_date: '2025-07-10T14:00:00',
        end_date: '2025-07-10T18:00:00',
        location: 'Lyon, France',
        max_participants: 50,
        registered: 35,
        statut: 'en_cours',
        event_type: 'workshop',
        is_mock: true,
        id_organisateur: null

    }
    ];




    const handleDelete = (id: number) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
            if (id < 0) {
                // Suppression d'un mock - filtre directement le tableau allEvents
                toast.success('Exemple supprimé');
            } else {
                // Suppression d'un événement réel
                router.delete(`/dashboard/events/${id}`, {
                    onSuccess: () => {
                        toast.success('Événement supprimé avec succès');
                        // Inertia va automatiquement recharger les props.events
                    },
                    onError: () => {
                        toast.error('Erreur lors de la suppression');
                    }
                });
            }
        }
    };

    const handleExport = () => {
        toast.success('Exportation des événements réussie (simulation)');
    };

    const normalizeStatus = (statut: string) => {
        const statusMap: Record<string, string> = {
            'planifié': 'upcoming',
            'en_cours': 'ongoing',
            'terminé': 'past',
            'annulé': 'cancelled'
        };
        return statusMap[statut] || statut;
    };

    const filteredEvents = allEvents.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.location.toLowerCase().includes(searchTerm.toLowerCase());

        const normalizedStatus = normalizeStatus(event.statut);
        const matchesStatus = statusFilter === 'all' || normalizedStatus === statusFilter;

        return matchesSearch && matchesStatus;
    });

    const statusColors = {
        upcoming: 'bg-green-100 text-green-800',
        ongoing: 'bg-blue-100 text-blue-800',
        past: 'bg-gray-100 text-gray-800',
        cancelled: 'bg-red-100 text-red-800'
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR');
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Tous les Événements</h1>
                    <p className="text-gray-500">Liste complète des événements</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleExport}>
                        <Download className="mr-2 h-4 w-4" /> Exporter
                    </Button>
                    <Link href="/dashboard/CreateEvent">
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
                                        <TableRow key={event.id} className={event.is_mock ? 'bg-gray-50' : ''}>
                                            <TableCell className="font-medium">
                                                {event.title}
                                                {event.is_mock && (
                                                    <Badge variant="outline" className="ml-2">
                                                        Exemple
                                                    </Badge>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {formatDate(event.start_date)} à {formatTime(event.start_date)}
                                            </TableCell>
                                            <TableCell>{event.location}</TableCell>
                                            <TableCell>
                                                {event.registered || 0}/{event.max_participants}
                                                <div className="w-full h-1.5 bg-gray-200 rounded-full mt-1">
                                                    <div
                                                        className="h-full bg-blue-600 rounded-full"
                                                        style={{ width: `${((event.registered || 0) / event.max_participants) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge className={statusColors[normalizeStatus(event.statut)]}>
                                                    {event.statut === 'planifié' && 'À venir'}
                                                    {event.statut === 'en_cours' && 'En cours'}
                                                    {event.statut === 'terminé' && 'Terminé'}
                                                    {event.statut === 'annulé' && 'Annulé'}
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
                                                            <Link href={`/dashboard/eventDetail/${event.id}`} className="flex w-full items-center">
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
                                                <Link href="/dashboard/CreateEvent">
                                                    <Button variant="link" className="mt-2">
                                                        Créer un nouvel événement
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