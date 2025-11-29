<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Commande extends Model
{
    /** @use HasFactory<\Database\Factories\CommandeFactory> */
    use HasFactory;

    protected $guarded = []; 

    public function user() : BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    public function Produits(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'detail_commandes')->withPivot('quantite')->withTimestamps();
    }
}
