<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Page;

class DashboardController extends Controller
{
    public function index()
    {
        return response()->json([
            'posts' => Post::count(),
            'pages' => Page::count(),
            'publishedPosts' => Post::where('is_published', true)->count(),
            'publishedPages' => Page::where('is_published', true)->count(),
        ]);
    }
}
