import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowLeft, User, Calendar, MapPin, Trash2, Check, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

interface Participant {
  id: number;
  name: string;
  email: string;
  registrationDate: string;
  company?: string;
  attended: boolean;
}

interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  participantsCount: number;
  maxParticipants: number;
  category: string;
  description: string;
}

interface PageProps {
  event: Event;
  participants: Participant[];
  [key: string]: any;
}

const EventParticipants: React.FC = () => {
  const { props } = usePage<PageProps>();
  const { event, participants } = props;

  const [searchTerm, setSearchTerm] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [participantToDelete, setParticipantToDelete] = useState<number | null>(null);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const filtered = participants.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.company && p.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  function confirmDelete(id: number) {
    setParticipantToDelete(id);
    setDeleteDialogOpen(true);
  }

  function deleteParticipant() {
    if (!participantToDelete) return;
    router.delete(
      route('inscriptions.destroy', { id: participantToDelete }),
      {
        onSuccess: () => {
          toast.success('Participant supprimé avec succès');
          setDeleteDialogOpen(false);
        },
      }
    );
  }

  function toggleAttendance(id: number) {
    router.post(
      route('inscriptions.toggle', { id }),
      {},
      {
        onSuccess: () => {
          toast.success('Statut de présence mis à jour');
        },
      }
    );
  }

  return (
    <div className="container mx-auto py-20 px-10">
      <Link href="/events" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
        <ArrowLeft className="h-4 w-4 mr-1" /> Retour aux événements
      </Link>
      <h1 className="text-3xl font-bold mb-6">{event.title}</h1>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Liste des Participants</CardTitle>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Rechercher..."
                className="pl-8"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Entreprise</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center">
                    Aucun participant.
                  </TableCell>
                </TableRow>
              )}
              {filtered.map(p => (
                <TableRow key={p.id}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{p.email}</TableCell>
                  <TableCell>{p.company || '-'}</TableCell>
                  <TableCell>{formatDate(p.registrationDate)}</TableCell>
                  <TableCell>
                    <Badge variant={p.attended ? 'default' : 'outline'}>
                      {p.attended ? 'Présent' : 'Absent'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="icon" variant="ghost" onClick={() => toggleAttendance(p.id)}>
                      {p.attended ? <X className="w-4 h-4 text-red-500" /> : <Check className="w-4 h-4 text-green-500" />}
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => confirmDelete(p.id)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogDescription>Voulez-vous vraiment supprimer ce participant ?</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Annuler
            </Button>
            <Button variant="destructive" onClick={deleteParticipant}>
              Supprimer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventParticipants;
