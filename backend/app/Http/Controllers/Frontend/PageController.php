<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Models\Page;

class PageController extends Controller
{
    /**
     * Dynamic Page by slug
     */
    public function show($id, $slug)
    {
        $page = Page::where('id', $id)
            ->where('is_published', true)
            ->firstOrFail();

        $pages = Page::where('is_published', true)
            ->latest()
            ->get();

        return view('page.show', compact('page', 'pages'));
    }
}
