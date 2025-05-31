// import { usePage, router } from '@inertiajs/react'
// import { zodResolver } from '@hookform/resolvers/zod'
// import { useForm } from 'react-hook-form'
// import { z } from 'zod'
// import { useState, useEffect } from 'react'
// import { toast } from 'sonner'
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from '@/components/ui/card'
// import {
//   Button} from '@/components/ui/button'

// import {

//   Input} from '@/components/ui/input'
// import {
//   Checkbox} from '@/components/ui/checkbox'
//   import {
//   Form,
//   FormControl,
//   FormDescription,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage
//   } from '@/components/ui/form'
// import {
//   Separator} from '@/components/ui/separator'
// import {
//   Badge} from '@/components/ui/badge'

// import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react'

// interface Event {
//   id: number
//   title: string
//   date: string
//   location: string
//   participantsCount: number
//   maxParticipants: number
//   category: string
//   description: string
//   ticketPrice: number
// }

// const formSchema = z.object({
//   name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
//   email: z.string().email({ message: 'Email invalide' }),
//   company: z.string().optional(),
//   phone: z.string().min(10, { message: 'Numéro de téléphone invalide' }).optional(),
//   acceptTerms: z.boolean().refine(val => val === true, {
//     message: 'Vous devez accepter les conditions générales'
//   })
// })

// type FormValues = z.infer<typeof formSchema>

// const EventSignup = () => {
//   const { props } = usePage()
//   const id = props.id as string
//   const [event, setEvent] = useState<Event | null>(null)
//   const [isSubmitting, setIsSubmitting] = useState(false)
  
//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       name: '',
//       email: '',
//       company: '',
//       phone: '',
//       acceptTerms: false
//     }
//   })
  
//   // Mock data - dans une vraie app ça viendrait du backend via Inertia
//   useEffect(() => {
//     const eventData: Event = {
//       id: Number(id),
//       title: id === "1" ? "Conférence Tech 2025" : id === "2" ? "Workshop Design" : `Événement ${id}`,
//       date: "2025-06-15",
//       location: "Paris Expo",
//       participantsCount: 150,
//       maxParticipants: 200,
//       category: "Technologie",
//       description: "Une conférence dédiée aux dernières innovations technologiques et aux tendances futures de l'industrie tech.",
//       ticketPrice: id === "1" ? 50 : id === "2" ? 35 : 25
//     }
    
//     setEvent(eventData)
//   }, [id])
  
//   const formatDate = (date: string) => {
//     return new Date(date).toLocaleDateString('fr-FR', {
//       day: 'numeric',
//       month: 'long',
//       year: 'numeric'
//     })
//   }
  
//   const onSubmit = async (values: FormValues) => {
//     if (!event) return
    
//     setIsSubmitting(true)
    
//     try {
//       // Simulation d'appel API
//       await new Promise(resolve => setTimeout(resolve, 1500))
      
//       // Pour la démo, on utilise localStorage
//       const registeredEvents = JSON.parse(localStorage.getItem('registeredEvents') || '[]')
//       if (!registeredEvents.includes(event.id)) {
//         registeredEvents.push(event.id)
//         localStorage.setItem('registeredEvents', JSON.stringify(registeredEvents))
//       }
      
//       toast.success('Inscription réussie !')
//       router.visit(`/events/${event.id}/participants`)
//     } catch (error) {
//       toast.error('Une erreur est survenue lors de l\'inscription')
//       console.error('Registration error:', error)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   if (!event) {
//     return (
//       <div className="container mx-auto py-20 px-4">
//         <div className="text-center">
//           <p>Chargement...</p>
//         </div>
//       </div>
//     )
//   }
  
//   const isEventFull = event.participantsCount >= event.maxParticipants

//   return (
//     <div className="container mx-auto py-20 px-4">
//       <div className="mb-6">
//         <a href="/events" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
//           <ArrowLeft className="h-4 w-4 mr-1" />
//           Retour aux événements
//         </a>
//       </div>
      
//       <div className="grid md:grid-cols-3 gap-6">
//         <div className="md:col-span-2">
//           <Card className="mb-6">
//             <CardHeader>
//               <CardTitle className="text-2xl">S'inscrire à l'événement</CardTitle>
//               <CardDescription>Remplissez le formulaire pour vous inscrire à {event.title}</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Form {...form}>
//                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                   <FormField
//                     control={form.control}
//                     name="name"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Nom complet</FormLabel>
//                         <FormControl>
//                           <Input placeholder="Jean Dupont" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
                  
//                   <FormField
//                     control={form.control}
//                     name="email"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>Email</FormLabel>
//                         <FormControl>
//                           <Input type="email" placeholder="jean.dupont@exemple.com" {...field} />
//                         </FormControl>
//                         <FormDescription>Votre billet sera envoyé à cette adresse</FormDescription>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <FormField
//                       control={form.control}
//                       name="company"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Entreprise (optionnel)</FormLabel>
//                           <FormControl>
//                             <Input placeholder="Nom de votre entreprise" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
                    
