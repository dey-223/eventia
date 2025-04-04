<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class billets extends Model
{
    protected $primaryKey = 'id_billet';
    protected $fillable = ['id_evenement', 'id_user', 'prix', 'statut'];

    public function evenement()
    {
        return $this->belongsTo(Evenement::class, 'id_evenement');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user');
    }
}
