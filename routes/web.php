<?php
use Inertia\Inertia;
use app\Models\Events;
// use app\Http\Models\Events;
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
Route::get('/events', function(){
    return Inertia::render('Events');
})->name('events');

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
Route::get('/events/inscriptions', function () {
    return Inertia::render('EventSignUp');
})->name('event.inscription');

Route::get('/events/participants', function () {
    return Inertia::render('EventParticipants');
})->name('event.participants');

Route::get('/dashboard/eventList', function(){
    return Inertia::render('EventList');
})->name('eventList');

Route::get('/dashboard/CreateEvent', function(){
    return Inertia::render('CreateEvent');
})->name('event.create');

Route::get('/dashboard/eventDetail/', function () {
    return Inertia::render('EventDetail');
})->name('event.detail');
Route::get('/dashboard/editEvent', function () {
    return Inertia::render('EventEdit');
})->name('event.edit');
// Route::get('/dashboard/eventList/updateEvent', function () {
//     return Inertia::render('UpdateEdit');
// })->name('event.update');
Route::resource('events', EventsController::class);


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';