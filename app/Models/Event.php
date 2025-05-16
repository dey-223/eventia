<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Event;


class Event extends Model
{
    

    protected $table = 'events';
    protected $primaryKey = 'id_evenement';
    protected $fillable = [
        'title', 'description', 'start_date', 'end_date', 'location',
        'image_url','event_type','statut','max_participants','id_organisateur','date_creation'
    ];
    // protected $casts = [
    //     'start_date' => 'datetime',
    //     'end_date' => 'datetime',
        
    // ];

    public function organisateur()
    {
        return $this->belongsTo(User::class, 'id_organisateur', 'id_user');
    }

    public function categories()
    {
        return $this->belongsToMany(Categorie::class, 'evenement_categories', 'id_evenement', 'id_categorie');
    }

    public function inscriptions()
    {
        return $this->hasMany(Inscription::class, 'id_evenement','id_evenement' );
    }

    // public function billets()
    // {
    //     return $this->hasMany(Billet::class, 'id_evenement','id_evenement');
    // }
}
