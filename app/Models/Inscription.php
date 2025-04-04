<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    
    protected $table = 'inscriptions';
    protected $primaryKey = 'id_inscription';
    protected $fillable = ['id_evenement', 'id_utilisateur', 'statut', 'commentaire'];

    public function evenement()
    {
        return $this->belongsTo(Evenement::class, 'id_evenement', 'id_evenement');
    }

    public function utilisateur()
    {
        return $this->belongsTo(Utilisateur::class, 'id_utilisateur', 'id_utilisateur');
    }
}