//                     <FormField
//                       control={form.control}
//                       name="phone"
//                       render={({ field }) => (
//                         <FormItem>
//                           <FormLabel>Téléphone (optionnel)</FormLabel>
//                           <FormControl>
//                             <Input placeholder="+33 6 12 34 56 78" {...field} />
//                           </FormControl>
//                           <FormMessage />
//                         </FormItem>
//                       )}
//                     />
//                   </div>
                  
//                   <FormField
//                     control={form.control}
//                     name="acceptTerms"
//                     render={({ field }) => (
//                       <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
//                         <FormControl>
//                           <Checkbox
//                             checked={field.value}
//                             onCheckedChange={field.onChange}
//                           />
//                         </FormControl>
//                         <div className="space-y-1 leading-none">
//                           <FormLabel>
//                             J'accepte les conditions générales d'utilisation et la politique de confidentialité
//                           </FormLabel>
//                           <FormMessage />
//                         </div>
//                       </FormItem>
//                     )}
//                   />
                  
//                   <div>
//                     <Button 
//                       type="submit" 
//                       className="w-full md:w-auto"
//                       disabled={isSubmitting || isEventFull}
//                     >
//                       {isSubmitting ? 'Inscription en cours...' : 'Confirmer mon inscription'}
//                     </Button>
//                   </div>
//                 </form>
//               </Form>
//             </CardContent>
//           </Card>
//         </div>
        
//         <div>
//           <Card>
//             <CardHeader>
//               <CardTitle>{event.title}</CardTitle>
//               <Badge className="w-fit">{event.category}</Badge>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <p className="text-sm text-gray-600">{event.description}</p>
              
//               <div className="space-y-3">
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <Calendar className="h-4 w-4" />
//                   <span>{formatDate(event.date)}</span>
//                 </div>
                
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <MapPin className="h-4 w-4" />
//                   <span>{event.location}</span>
//                 </div>
                
//                 <div className="flex items-center gap-2 text-gray-600">
//                   <Users className="h-4 w-4" />
//                   <span>
//                     {event.participantsCount}/{event.maxParticipants} participants
//                     {isEventFull && " (Complet)"}
//                   </span>
//                 </div>
//               </div>
              
//               <Separator />
              
//               <div className="pt-2">
//                 <p className="font-semibold">Prix du billet</p>
//                 <p className="text-2xl font-bold mt-1">
//                   {event.ticketPrice > 0 ? `${event.ticketPrice} €` : 'Gratuit'}
//                 </p>
//               </div>
//             </CardContent>
//             <CardFooter>
//               <a href={`/events/${event.id}/participants`} className="w-full">
//                 <Button variant="outline" className="w-full">
//                   Voir les participants
//                 </Button>
//               </a>
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default EventSignup

import { usePage, router, Link } from '@inertiajs/react' // Import Link
import route from 'ziggy-js'//rajouter par moi
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useState, useEffect } from 'react'
import { toast } from 'sonner' // Assure-toi que <Toaster /> est dans ton layout principal
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button} from '@/components/ui/button'
import { Input} from '@/components/ui/input'
import { Checkbox} from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Separator} from '@/components/ui/separator'
import { Badge} from '@/components/ui/badge'
import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react'

// Interface pour l'objet Event venant de Laravel
interface Event {
  id: number
  title: string
  date: string // Laravel enverra probablement une chaîne ISO 8601
  location: string
  // Utilise registrations_count si tu as utilisé loadCount('registrations')
  // ou participantsCount si c'est une colonne directe et à jour.
  registrations_count?: number; // Sera présent si loadCount est utilisé
  participantsCount?: number;   // Si c'est une colonne directe
  maxParticipants: number
  category: string
  description: string
  ticketPrice: number // Assure-toi que cette propriété existe sur ton modèle Event ou est un accesseur
}

// Interface pour les props de la page
interface PageProps {
  event: Event;
  errors?: Record<string, string>; // Erreurs de validation de Laravel
  flash?: { // Messages Flash de Laravel
    success?: string;
    error?: string;
  };
}

// Schéma de validation Zod (inchangé)
const formSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  email: z.string().email({ message: 'Email invalide' }),
  company: z.string().optional(),
  phone: z.string().min(10, { message: 'Numéro de téléphone invalide' }).optional(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'Vous devez accepter les conditions générales'
  })
})
type FormValues = z.infer<typeof formSchema>

