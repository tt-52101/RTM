<?php

namespace App\Http\Controllers;

use App\Producto;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    //
    use ApiResponser;

    public function __construct() {}

    public function getProductByFilter(Request $request) {
        $filter = $request->filter;
        $products = Producto::where($filter)->where('IDAlmacen',1)->distinct()->get();
//        $products = collect($products)->groupBy('IDProducto')->toArray();
//        foreach ($products as $key => $product){
//            return response()->json($product);
//        }


        return $this->successResponse($products);

    }
}
