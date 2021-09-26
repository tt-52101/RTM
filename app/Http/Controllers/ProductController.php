<?php

namespace App\Http\Controllers;

use App\Producto;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    //
    use ApiResponser;

    public function __construct() {}

    public function getProductByFilter(Request $request) {
        $idAlmacen = 1;
        $filter = $request->filter;
        $products = Producto::select('IDProducto', 'Producto', 'PVenta', DB::raw("'pr' as type"), 'URLImagen', DB::raw("0 as edit"))
            ->where($filter)->where('IDAlmacen',1)->distinct()->get();
//        $products = collect($products)->groupBy('IDProducto')->toArray();
//        foreach ($products as $key => $product){
//            return response()->json($product);
//        }

        $query = "SELECT p.Paquete , p2.Producto , p.Costo as PVentaPaquete , p2.PVenta, p.IDPaquete , p2.IDProducto , p.IDAlmacen ,
        p.URLImagen as URLImagenPaquete, p2.URLImagen, 0 as edit
        from Paquete p 
        inner join PaqueteProducto pp on p.IDPaquete  = pp.IDPaquete and p.IDAlmacen  = pp.IDAlmacenProducto 
        inner join Producto p2 on pp.IDProducto  = p2.IDProducto and p2.IDAlmacen  = pp.IDAlmacen 
        where p.IDAlmacen = $idAlmacen";


        $resultPackage = DB::select( DB::raw($query) );
        $resultPackage = collect($resultPackage);
        $resultPackage=$resultPackage->groupBy('IDPaquete')->toArray();

        $temp= [];

        foreach ($products as $element){
            array_push($temp,$element);
        }


        foreach ($resultPackage as $key => $package){
            $tempPackage = [
                'IDProducto' => $package[0]->IDPaquete.'Q',
                'Producto' => $package[0]->Paquete,
                'PVenta' =>$package[0]->PVentaPaquete,
                'URLImagen'=>$package[0]->URLImagenPaquete,
                'type' => 'pq',
                'edit'=>0,
                'products'=>$package

            ];
            array_push($temp,$tempPackage);
        }


        return $this->successResponse($temp);

    }
}
