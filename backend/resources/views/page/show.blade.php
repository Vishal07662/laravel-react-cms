@extends('layouts.app')

@section('title', $page->title . ' - ' . config('app.name'))
@section('meta_description', Str::limit(strip_tags($page->content), 160))
@section('meta_keywords', $page->meta_keywords ?? 'blog, laravel, cms, pages')
@section('meta_image', $page->featured_image ? asset('storage/' . $page->featured_image) : asset('images/og-default.png'))

@section('content')
<article>
    <h1>{{ $page->title }}</h1>

    @if($page->featured_image)
        <img src="{{ asset('storage/' . $page->featured_image) }}" alt="{{ $page->title }}" class="img-fluid mb-3">
    @endif

    <div class="page-content">
        {!! $page->content !!}
    </div>
</article>
@endsection
