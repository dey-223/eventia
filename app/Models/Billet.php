<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class billets extends Model
{
    protected $primaryKey = 'id_billet';
    protected $fillable = ['id_event', 'id_user', 'prix', 'statut'];

  public function billets()
    {
        return $this->hasManyThrough(Billet::class, Inscription::class, 'id_user', 'id_inscription', 'id_user', 'id_inscription');
        // Un user a plusieurs billets via ses inscriptions
    }
}
