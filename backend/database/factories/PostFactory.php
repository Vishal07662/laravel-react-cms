<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\User;

class PostFactory extends Factory
{
    protected $model = \App\Models\Post::class;

    public function definition()
    {
        $title = $this->faker->sentence(6, true);

        return [
            'user_id' => User::inRandomOrder()->first()->id, // Assign a random existing user
            'title' => $title,
            'slug' => Str::slug($title),
            'content' => '<p>' . implode('</p><p>', $this->faker->paragraphs(5)) . '</p>', // HTML content
            'is_published' => $this->faker->boolean(90), // 90% chance published
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
