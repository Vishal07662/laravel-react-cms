<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class RequestLogger
{
    public function handle(Request $request, Closure $next)
    {
        // before response
        $start = microtime(true);

        $response = $next($request);

        // after response
        $duration = round((microtime(true) - $start) * 1000, 2); // ms

        Log::channel('requestlog')->info('API REQUEST', [
            'method'   => $request->method(),
            'url'      => $request->fullUrl(),
            'ip'       => $request->ip(),
            'payload'  => $request->all(),
            'status'   => $response->getStatusCode(),
            'duration' => $duration . 'ms',
            'user_id'  => optional($request->user())->id,
        ]);

        return $response;
    }
}
