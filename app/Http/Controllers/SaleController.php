<?php

namespace App\Http\Controllers;

use App\Producto;
use App\Sale;
use App\Traits\ApiResponser;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    //
    //
    use ApiResponser;

    public function __construct() {}

    public function store(Request $request) {

        $pointAtention = 1;
        $almacen = 1;
        $typeDocument = 1;
        $idClient = $request->client->IDCliente;
        $ObsInterna = $request->headSale->commentInt;
        $ObsExterna = $request->headSale->commentExt;
        $FechaHora = Carbon::now()->toDateString();
        $NumComprobanteFisico = $request->headSale->numNota;

        $newSale = new Sale();
        $newSale->IDVenta;






        return $this->successResponse(['data'=>'correct']);
    }
}
