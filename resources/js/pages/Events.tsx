// import React, { useState } from 'react';
// import { Link } from '@inertiajs/react';
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Calendar, Users, MapPin, Search, Filter } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';

// interface Event {
//     id: number;
//     title: string;
//     date: string;
//     location: string;
//     participantsCount: number;
//     maxParticipants: number;
//     category: string;
//     description: string;
// }

// const Events = () => {
//     const eventsData: Event[] = [
//         {
//             id: 1,
//             title: "Conférence Tech 2025",
//             date: "2025-06-15",
//             location: "Paris Expo",
//             participantsCount: 150,
//             maxParticipants: 200,
//             category: "Technologie",
//             description: "Une conférence dédiée aux dernières innovations technologiques et aux tendances futures de l'industrie tech."
//         },
//         {
//             id: 2,
//             title: "Workshop Design",
//             date: "2025-07-01",
//             location: "Lyon Centre",
//             participantsCount: 45,
//             maxParticipants: 50,
//             category: "Design",
//             description: "Un atelier pratique où les participants pourront développer leurs compétences en design graphique et UX/UI."
//         },
//         {
//             id: 3,
//             title: "Networking Business",
//             date: "2025-07-15",
//             location: "Marseille Business Center",
//             participantsCount: 75,
//             maxParticipants: 150,
//             category: "Business",
//             description: "Une opportunité exceptionnelle de rencontrer des professionnels de votre secteur et de développer votre réseau."
//         },
//         {
//             id: 4,
//             title: "Networking Business",
//             date: "2025-07-15",
//             location: "Marseille Business Center",
//             participantsCount: 75,
//             maxParticipants: 150,
//             category: "Business",
//             description: "Une opportunité exceptionnelle de rencontrer des professionnels de votre secteur et de développer votre réseau."
//         },
//         {
//             id: 5,
//             title: "Networking Business",
//             date: "2025-07-15",
//             location: "Marseille Business Center",
//             participantsCount: 75,
//             maxParticipants: 150,
//             category: "Business",
//             description: "Une opportunité exceptionnelle de rencontrer des professionnels de votre secteur et de développer votre réseau."
//         },
//         {
//             id: 6,
//             title: "Networking Business",
//             date: "2025-07-15",
//             location: "Marseille Business Center",
//             participantsCount: 75,
//             maxParticipants: 150,
//             category: "Business",
//             description: "Une opportunité exceptionnelle de rencontrer des professionnels de votre secteur et de développer votre réseau."
//         },
//         {
//             id: 7,
//             title: "Formation Marketing Digital",
//             date: "2025-08-10",
//             location: "En ligne",
//             participantsCount: 200,
//             maxParticipants: 500,
//             category: "Marketing",
//             description: "Formation complète sur les stratégies de marketing digital efficaces pour 2025 et au-delà."
//         }
//     ];

//     const [searchTerm, setSearchTerm] = useState('');
//     const [categoryFilter, setCategoryFilter] = useState('all');
//     const [events, setEvents] = useState(eventsData);

//     const formatDate = (date: string) => {
//         return new Date(date).toLocaleDateString('fr-FR', {
//             day: 'numeric',
//             month: 'long',
//             year: 'numeric'
//         });
//     };

//     const filteredEvents = events.filter(event => {
//         const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//             event.location.toLowerCase().includes(searchTerm.toLowerCase());

//         const matchesCategory = categoryFilter === 'all' || event.category.toLowerCase() === categoryFilter.toLowerCase();

//         return matchesSearch && matchesCategory;
//     });

//     const checkIfRegistered = (eventId: number) => {
//         const registeredEvents = localStorage.getItem('registeredEvents');
//         if (registeredEvents) {
//             return JSON.parse(registeredEvents).includes(eventId);
//         }
//         return false;
//     };

//     return (
//         <div className="min-h-screen flex flex-col">
//             <Navbar />
//             <main className="flex-grow">

//                 <div className="container mx-auto px-4 md:px-6">
//                     <div className="max-w-3xl mx-auto text-center">
//                         <h1 className="text-4xl md:text-5xl font-bold mb-6">Événements à venir</h1>
//                         <p className="text-xl text-gray-600 mb-8">
//                             Découvrez et inscrivez-vous aux événements qui vous intéressent.
//                         </p>
//                     </div>
//                 </div>
//                 <div className="container mx-auto py-15 px-15">
//                     <div className="mb-10">
//                         <h1 className="text-3xl font-bold mb-2">Événements à venir</h1>
//                         <p className="text-gray-600">Découvrez et inscrivez-vous aux prochains événements</p>
//                     </div>

