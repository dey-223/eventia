<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Events extends Model
{
    

    protected $table = 'events';
    protected $primaryKey = 'id_event';
    protected $fillable = [
        'title', 'description', 'start_date', 'end_date',
        'location', 'image', 'event_type', 'statut', 'max_participants',
        'id_organisateur', 'date_creation'
    ];

    public function organisateur()
    {
        return $this->belongsTo(User::class, 'id_organisateur', 'id_user');
    }

    public function categories()
    {
        return $this->belongsToMany(Categorie::class, 'evenement_categories', 'id_event', 'id_categorie');
    }

    public function inscriptions()
    {
        return $this->hasMany(Inscription::class, 'id_event', 'id_event');
    }
}
