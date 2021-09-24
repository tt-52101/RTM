<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class AccesoUsuario extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $table='AccesoUsuario';
    protected $fillable = [
        'IDAcceso',
        'IDUsuario'
    ];

}
