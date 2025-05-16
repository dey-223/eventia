<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class billet extends Model
{       
    protected $table = 'billets';
    protected $primaryKey = 'id_billet';
    // protected $fillable = ['id_evenement', 'id_user', 'prix', 'statut'];
    protected $fillable = [
        'id_inscription', 'type_billet', 'prix', 'code_qr', 'date_emission', 'validite'
    ];

    public function inscription()
    {
        return $this->belongsTo(Inscription::class, 'id_inscription', 'id_inscription');
    }
}
