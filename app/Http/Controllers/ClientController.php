<?php

namespace App\Http\Controllers;

use App\Producto;
use App\Traits\ApiResponser;
use App\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ClientController extends Controller
{
    use ApiResponser;

    public function __construct() {}

    public function getClientByWarehouse(Request $request){

        $warehouse = 1;
        $clients = Client::select('IDCliente', 'Cliente', 'Direccion', 'Documento', DB::raw(" (concat(Cliente, ' - ',Documento )) as name "))->where('IDAlmacen', $warehouse)->get();

        return $this->successResponse($clients);
    }
}
