@extends('layouts.app')

@section('title', $post->title . ' - ' . config('app.name'))
@section('meta_description', Str::limit(strip_tags($post->content), 160))
@section('meta_keywords', $post->tags ?? 'blog, laravel, cms') {{-- optional tags --}}
@section('meta_image', $post->featured_image ? asset('storage/' . $post->featured_image) : asset('images/og-default.png'))

@section('content')
<article>
    <h1>{{ $post->title }}</h1>
    <p class="text-muted">Published on {{ $post->created_at->format('M d, Y') }}</p>

    @if($post->featured_image)
        <img src="{{ asset('storage/' . $post->featured_image) }}" alt="{{ $post->title }}" class="img-fluid mb-3">
    @endif

    <div class="blog-content">
        {!! $post->content !!}
    </div>
</article>
@endsection
