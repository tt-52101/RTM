<?php

namespace App;
use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $table='Empresa';
    protected $primaryKey = 'IDEmpresa';
    protected $fillable = [
        'IDEmpresa',
        'NombreEmpresa',
        'IDPais',
        'IDVersion',
        'IDApp',
        'IDFElectronica',
        'Fecha_Inicio',
        'Fecha_Fin',
        'IDBBDD',
        'UsuarioBBDD',
        'PwrBBDD',
        'CorreoUsuario',
        'CorreoPwr',
        'ColorFondo',
        'IDEstado',
        'URLImagen',
        'IDTipoPlan',
        'Ruta'
    ];

}
