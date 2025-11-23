<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::with(['author'])->latest();

        if (! $request->user()) {
            $query->where('is_published', true);
        }

        $posts = $query->get();

        return PostResource::collection($posts);
    }

    public function store(StorePostRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = $request->user()->id;

        if (empty($data['slug']) && !empty($data['title'])) {
            $data['slug'] = $this->makeUniqueSlug($data['title']);
        }

        if (!empty($data['is_published'])) {
            $data['published_at'] = now();
        }
        
        if ($request->hasFile('featured_image')) {
            $data['featured_image'] = $request->file('featured_image')->store('posts', 'public');
        }

        $post = Post::create($data);

        return (new PostResource($post->load(['author'])))
            ->response()
            ->setStatusCode(201);
    }

    public function show(Post $post, Request $request)
    {
        return new PostResource($post->load(['author']));
    }

    public function update(UpdatePostRequest $request, Post $post)
    {
        $data = $request->validated();

        if (array_key_exists('title', $data) && ! array_key_exists('slug', $data)) {
            $data['slug'] = $this->makeUniqueSlug($data['title'], $post->id);
        }

        if (array_key_exists('is_published', $data)) {
            $data['published_at'] = $data['is_published'] ? now() : null;
        }

        // upload new image
        if ($request->hasFile('featured_image')) {
            if ($post->featured_image && \Storage::disk('public')->exists($post->featured_image)) {
                \Storage::disk('public')->delete($post->featured_image);
            }

            $data['featured_image'] = $request->file('featured_image')->store('posts', 'public');
        }
        
        $post->update($data);
        
        return new PostResource($post->fresh()->load(['author']));
    }

    public function destroy(Request $request, Post $post)
    {
        $user = $request->user();
        if ($post->user_id !== $user->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $post->delete();

        return response()->json(['message' => 'Post deleted'], 200);
    }

    public function publish(Request $request, Post $post)
    {
        if (! $request->user()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $post->is_published = ! $post->is_published;
        $post->published_at = $post->is_published ? now() : null;
        $post->save();

        return new PostResource($post->fresh()->load(['author']));
    }

    protected function makeUniqueSlug(string $title, ?int $ignoreId = null): string
    {
        $base = Str::slug($title);
        $slug = $base;
        $i = 1;

        while (Post::where('slug', $slug)
            ->when($ignoreId, fn($q) => $q->where('id', '!=', $ignoreId))
            ->exists()
        ) {
            $slug = $base . '-' . $i++;
        }

        return $slug;
    }
}
