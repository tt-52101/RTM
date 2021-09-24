<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Acceso extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $table='accesos_ejemplo';
    protected $fillable = [
        'idacc',
        'acc'
    ];

}