const EventSignup = () => {
  const { props } = usePage<PageProps>()
  const { event, errors: pageErrors, flash } = props // `event` vient directement de Laravel
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      acceptTerms: false
    }
  })

  // Afficher les messages flash de Laravel (succès/erreur après redirection)
  useEffect(() => {
    if (flash?.success) {
      toast.success(flash.success)
      // Optionnel: réinitialiser le formulaire après un succès complet
      // form.reset();
    }
    if (flash?.error) {
      toast.error(flash.error)
    }
  }, [flash])

  // Mettre à jour les erreurs du formulaire si Laravel renvoie des erreurs de validation
  useEffect(() => {
    if (pageErrors) {
      Object.entries(pageErrors).forEach(([key, value]) => {
        // Gérer les erreurs spécifiques comme 'event_full' ou 'already_registered'
        if (key === 'event_full' || key === 'already_registered') {
            toast.error(value); // Afficher comme un toast
            // Tu pourrais aussi les afficher ailleurs sur la page si nécessaire
            form.setError('root.serverError', { type: 'server', message: value });
        } else {
            form.setError(key as keyof FormValues, { type: 'server', message: value });
        }
      })
    }
  }, [pageErrors, form])


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  const onSubmit = (values: FormValues) => {
    if (!event) return

    setIsSubmitting(true)

    // Utilise router.post pour envoyer les données à Laravel
    // Assure-toi d'avoir la route nommée 'events.register' dans Laravel
    // ou utilise le chemin direct : `/events/${event.id}/register`
    router.post(route('events.register', { event: event.id }), values, {
      onSuccess: () => {
        // La redirection est gérée par Laravel (Redirect::route(...)).
        // Le message flash de succès sera affiché par l'useEffect ci-dessus.
        // Pas besoin de toast.success ici si le message flash le fait déjà.
      },
      onError: (errors) => {
        // Les erreurs sont passées à l'useEffect pour mettre à jour react-hook-form
        // Afficher un toast générique pour les erreurs de validation.
        // Les messages spécifiques par champ seront affichés par <FormMessage />
        toast.error('Échec de l\'inscription. Veuillez vérifier les erreurs dans le formulaire.')
      },
      onFinish: () => {
        setIsSubmitting(false)
      }
    })
  }

  if (!event) {
    return (
      <div className="container mx-auto py-20 px-4">
        <div className="text-center">
          <p>Chargement des informations de l'événement...</p>
        </div>
      </div>
    )
  }

  // Déterminer le nombre actuel de participants et si l'événement est complet
  const currentParticipants = event.registrations_count ?? event.participantsCount ?? 0;
  const isEventFull = currentParticipants >= event.maxParticipants;

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="mb-6">
        {/* Utiliser le composant Link d'Inertia */}
        <Link href="/events" className="flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Retour aux événements
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">S'inscrire à l'événement</CardTitle>
              <CardDescription>Remplissez le formulaire pour vous inscrire à {event.title}</CardDescription>
            </CardHeader>
            <CardContent>
              {isEventFull && (
                <div className="mb-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
                  <p className="font-bold">Événement Complet</p>
                  <p>Cet événement a atteint son nombre maximum de participants.</p>
                </div>
              )}
              {/* Afficher les erreurs générales du formulaire (ex: event_full si pas géré par toast) */}
              {form.formState.errors.root?.serverError && (
                 <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700">
                    <p>{form.formState.errors.root.serverError.message}</p>
                 </div>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom complet</FormLabel>
                        <FormControl>
                          <Input placeholder="Jean Dupont" {...field} disabled={isEventFull || isSubmitting} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="jean.dupont@exemple.com" {...field} disabled={isEventFull || isSubmitting} />
                        </FormControl>
                        <FormDescription>Votre billet sera envoyé à cette adresse</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Entreprise (optionnel)</FormLabel>
                          <FormControl>
                            <Input placeholder="Nom de votre entreprise" {...field} disabled={isEventFull || isSubmitting}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Téléphone (optionnel)</FormLabel>
                          <FormControl>
                            <Input placeholder="+33 6 12 34 56 78" {...field} disabled={isEventFull || isSubmitting}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="acceptTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 py-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isEventFull || isSubmitting}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            J'accepte les conditions générales d'utilisation et la politique de confidentialité
                          </FormLabel>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />

                  <div>
                    <Button
                      type="submit"
                      className="w-full md:w-auto"
                      disabled={isSubmitting || isEventFull}
                    >
                      {isSubmitting ? 'Inscription en cours...' : isEventFull ? 'Événement Complet' : 'Confirmer mon inscription'}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>{event.title}</CardTitle>
              <Badge className="w-fit">{event.category}</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600">{event.description}</p>

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
                  <span>
                    {currentParticipants}/{event.maxParticipants} participants
                    {isEventFull && " (Complet)"}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="pt-2">
                <p className="font-semibold">Prix du billet</p>
                <p className="text-2xl font-bold mt-1">
                  {event.ticketPrice > 0 ? `${event.ticketPrice} €` : 'Gratuit'}
                </p>
              </div>
            </CardContent>
            <CardFooter>
                {/* Utiliser le composant Link d'Inertia */}
              <Link href={route('events.participants', { event: event.id })} className="w-full">
                <Button variant="outline" className="w-full">
                  Voir les participants
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default EventSignup