<?php

namespace App\Http\Controllers;

use App\Models\Inscription;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InscriptionController extends Controller
{
    /**
     * Basculer le statut “confirmé” / “annulé” (ou “présent” / “absent”).
     */
    public function toggle($id)
    {
        $insc = Inscription::findOrFail($id);
        // Exemple : si “confirmé” devient “annulé”, sinon on remet “confirmé”
        $insc->statut = $insc->statut === 'confirmé' ? 'annulé' : 'confirmé';
        $insc->save();

        return redirect()->back()->with('success', 'Statut mis à jour');
    }

    /**
     * Supprimer une inscription.
     */
    public function destroy($id)
    {
        $insc = Inscription::findOrFail($id);
        $insc->delete();

        return redirect()->back()->with('success', 'Inscription supprimée');
    }
}
