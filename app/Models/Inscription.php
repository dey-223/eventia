<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Inscription extends Model
{
    
    protected $table = 'inscriptions';
    protected $primaryKey = 'id_inscription';
    protected $fillable = ['id_evenement', 'id_user', 'statut','commentaire'];

    public function evenement()
    {
        return $this->belongsTo(Event::class, 'id_evenement','id_evenement');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user','id_user');
    }
    public function billets()
    {
        return $this->hasMany(Billet::class, 'id_inscription', 'id_inscription');
    }
}
