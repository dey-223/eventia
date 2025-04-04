<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Events extends Model
{
    

    protected $table = 'events';
    protected $primaryKey = 'id_evenement';
    protected $fillable = [
        'titre', 'description', 'date_debut', 'date_fin', 'lieu',
        'adresse', 'capacite_max', 'type_evenement', 'statut', 'image_url', 'id_organisateur'
    ];

    public function organisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'id_organisateur', 'id_utilisateur');
    }

    public function categories()
    {
        return $this->belongsToMany(Categorie::class, 'evenement_categories', 'id_evenement', 'id_categorie');
    }

    public function inscriptions()
    {
        return $this->hasMany(Inscription::class, 'id_evenement', 'id_evenement');
    }
}
