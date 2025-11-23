<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    {{-- Dynamic Page Title --}}
    <title>@yield('title', config('app.name'))</title>

    <meta name="description" content="@yield('meta_description', 'Welcome to ' . config('app.name'))">
    <meta name="keywords" content="@yield('meta_keywords', 'blog, cms, laravel, posts, pages')">

    <meta property="og:title" content="@yield('title', config('app.name'))">
    <meta property="og:description" content="@yield('meta_description', 'Welcome to ' . config('app.name'))">
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:image" content="@yield('meta_image', asset('images/og-default.png'))">

    {{-- Twitter Card --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="@yield('title', config('app.name'))">
    <meta name="twitter:description" content="@yield('meta_description', 'Welcome to ' . config('app.name'))">
    <meta name="twitter:image" content="@yield('meta_image', asset('images/og-default.png'))">

    <link rel="canonical" href="{{ url()->current() }}">
    <link rel="stylesheet" href="{{ asset('css/bootstrap.min.css') }}">

    <style>
        body {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
        }

        header {
            background-color: #343a40;
            color: white;
        }

        header a {
            color: white;
            text-decoration: none;
        }

        header a:hover {
            text-decoration: underline;
        }

        main {
            flex: 1 0 auto;
            padding: 2rem;
            background-color: #f8f9fa;
            overflow-y: auto;
        }

        footer {
            flex-shrink: 0;
            background-color: #343a40;
            color: white;
            padding: 1rem 0;
            text-align: center;
        }

        .content-card {
            background-color: white;
            padding: 1.5rem;
            border-radius: 0.5rem;
            box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,0.075);
        }
    </style>

    @stack('head')
</head>
<body>
    @include('partials.header')

    <main class="container">
        <div class="content-card">
            @yield('content')
        </div>
    </main>

    @include('partials.footer')

    @stack('scripts') {{-- Allow page-specific scripts --}}
</body>
</html>
