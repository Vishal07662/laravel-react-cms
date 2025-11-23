@extends('layouts.app')

@section('title', 'Home')
@section('content')
<h1 class="mb-4">Latest Posts</h1>

<div class="row">
    @if ($posts->count())
        @foreach($posts as $post)
            <div class="col-md-6 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">
                            <a href="{{ url('/blog/' .$post->id.'-'. $post->slug) }}">{{ $post->title }}</a>
                        </h5>
                        <p class="card-text">
                            {!! Str::limit(strip_tags($post->content), 200) !!}
                        </p>
                    </div>
                    <div class="card-footer text-muted">
                        Published on {{ $post->created_at->format('M d, Y') }}
                    </div>
                </div>
            </div>
        @endforeach
    @else
        <div class="col-12">
            <div class="alert alert-warning d-flex align-items-center justify-content-center" role="alert">
                <!-- Triangle exclamation icon -->
                <span class="me-2" style="font-size: 1.5rem;">&#9888;</span>
                <span>No blogs found</span>
            </div>
        </div>
    @endif
</div>
@endsection
