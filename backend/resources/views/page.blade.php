@extends('layouts.app')

@section('title', $page->title)

@section('content')
<article class="bg-white rounded shadow p-6">
    <h1 class="text-3xl font-bold mb-4">{{ $page->title }}</h1>
    <div class="prose max-w-full">
        {!! $page->content !!}
    </div>
</article>
@endsection
