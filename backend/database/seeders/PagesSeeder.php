<?php

namespace Database\Seeders;

use App\Models\Page;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class PagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $pages = [
            [
                'title'        => 'About Us',
                'slug'         => 'about-us',
                'content'      => '<h2>Welcome to our website</h2><p>We are dedicated to providing the best content and news for our audience.</p><p>Our mission is to empower people with knowledge.</p>',
                'is_published' => true,
            ],
            [
                'title'        => 'Contact Us',
                'slug'         => 'contact-us',
                'content'      => '<p>You can reach us via email at info@example.com.</p><p>We value customer feedback.</p>',
                'is_published' => true,
            ],
            [
                'title'        => 'Privacy Policy',
                'slug'         => 'privacy-policy',
                'content'      => '<h3>Your privacy matters</h3><p>This document explains how we store and process your data.</p>',
                'is_published' => true,
            ],
            [
                'title'        => 'Terms & Conditions',
                'slug'         => 'terms-and-conditions',
                'content'      => '<p>These terms govern the use of our platform.</p>',
                'is_published' => false,
            ],
        ];

        foreach ($pages as $page) {
            Page::create([
                'title'        => $page['title'],
                'slug'         => $page['slug'],
                'content'      => $page['content'],
                'is_published' => $page['is_published'],
            ]);
        }
    }
}
