<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Models\Page;

class PostController extends Controller
{
    /**
     * Blog listing page
     */
    public function index()
    {
        $posts = Post::where('is_published', true)
            ->latest()->get();
        $pages = Page::where('is_published', true)
            ->latest()
            ->get();

        return view('blog.index', compact('posts', 'pages'));
    }

    /**
     * Blog detail page
     */
    public function show($id, $slug)
    {
        $post = Post::where('id', $id)
                    ->where('is_published', true)
                    ->firstOrFail();
                    
        $pages = Page::where('is_published', true)
            ->latest()
            ->get();

        return view('blog.show', compact('post', 'pages'));
    }

}
