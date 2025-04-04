<?php
use Inertia\Inertia;
use app\Http\Models\Events;
use app\Http\Controllers;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventsController;



Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});
Route::resource('events', EventsController::class);

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';