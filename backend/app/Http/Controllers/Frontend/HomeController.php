<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Page;

class HomeController extends Controller
{
    public function index()
    {
        $posts = Post::where('is_published', true)
            ->latest()
            ->take(6)
            ->get();
        $pages = Page::where('is_published', true)
            ->latest()
            ->get();

        return view('home', compact('posts', 'pages'));
    }
}
