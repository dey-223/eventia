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
    
// Route::get('/dashboard/eventList', function(){
//     return Inertia::render('EventList');
// })->name('eventList');
Route::get('/dashboard/eventList', [EventsController::class, 'index'])->name('event.index');

    Route::get('/dashboard/CreateEvent', function(){
        return Inertia::render('CreateEvent');
    })->name('event.create');
    Route::post('/dashboard/events', [EventsController::class, 'store'])->name('event.store');

    Route::delete('/dashboard/events/{id}', [EventsController::class, 'destroy'])->name('events.destroy');
});


Route::get('/dashboard/editEvent', function () {
    return Inertia::render('EventEdit');
})->name('event.edit');
Route::get('/events', function(){
    return Inertia::render('Events');
})->name('events');
// 
Route::get('/events', [EventsController::class, 'showEvents']);
// ajouter par moi recement


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
// Route::get('/events/inscriptions', function () {
//     return Inertia::render('EventSignup');
// })->name('event.inscription');
// Route::get('/events/inscriptions/{id}', function ($id) {
//     return Inertia::render('EventSignup', [
//         'id' => (int) $id
//     ]);
// })->name('event.inscription');


 Route::get('/events/inscriptions/{id}', 
 [EventsController::class, 'showRegistrationForm'])
 ->name('events.inscriptions');


Route::get('/events/participants', function () {
    return Inertia::render('EventParticipants');
})->name('event.participants');

// Route::get('/dashboard/eventList', function(){
//     return Inertia::render('EventList');
// })->name('eventList');

Route::get('/dashboard/CreateEvent', function(){
    return Inertia::render('CreateEvent');
})->name('event.create');



Route::get('/dashboard/eventDetail/', function () {
    return Inertia::render('EventDetail');
})->name('event.detail');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';