<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactMessageRequest;
use App\Models\ContactMessage;
use App\Models\Project;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    /**
     * Display the portfolio homepage.
     */
    public function index()
    {
        $featuredProjects = Project::featured()->ordered()->take(3)->get();
        
        return Inertia::render('welcome', [
            'projects' => $featuredProjects
        ]);
    }

    /**
     * Store a contact message.
     */
    public function store(StoreContactMessageRequest $request)
    {
        ContactMessage::create($request->validated());

        return redirect()->back()->with('success', 'Thank you for your message! I\'ll get back to you soon.');
    }
}