//                     <div className="flex flex-col md:flex-row gap-4 mb-8">
//                         <div className="relative flex-1">
//                             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
//                             <Input
//                                 placeholder="Rechercher un événement..."
//                                 className="pl-8"
//                                 value={searchTerm}
//                                 onChange={(e) => setSearchTerm(e.target.value)}
//                             />
//                         </div>
//                         <Select
//                             value={categoryFilter}
//                             onValueChange={setCategoryFilter}
//                         >
//                             <SelectTrigger className="w-[180px]">
//                                 <Filter className="mr-2 h-4 w-4" />
//                                 <SelectValue placeholder="Catégorie" />
//                             </SelectTrigger>
//                             <SelectContent>
//                                 <SelectItem value="all">Toutes les catégories</SelectItem>
//                                 <SelectItem value="technologie">Technologie</SelectItem>
//                                 <SelectItem value="design">Design</SelectItem>
//                                 <SelectItem value="business">Business</SelectItem>
//                                 <SelectItem value="marketing">Marketing</SelectItem>
//                             </SelectContent>
//                         </Select>
//                     </div>

//                     {filteredEvents.length > 0 ? (
//                         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//                             {filteredEvents.map((event) => (
//                                 <Card key={event.id} className="flex flex-col">
//                                     <CardHeader>
//                                         <div className="flex justify-between items-start">
//                                             <CardTitle className="text-xl">{event.title}</CardTitle>
//                                             <Badge variant="secondary">{event.category}</Badge>
//                                         </div>
//                                     </CardHeader>

//                                     <CardContent className="flex-grow">
//                                         <p className="text-sm text-gray-600 mb-4">{event.description}</p>
//                                         <div className="space-y-3">
//                                             <div className="flex items-center gap-2 text-gray-600">
//                                                 <Calendar className="h-4 w-4" />
//                                                 <span>{formatDate(event.date)}</span>
//                                             </div>

//                                             <div className="flex items-center gap-2 text-gray-600">
//                                                 <MapPin className="h-4 w-4" />
//                                                 <span>{event.location}</span>
//                                             </div>

//                                             <div className="flex items-center gap-2 text-gray-600">
//                                                 <Users className="h-4 w-4" />
//                                                 <span>{event.participantsCount}/{event.maxParticipants} participants</span>
//                                             </div>
//                                         </div>
//                                     </CardContent>

//                                     <CardFooter className="flex gap-4">
//                                         <Link href="/events/participants" className="flex-1">
//                                             <Button variant="outline" className="w-full">
//                                                 Voir les participants
//                                             </Button>
//                                         </Link>
//                                         {checkIfRegistered(event.id) ? (
//                                             <Button className="w-full flex-1" variant="secondary" disabled>
//                                                 Déjà inscrit
//                                             </Button>
//                                         ) : (
//                                             <Link href="/events/inscriptions" className="flex-1">
//                                                 <Button className="w-full">S'inscrire</Button>
//                                             </Link>
//                                         )}
//                                     </CardFooter>
//                                 </Card>
//                             ))}
//                         </div>
//                     ) : (
//                         <div className="text-center py-10">
//                             <p className="text-gray-500">Aucun événement ne correspond à votre recherche</p>
//                         </div>
//                     )}
//                 </div>
//             </main>
//             <Footer />
//         </div>
//     );
// };

// export default Events;


import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, MapPin, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

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

const Events = () => {
  const { events } = usePage().props as { events: Event[] };

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const filteredEvents = events.filter(event => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === 'all' || event.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const checkIfRegistered = (eventId: number) => {
    const registeredEvents = localStorage.getItem('registeredEvents');
    if (registeredEvents) {
      return JSON.parse(registeredEvents).includes(eventId);
    }
    return false;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Événements à venir</h1>
            <p className="text-xl text-gray-600 mb-8">
              Découvrez et inscrivez-vous aux événements qui vous intéressent.
            </p>
          </div>
        </div>

        <div className="container mx-auto py-15 px-15">
          <div className="mb-10">
            <h1 className="text-3xl font-bold mb-2">Événements à venir</h1>
            <p className="text-gray-600">Découvrez et inscrivez-vous aux prochains événements</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Rechercher un événement..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              value={categoryFilter}
              onValueChange={setCategoryFilter}
            >
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="technologie">Technologie</SelectItem>
                <SelectItem value="design">Design</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {filteredEvents.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredEvents.map((event) => (
                <Card key={event.id} className="flex flex-col">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <Badge variant="secondary">{event.category}</Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="flex-grow">
                    <p className="text-sm text-gray-600 mb-4">{event.description}</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Users className="h-4 w-4" />
                        <span>{event.participantsCount}/{event.maxParticipants} participants</span>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="flex gap-4">
                    <Link href="/events/participants" className="flex-1">
                      <Button variant="outline" className="w-full">Voir les participants</Button>
                    </Link>
                    {checkIfRegistered(event.id) ? (
                      <Button className="w-full flex-1" variant="secondary" disabled>
                        Déjà inscrit
                      </Button>
                    ) : (
                      <Link href={`/events/inscriptions/${event.id}`} className="flex-1">
                        <Button className="w-full">S'inscrire</Button>
                      </Link>
                      
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">Aucun événement ne correspond à votre recherche</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
