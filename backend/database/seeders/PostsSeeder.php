<?php

namespace Database\Seeders;

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PostsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure there is at least 1 user
        $user     = User::first();

        if (! $user) {
            return;
        }
        // some posts with random data.
        Post::factory()->count(20)->create();

        // these are the first posts so that the homepage looks a little better
        $posts = [
            [
                'title'         => 'Introducing Our New Platform Features',
                'content'       => '<p>We have rolled out new features this month, focused on performance and security enhancements.</p>',
                'is_published'  => true,
                'featured_image'=> 'placeholder.jpg',
            ],
            [
                'title'         => 'How to Be More Productive',
                'content'       => '<p>Here are 10 tips to increase daily productivity and stay consistent.</p>',
                'is_published'  => true,
                'featured_image'=> 'placeholder.jpg',
            ],
            [
                'title'         => 'The State of Web Development in 2025',
                'content'       => '<p>An analysis of latest technologies, frameworks, and trends shaping the future.</p>',
                'is_published'  => false,
                'featured_image'=> null,
            ],
            [
                'title'         => 'Understanding API Security Best Practices',
                'content'       => '<p>APIs are critical. Learn how to secure them using OAuth, rate-limiting, and JWTs.</p>',
                'is_published'  => true,
                'featured_image'=> 'placeholder.jpg',
            ],
            [
                'title'         => 'Laravel 12 vs Previous Versions',
                'content'       => '<p>Discover the new features in Laravel 12 and how it differs from Laravel 11 and 10.</p>',
                'is_published'  => true,
                'featured_image'=> 'placeholder.jpg',
            ],
            [
                'title'         => 'Top 5 Frontend Frameworks to Learn in 2025',
                'content'       => '<p>A comparative guide for React, Vue, Angular, Svelte, and SolidJS.</p>',
                'is_published'  => false,
                'featured_image'=> null,
            ],
            [
                'title'         => 'Building a Blog CMS from Scratch',
                'content'       => '<p>This tutorial covers building a simple blog CMS using Laravel and React.</p>',
                'is_published'  => true,
                'featured_image'=> 'placeholder.jpg',
            ],
            [
                'title'         => 'Optimizing Web Performance',
                'content'       => '<p>Learn about caching, lazy-loading, and database optimization techniques for fast websites.</p>',
                'is_published'  => true,
                'featured_image'=> 'placeholder.jpg',
            ],
        ];

        foreach ($posts as $p) {
            Post::create([
                'title'         => $p['title'],
                'slug'          => Str::slug($p['title']),
                'content'       => $p['content'],
                'user_id'       => $user->id,
                'is_published'  => $p['is_published'],
                'published_at'  => $p['is_published'] ? now() : null,
                'featured_image'=> $p['featured_image'],
            ]);
        }
    }
}
