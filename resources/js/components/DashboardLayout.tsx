import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';
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
    Download,
    Settings,
    UserPlus
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
    participantsCount?: number;
    statut: string;
    event_type: string;
    is_mock?: boolean;
}
interface CustomPageProps {
    events: Event[];
    [key: string]: unknown;
}

const EventsList: React.FC = () => {
    const { events } = usePage<CustomPageProps>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const handleDelete = (id: number) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
            router.delete(route('events.destroy', { id }), {
                onSuccess: () => toast.success('Événement supprimé avec succès'),
                onError: () => toast.error('Erreur lors de la suppression')
            });
        }
    };

    const handleExport = () => toast.success('Exportation des événements réussie (simulation)');

    const normalizeStatus = (statut: string) => {
        const map: Record<string,string> = {
            'planifié': 'upcoming',
            'en_cours': 'ongoing',
            'terminé': 'past',
            'annulé': 'cancelled'
        };
        return map[statut] || statut;
    };

    const filteredEvents = events.filter(e => {
        const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase())
            || e.location.toLowerCase().includes(searchTerm.toLowerCase());
        const norm = normalizeStatus(e.statut);
        const matchesStatus = statusFilter === 'all' || norm === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const statusColors: Record<string,string> = {
        upcoming: 'bg-green-100 text-green-800',
        ongoing: 'bg-blue-100 text-blue-800',
        past: 'bg-gray-100 text-gray-800',
        cancelled: 'bg-red-100 text-red-800'
    };

    const formatDate = (d: string) => new Date(d).toLocaleDateString('fr-FR');
    const formatTime = (d: string) => new Date(d).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'});

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Tous les Événements</h1>
                    <p className="text-gray-500">Liste complète des événements</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={handleExport}><Download className="mr-2 h-4 w-4"/>Exporter</Button>
                    <Link href={route('event.create')}><Button><Plus className="mr-2 h-4 w-4"/>Créer</Button></Link>
                </div>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Liste des Événements</CardTitle>
                    <div className="flex gap-4 pt-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input placeholder="Recherche..." className="pl-8" value={searchTerm} onChange={e=>setSearchTerm(e.target.value)}/>
                        </div>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]"><Filter className="mr-2 h-4 w-4"/><SelectValue placeholder="Statut"/></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Tous</SelectItem>
                                <SelectItem value="upcoming">À venir</SelectItem>
                                <SelectItem value="ongoing">En cours</SelectItem>
                                <SelectItem value="past">Passés</SelectItem>
                                <SelectItem value="cancelled">Annulés</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Nom</TableHead>
                                <TableHead>Date & Heure</TableHead>
                                <TableHead>Lieu</TableHead>
                                <TableHead>Capacité</TableHead>
                                <TableHead>Statut</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredEvents.map(evt=>(
                                <TableRow key={evt.id}>
                                    <TableCell className="font-medium">{evt.title}</TableCell>
                                    <TableCell>{formatDate(evt.start_date)} à {formatTime(evt.start_date)}</TableCell>
                                    <TableCell>{evt.location}</TableCell>
                                    <TableCell>{(evt.registered||0)}/{evt.max_participants}</TableCell>
                                    <TableCell><Badge className={statusColors[normalizeStatus(evt.statut)]}>{evt.statut}</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild><Button size="sm" variant="ghost">Actions</Button></DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuSeparator/>
                                                <DropdownMenuItem>
                                                    <Link href={route('event.detail',{event:evt.id})} className="flex items-center"><Eye className="mr-2 h-4 w-4"/>Voir détails</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link href={route('event.edit',{event:evt.id})} className="flex items-center"><Pencil className="mr-2 h-4 w-4"/>Modifier</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link href={route('event.participants',{event:evt.id})} className="flex items-center"><UserPlus className="mr-2 h-4 w-4"/>Inscriptions</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link href={route('events.inscriptions',{id:evt.id})} className="flex items-center"><Plus className="mr-2 h-4 w-4"/>Ajouter inscription</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem>
                                                    <Link href={route('settings')} className="flex items-center"><Settings className="mr-2 h-4 w-4"/>Paramètres</Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator/>
                                                <DropdownMenuItem className="text-red-600">
                                                    <button onClick={()=>handleDelete(evt.id)} className="flex items-center"><Trash2 className="mr-2 h-4 w-4"/>Supprimer</button>
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

EventsList.layout = page=><DashboardLayout>{page}</DashboardLayout>;
export default EventsList;
