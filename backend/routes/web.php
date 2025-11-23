<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\Frontend\PostController;
use App\Http\Controllers\Frontend\PageController;

// Home Page
Route::get('/', [HomeController::class, 'index'])->name('home');

// Blog Routes
Route::prefix('blog')->group(function () {
    Route::get('/', [PostController::class, 'index'])->name('blog.index');
    Route::get('/{id}-{slug}', [PostController::class, 'show'])
        ->where('id', '[0-9]+')
        ->name('blog.show');
});
// Dynamic Pages
Route::get('/{id}-{slug}', [PageController::class, 'show'])
    ->where('id', '[0-9]+')
    ->name('page.show');
