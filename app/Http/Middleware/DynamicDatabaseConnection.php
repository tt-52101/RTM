<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Closure;
use App\Empresa;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;

class DynamicDatabaseConnection extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $empresa = Empresa::where('IDEmpresa', $request->header('company_id'))->first();
        Config::set('database.connections.mysql.database', $empresa->IDBBDD);
        Config::set('database.connections.mysql.username', $empresa->UsuarioBBDD);
        Config::set('database.connections.mysql.password', $empresa->PwrBBDD);

        DB::purge('mysql');
        DB::reconnect('mysql');

        return $next($request);
    }
}
