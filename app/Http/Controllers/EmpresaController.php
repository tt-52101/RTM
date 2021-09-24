<?php

namespace App\Http\Controllers;

use App\Empresa;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;

class EmpresaController extends Controller
{
    use ApiResponser;

    public function __construct() {}

    public function index(Request $request) {
        $response = Empresa::select('IDEmpresa as value','NombreEmpresa as text')->where('IDTipoPlan',1)->get();
        return $this->successResponse($response);
    }
}
