<header class="bg-white shadow-sm mb-4">
    <div class="container d-flex justify-content-between align-items-center py-3">

        <!-- Logo -->
        <a href="{{ url('/') }}" class="navbar-brand fw-bold text-dark">
            Laravel CMS
        </a>

        <!-- Navigation -->
        <nav class="collapse d-md-flex flex-grow-1 justify-content-end" id="navbarMenu">
            <ul class="navbar-nav d-flex flex-row gap-3 mb-0">
                <li class="nav-item">
                    <a href="{{ url('/blog') }}" class="nav-link text-dark fw-medium">Blog</a>
                </li>

                @if(isset($pages) && $pages->count())
                    @foreach($pages as $page)
                            <li class="nav-item">
                                <a href="{{ url($page->id .'-' .$page->slug) }}" class="nav-link text-dark fw-medium">{{ $page->title }}</a>
                            </li>
                        @endforeach
                @endif
            </ul>
        </nav>
    </div>
</header>
