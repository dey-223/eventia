<?php

namespace App\Http\Controllers;

use App\Models\Events;
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
            'events' => Events::all(),
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
            'titre' => 'required|string|max:200',
            'description' => 'nullable|string',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after_or_equal:date_debut',
            'lieu' => 'required|string|max:200',
            'adresse' => 'nullable|string',
            'capacite_max' => 'nullable|integer|min:1',
            'type_evenement' => 'nullable|string|max:100',
            'statut' => 'required|in:planifié,en cours,terminé,annulé',
            'image_url' => 'nullable|url',
        ]);

        Events::create([
            'titre' => $request->titre,
            'description' => $request->description,
            'date_debut' => $request->date_debut,
            'date_fin' => $request->date_fin,
            'lieu' => $request->lieu,
            'adresse' => $request->adresse,
            'capacite_max' => $request->capacite_max,
            'type_evenement' => $request->type_evenement,
            'statut' => $request->statut,
            'image_url' => $request->image_url,
            'id_organisateur' => Auth::id(),
        ]);

        return redirect()->route('events.index')->with('success', 'Événement créé avec succès !');
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
    
    
}
