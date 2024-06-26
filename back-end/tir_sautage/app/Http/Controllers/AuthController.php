<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\Session\Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;



class AuthController extends Controller
{
    //
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:250',
            'email' => 'email|max:250|unique:users',
            'password' => 'required|min:8',
            'isAdmin' => 'boolean'
        ]);

        $data = [
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ];

        // Check if isAdmin is provided
        if ($request->has('isAdmin')) {
            $data['isAdmin'] = $request->isAdmin;
        }

        $user = User::create($data);

        Auth::attempt($request->only('email', 'password'));

        return response()->json(['User' => $user]);
    }
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'name' => 'required|string',
            'password' => 'required'
        ]);



        if (Auth::attempt($request->only('name', 'password'))) {
            $user = Auth::user();
            if (Auth::user()->isAdmin) {
                $token = $user->createToken('auth-token', abilities: ['admin-rules'])
                    ->plainTextToken;
            } else {
                $token = $user->createToken('auth-token')->plainTextToken;
            }

            return response()->json(['token' => $token, 'isAdmin' => $user->isAdmin ? true : false]);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
