<?php

namespace App\Http\Controllers;

use App\Producto;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    //
    //
    use ApiResponser;

    public function __construct() {}

    public function store(Request $request) {

        return $this->successResponse(['data'=>'correct']);
    }
}
