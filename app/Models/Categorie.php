<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
class Categories extends Model
{

    protected $table = 'categories';
    protected $primaryKey = 'id_categorie';
    protected $fillable = ['nom_categorie', 'description'];

    public function evenements()
    {
        return $this->belongsToMany(Events::class, 'evenement_categories', 'id_categorie', 'id_event');
    }
}

