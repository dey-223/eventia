<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Events;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;
use App\Models\Inscription;

class EventsController extends Controller

{ 
    /**
     * Display a listing of the resource.
     */
    // Dans EventsController.php
public function index()
{
    $events = Events::orderBy('start_date', 'desc')->get();
    
    return Inertia::render('EventList', [
        'events' => $events // Assurez-vous que c'est bien 'events' comme clé
    ]);
}
public function showEvents(): Response
{
    $events = Events::all();

    return Inertia::render('Events', [
        'events' => $events
    ]);
}
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Events/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      
       
        logger()->info('🎯 Event incoming', $request->all());
          $validated= $request->validate([
            'title' => 'required|string|max:200',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'location' => 'required|string|max:200',
           'event_type' => 'required|string|max:100',
            'max_participants' => 'nullable|integer|min:1',
        
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
    
        ]);
        $imagePath = null;
         if ($request->hasFile('image')) { 
        $imagePath = $request->file('image')->store('events', 'public');
         }
        $event= Events::create([
        'title' => $validated['title'], // ou corrigez le nom dans le frontend
        'description' => $validated['description'],

        'start_date' => Carbon::parse($validated['start_date'])->format('Y-m-d H:i:s'),
        'end_date' => Carbon::parse($validated['end_date'])->format('Y-m-d H:i:s'),
        'location' => $validated['location'],
        'max_participants' => $validated['max_participants'],
        'event_type' => $validated['event_type'],
        'statut' => 'planifié',
        'image' => $imagePath,
        'id_organisateur' => Auth::id(),
    ]);
    return redirect()->route('event.index')->with('success', 'Événement créé avec succès')->with('newEvent', $event->fresh());

}
    /**
     * Display the specified resource.
     */
    public function show($id)
    { 
        return Inertia::render('Evenements/Show', [
            'evenement' => $evenement->load('categories')
        ]);
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Events $events)
    { 
        return Inertia::render('Evenements/Edit', [
            'evenement' => $evenement
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    { 
        if (Auth::id() !== $evenement->id_organisateur) { 
            return redirect()->route('evenements.index')->with('error', 'Accès non autorisé');
        }

        $request->validate([
            'titre' => 'sometimes|string|max:200',
            'description' => 'nullable|string',
            'date_debut' => 'sometimes|date',
            'date_fin' => 'sometimes|date|after_or_equal:date_debut',
            'lieu' => 'sometimes|string|max:200',
            'adresse' => 'nullable|string',
            'capacite_max' => 'nullable|integer|min:1',
            'type_evenement' => 'nullable|string|max:100',
            'statut' => 'sometimes|in:planifié,en cours,terminé,annulé',
            'image_url' => 'nullable|url',
        ]);

        $evenement->update($request->all());

        return redirect()->route('evenements.index')->with('success', 'Événement mis à jour avec succès !');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    { 
        if (Auth::id() !== $evenement->id_organisateur) { 
            return redirect()->route('evenements.index')->with('error', 'Accès non autorisé');
        }

        $evenement->delete();

        return redirect()->route('evenements.index')->with('success', 'Événement supprimé avec succès !');
        }
    



//     public function showRegistrationForm($id)
//     {
//           $event = Events::findOrFail($id);

//           logger()->info("Event found: ", [$event]);


//         return Inertia::render('EventSignUp', [
//             'event' => $event
//          ]);
//    }

public function showRegistrationForm($id)
{
    \Log::info("Tentative d'accès à l'événement ID: " . $id);
    $event = Events::findOrFail($id); // Lance une 404 si l'événement n'existe pas
    return Inertia::render('EventSignUp', ['event' => $event]);
}

// public function register(Request $request, $id)
// {
//     // 1. Valider les données envoyées (ici que l'utilisateur accepte les CGU)
//     $request->validate([
//         'name'        => 'required|string|min:2',
//         'email'       => 'required|email',
//         'acceptTerms' => 'accepted',
//         // ajoutez d'autres règles si besoin
//     ]);

//     // 2. Vérifier qu’il n’est pas déjà inscrit
//     if (Inscription::where('id_event', $id)->where('id_user', Auth::id())->exists()) {
//         return back()->withErrors(['already_registered' => 'Vous êtes déjà inscrit à cet événement.']);
//     }

//     // 3. Créer l’inscription
//     Inscription::create([
//         'id_event'       => $id,
//         'id_user'        => Auth::id(),
//         'statut'         => 'confirmé',
//         'commentaire'    => $request->input('commentaire'),
//     ]);

//     // 4. Rediriger vers la liste des participants avec message de succès
//     return redirect()
//         ->route('event.participants', ['event' => $id])
//         ->with('success', 'Inscription réussie !');
// }


public function register(Request $request, $id)
{
    $event = Events::findOrFail($id);

    $request->validate([
        'name' => 'required|string|min:2',
        'email' => 'required|email',
        'phone' => 'nullable|string|min:10',
        'company' => 'nullable|string|max:100',
        'comment' => 'nullable|string|max:255',
        'acceptTerms' => 'accepted'
    ]);

    // vérifier si l'email est déjà inscrit à cet event
    $exists = Inscription::where('id_event', $id)
    ->where('email', $request->email)
    ->exists();

if ($exists) {
    return back()->withErrors([
        'already_registered' => 'Une inscription avec cet email existe déjà pour cet événement.'
    ]);
}

    Inscription::create([
    'id_event' => $id,
    'nom' => $request->name,
    'email' => $request->email,
    'telephone' => $request->phone,
    'entreprise' => $request->company,
    'commentaire' => $request->comment,
    'statut' => 'confirmé',
]);

    return redirect()->route('event.participants', ['event' => $id])
        ->with('success', 'Inscription réussie !');
}


// public function showParticipants($event)
// {
//     $event = Events::withCount('inscriptions')->findOrFail($event);
//     $participants = Inscription::with('utilisateur')
//         ->where('id_event', $event->id_event)
//         ->get()
//         ->map(fn($insc) => [
//             'id'               => $insc->id_inscription,
//             'name'             => $insc->utilisateur->name,
//             'email'            => $insc->utilisateur->email,
//             'registrationDate' => $insc->date_inscription,
//             'company'          => $insc->commentaire, 
//             'attended'         => $insc->statut === 'confirmé',
//         ]);

//     return Inertia::render('EventParticipants', [
//         'event'        => $event,
//         'participants' => $participants,
//     ]);
// }


public function showParticipants($id)
{
    // Récupère l'événement
    $event = Events::findOrFail($id);

    // Récupère les inscriptions associées
    $participants = Inscription::where('id_event', $id)->get();

    return Inertia::render('EventParticipants', [
        'event' => [
            'id' => $event->id_event,
            'title' => $event->title,
            'date' => $event->start_date,
            'location' => $event->location,
            'participantsCount' => $participants->count(),
            'maxParticipants' => $event->max_participants,
            'category' => $event->event_type,
            'description' => $event->description,
        ],
        'participants' => $participants->map(function ($insc) {
            return [
                'id' => $insc->id_inscription,
                'name' => $insc->nom,
                'email' => $insc->email,
                'registrationDate' => $insc->created_at,
                'company' => $insc->entreprise ?? '-',
                'attended' => $insc->statut === 'confirmé',
            ];
        }),
    ]);
}
 }

 