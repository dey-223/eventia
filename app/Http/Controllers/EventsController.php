<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
class EventsController extends Controller

{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $evenements = Evenement::with('categories')->get();

        return Inertia::render('Events', [
            // 'evenements' => $evenements
            'events' => Event::all(),
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
        $request->validate([
            'title' => 'required|string|max:200',
            'description' => 'nullable|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:date_debut',
            'location' => 'required|string|max:200',
            // 'adresse' => 'nullable|string',
            'max_participants' => 'nullable|integer|min:1',
            'event_type' => 'nullable|string|max:100',
            'category' => 'required|string',
            'statut' => 'planifié',
            'ticketPrice' => 'required|numeric|min:0',
            'image_url' => 'nullable|url'
        ]);
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('events', 'public');
            $validated['image'] = $path;
        }

        Event::create([
            'title' => $request->titre,
            'description' => $request->description,
            'start_date' => $request->date_debut,
            'end_date' => $request->date_fin,
            'location' => $request->lieu,
            // 'adresse' => $request->adresse,
            'max_participants' => $request->capacite_max,
            'event_type' => $request->type_evenement,
            'statut' => 'planifié',
            'ticketPrice' => $request->ticketPrice,
            'image_url' => $request->image_url,
            'id_organisateur' => Auth::id(),
        ]);

        return redirect()->route('events.index')->with('success', 'Événement créé avec succès !');
    }

    /**
     * Display the specified resource.
     */
    // public function show($id)
    // {
    //     return Inertia::render('Evenements/Show', [
    //         'evenement' => $evenement->load('categories')
    //     ]);
    // }
    public function show(Events $evenement)
{
    return Inertia::render('Evenements/Show', [
        'evenement' => $evenement->load('categories'),
    ]);
}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Events $evenement)
    {
        return Inertia::render('Evenements/Edit', [
            'evenement' => $evenement
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id,Events $evenement)
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
    public function destroy($id,Events $evenement)
    {
        if (Auth::id() !== $evenement->id_organisateur) {
            return redirect()->route('evenements.index')->with('error', 'Accès non autorisé');
        }

        $evenement->delete();

        return redirect()->route('evenements.index')->with('success', 'Événement supprimé avec succès !');
    }
    
    
}
