<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        // Simule des données comme celles du composant React
        $eventStats = [
            'totalEvents' => 12,
            'upcomingEvents' => 5,
            'pastEvents' => 6,
            'cancelledEvents' => 1,
        ];

        $upcomingEvents = [
            [
                'id' => 1,
                'title' => 'Annual Tech Conference',
                'date' => '2025-06-15',
                'registered' => 342,
                'capacity' => 500,
                'status' => 'upcoming',
            ],
            [
                'id' => 2,
                'title' => 'Developer Meetup',
                'date' => '2025-07-10',
                'registered' => 78,
                'capacity' => 100,
                'status' => 'upcoming',
            ],
            [
                'id' => 3,
                'title' => 'Product Design Workshop',
                'date' => '2025-05-22',
                'registered' => 50,
                'capacity' => 50,
                'status' => 'ongoing',
            ]
        ];

        return Inertia::render('Dashboard', [
            'eventStats' => $eventStats,
            'upcomingEvents' => $upcomingEvents,
            'totalAttendees' => 840,
            'totalRevenue' => 24850.75,
        ]);
    }
}
