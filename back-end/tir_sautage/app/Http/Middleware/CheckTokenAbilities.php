<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class CheckTokenAbilities
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$abilities)
    {
        $user = Auth::user();

        // Check if $user->tokenAbilities is null, and initialize it as an empty array if needed
        $tokenAbilities = $user->tokenAbilities ?? [];

        foreach ($abilities as $ability) {
            if (!in_array($ability, $tokenAbilities)) {
                return response()->json(['error' => 'Unauthorized'], 403);
            }
        }

        return $next($request);
    }
}
