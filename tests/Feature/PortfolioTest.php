<?php

use App\Models\ContactMessage;
use App\Models\Project;

test('portfolio homepage loads successfully', function () {
    // Create some test projects
    Project::factory()->featured()->count(3)->create();
    
    $response = $this->get('/');
    
    $response->assertStatus(200);
    $response->assertInertia(fn ($page) => 
        $page->component('welcome')
             ->has('projects', 3)
    );
});

test('contact form submission creates message', function () {
    $contactData = [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'subject' => 'Project Inquiry',
        'message' => 'I would like to discuss a potential project with you.',
    ];

    $response = $this->post('/contact', $contactData);

    $response->assertRedirect();
    $response->assertSessionHas('success');
    
    $this->assertDatabaseHas('contact_messages', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'subject' => 'Project Inquiry',
    ]);
});

test('contact form validation fails with invalid data', function () {
    $response = $this->post('/contact', [
        'name' => '',
        'email' => 'invalid-email',
        'subject' => '',
        'message' => '',
    ]);

    $response->assertSessionHasErrors(['name', 'email', 'subject', 'message']);
});

test('projects are ordered correctly', function () {
    // Create projects with different sort orders
    Project::factory()->create(['title' => 'Third Project', 'sort_order' => 3, 'featured' => true]);
    Project::factory()->create(['title' => 'First Project', 'sort_order' => 1, 'featured' => true]);
    Project::factory()->create(['title' => 'Second Project', 'sort_order' => 2, 'featured' => true]);

    $response = $this->get('/');

    $response->assertInertia(fn ($page) => 
        $page->has('projects', 3)
             ->where('projects.0.title', 'First Project')
             ->where('projects.1.title', 'Second Project')
             ->where('projects.2.title', 'Third Project')
    );
});