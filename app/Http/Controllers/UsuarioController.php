<?php

namespace App\Http\Controllers;

use App\User;
use App\Acceso;
use App\AccesoUsuario;
use App\Traits\ApiResponser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UsuarioController extends Controller
{
    use ApiResponser;

    public function __construct() {}

    public function index(Request $request) {
        $response = User::select(DB::raw('IDUsuario as id,Login as username,Nombre as name,"active" as status,"true" as is_verified'))->get();
        return $this->successResponse($response);
    }

    public function show($id) {

        $userDetail = User::select(DB::raw('IDUsuario as id,Login as username,Nombre as name,"active" as status,"true" as is_verified'))
                    ->where('IDUsuario', $id)
                    ->get();

        $access = Acceso::where('idacc', 'LIKE', "%000000")->orderBy("idacc")->get();
        $accessByUser = AccesoUsuario::
                join('accesos_ejemplo','AccesoUsuario.IDAcceso','=','accesos_ejemplo.idacc')
                ->select('accesos_ejemplo.idacc', 'accesos_ejemplo.acc')
                ->where('AccesoUsuario.IDUsuario', $id)
                ->get();

        $arreglo_one = [];
        $arreglo_two = [];

        foreach ($access as $pr) {
            $dt = [
                'id' => $pr['idacc'],
                'label' => $pr['acc'],
                'children' => $this->getChildOne(substr($pr['idacc'],0,2))
            ];
            array_push($arreglo_one, $dt);
        }

        foreach ($accessByUser as $pr) {
            $dt = [
                $pr['idacc']
            ];
            array_push($arreglo_two, $dt);
        }

        $data = [
            "userDetail" => $userDetail,
            "access" => $arreglo_one,
            "accessByUser" => $arreglo_two
        ];


        return $this->successResponse($data);
    }

    public function getChildOne($id){

        $principal = Acceso::where('idacc', 'LIKE', $id."%0000")
            ->whereNotIn('idacc',Acceso::select('idacc')->where('idacc', 'LIKE', "%000000")->orderBy("idacc")->get())
            ->orderBy("idacc")->get();
        $arreglo = [];

        foreach ($principal as $pr) {
                $countChild =  Acceso::where('idacc','LIKE',''.substr($pr['idacc'],0,4).'%')
                            ->whereNotIn('idacc',Acceso::select('idacc')->where('idacc', 'LIKE', "%0000")->orderBy("idacc")->get())
                            ->orderBy("idacc")->count();

                if($countChild > 1) {
                    $dt = [
                        'id' => $pr['idacc'],
                        'label' => $pr['acc'],
                        'children' => $this->getChildTwo($pr['idacc'],0,4)
                    ];
                    array_push($arreglo, $dt);
                } else {
                    $dt = [
                        'id' => $pr['idacc'],
                        'label' => $pr['acc'],
                    ];
                    array_push($arreglo, $dt);
                }


        }

        return $arreglo;
    }

    public function getChildTwo($id) {

        $arreglo = [];

        $principal = Acceso::where('idacc','LIKE',''.substr($id,0,4).'%00')
        ->whereNotIn('idacc',Acceso::select('idacc')->where('idacc', 'LIKE', "%0000")->orderBy("idacc")->get())
        ->orderBy("idacc")->get();

        foreach ($principal as $pr) {

            $child = Acceso::where('idacc','LIKE',''.substr($pr['idacc'],0,6).'%')
            ->whereNotIn('idacc',Acceso::select('idacc')->where('idacc', 'LIKE', "%00")->orderBy("idacc")->get())
            ->orderBy("idacc")->get();

            $countChild =  Acceso::where('idacc','LIKE',''.substr($pr['idacc'],0,6).'%')
                        ->whereNotIn('idacc',Acceso::select('idacc')->where('idacc', 'LIKE', "%00")->orderBy("idacc")->get())
                        ->orderBy("idacc")->count();

            if($countChild > 1) {
                $dt = [
                    'id' => $pr['idacc'],
                    'label' => $pr['acc'],
                    'children' => $this->getChildThree($child)
                ];
                array_push($arreglo, $dt);
            } else {
                $dt = [
                    'id' => $pr['idacc'],
                    'label' => $pr['acc'],
                ];
                array_push($arreglo, $dt);
            }

        }
        return $arreglo;
    }

    public function getChildThree($principal) {

        $arreglo = [];

        foreach ($principal as $pr) {

            $dt = [
                'id' => $pr['idacc'],
                'label' => $pr['acc'],
            ];
            array_push($arreglo, $dt);
        
        }
        return $arreglo;
    }

    public function update(Request $request, $id) {

        foreach ($request->accesos as $pr) {

            $acceso = new AccesoUsuario;
            $acceso->IDAcceso = $pr['idAcceso'];
            $acceso->IDUsuario = $id;
            $acceso->save();
        }

        $user = User::find($id);
        $user->Login = $request->username;
        $user->Nombre = $request->name;
        
        if($user->save()){

            $accessByUser = AccesoUsuario::
            join('accesos_ejemplo','AccesoUsuario.IDAcceso','=','accesos_ejemplo.idacc')
            ->select('accesos_ejemplo.idacc', 'accesos_ejemplo.acc')
            ->where('AccesoUsuario.IDUsuario', $id)
            ->get();

            return $this->successResponse($accessByUser);
        }
    }
}
