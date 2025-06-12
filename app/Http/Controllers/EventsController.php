<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Events;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;

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

 }
