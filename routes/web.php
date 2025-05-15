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
    Route::get('/dashboard/CreateEvent', function(){
        return Inertia::render('CreateEvent');
    })->name('event.create');
});

Route::get('/about', function () {
    return Inertia::render('About');
});
Route::get('/contact', function () {
    return Inertia::render('Contact');
});
Route::get('/princing', function () {
    return Inertia::render('Pricing');
});
Route::get('/resources', function () {
    return Inertia::render('Resources');
});

Route::get('/dashboard/eventList', function(){
    return Inertia::render('EventList');
})->name('eventList');


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';