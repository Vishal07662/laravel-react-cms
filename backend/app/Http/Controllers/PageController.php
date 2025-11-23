<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePageRequest;
use App\Http\Requests\UpdatePageRequest;
use App\Http\Resources\PageResource;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class PageController extends Controller
{
    public function index()
    {
        return PageResource::collection(Page::latest()->get());
    }

    public function store(StorePageRequest $request)
    {
        $data = $request->validated();

        if (empty($data['slug']) && !empty($data['title'])) {
            $data['slug'] = Str::slug($data['title']);
            // ensure uniqueness
            $base = $data['slug'];
            $i = 1;
            while (Page::where('slug', $data['slug'])->exists()) {
                $data['slug'] = $base . '-' . $i++;
            }
        }

        $page = Page::create($data);

        return (new PageResource($page))->response()->setStatusCode(201);
    }

    public function show(Page $page, Request $request)
    {
        return new PageResource($page);
    }

    public function update(UpdatePageRequest $request, Page $page)
    {
        $user = $request->user();
        $data = $request->validated();
        if (array_key_exists('title', $data) && ! array_key_exists('slug', $data)) {
            $data['slug'] = Str::slug($data['title']);
        }
        $page->update($data);

        return new PageResource($page->fresh());
    }

    
    public function publish(Request $request, Page $page)
    {
        if (! $request->user()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $page->is_published = ! $page->is_published;
        $page->save();

        return new PageResource($page->fresh());
    }

    public function destroy(Request $request, Page $page)
    {
        $page->delete();

        return response()->json(['message' => 'Page deleted'], 200);
    }

}
