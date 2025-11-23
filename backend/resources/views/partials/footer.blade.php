<footer class="bg-dark text-light mt-5 pb-0">
    <div class="container py-5">
        <div class="row">

            <!-- About -->
            <div class="col-md-4 mb-4">
                <h5 class="text-white fw-bold mb-3">About</h5>
                <p class="text-secondary small">
                    Laravel CMS is a modern blogging platform built with Laravel and Bootstrap 5. Stay updated with the latest posts!
                </p>
            </div>

            <!-- Quick Links -->
            <div class="col-md-4 mb-4">
                <h5 class="text-white fw-bold mb-3">Quick Links</h5>
                <ul class="list-unstyled small">
                    <li><a href="{{ url('/') }}" class="text-secondary text-decoration-none">Home</a></li>
                    <li><a href="{{ url('/blog') }}" class="text-secondary text-decoration-none">Blog</a></li>
                    @if(isset($pages) && $pages->count())
                        @foreach($pages as $page)
                            <li class="nav-item">
                                <a href="{{ url($page->id .'-' .$page->slug) }}" class="text-secondary text-decoration-none">{{ $page->title }}</a>
                            </li>
                        @endforeach
                    @endif
                </ul>
            </div>

            <!-- Contact -->
            <div class="col-md-4 mb-4">
                <h5 class="text-white fw-bold mb-3">Contact</h5>
                <p class="text-secondary small mb-1">
                    Email: <a href="mailto:test@test.com" class="text-secondary text-decoration-none">test@test.com</a>
                </p>
                <p class="text-secondary small">
                    Phone: <a href="tel:+911234567890" class="text-secondary text-decoration-none">+91 123 456 7890</a>
                </p>
            </div>

        </div>
    </div>

    <div class="bg-secondary text-center py-3 small">
        &copy; {{ date('Y') }} Laravel CMS. All rights reserved.
    </div>
</footer>
