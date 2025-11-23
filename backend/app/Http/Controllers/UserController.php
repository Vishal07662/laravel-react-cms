<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        if (! $request->user()) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return UserResource::collection(User::latest());
    }

    public function show(User $user, Request $request)
    {
        $auth = $request->user();
        if (!$auth) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        if ($auth->id !== $user->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return new UserResource($user);
    }

    public function update(Request $request, User $user)
    {
        $auth = $request->user();
        if (! $auth) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        if (!$auth->id !== $user->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:users,email,' . $user->id,
            'password' => 'sometimes|nullable|string|min:6|confirmed'
        ]);

        if (! empty($data['password'])) {
            $data['password'] = bcrypt($data['password']);
        } else {
            unset($data['password']);
        }

        $user->update($data);

        return new UserResource($user->fresh());
    }

    public function destroy(Request $request, User $user)
    {
        if (! $request->user()) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        if ($request->user()->id === $user->id) {
            return response()->json(['message' => 'You cannot delete yourself'], 422);
        }

        $user->delete();

        return response()->json(['message' => 'User deleted'], 200);
    }
}
