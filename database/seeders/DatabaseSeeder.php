<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        // Create sample projects
        \App\Models\Project::factory()->create([
            'title' => 'E-Commerce Platform',
            'description' => 'A full-stack e-commerce solution built with Laravel and React. Features include user authentication, product management, shopping cart, and payment integration with Stripe.',
            'image_url' => 'https://picsum.photos/600/400?random=1',
            'project_url' => 'https://demo-ecommerce.com',
            'github_url' => 'https://github.com/username/ecommerce-platform',
            'featured' => true,
            'technologies' => ['Laravel', 'React', 'TypeScript', 'Tailwind CSS', 'MySQL'],
            'sort_order' => 1,
        ]);

        \App\Models\Project::factory()->create([
            'title' => 'Task Management App',
            'description' => 'A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features. Built with modern web technologies.',
            'image_url' => 'https://picsum.photos/600/400?random=2',
            'project_url' => 'https://taskmanager-demo.com',
            'github_url' => 'https://github.com/username/task-manager',
            'featured' => true,
            'technologies' => ['Vue.js', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
            'sort_order' => 2,
        ]);

        \App\Models\Project::factory()->create([
            'title' => 'Portfolio Website',
            'description' => 'A responsive portfolio website showcasing web development projects with modern design, smooth animations, and optimized performance.',
            'image_url' => 'https://picsum.photos/600/400?random=3',
            'project_url' => 'https://portfolio-demo.com',
            'github_url' => 'https://github.com/username/portfolio-website',
            'featured' => true,
            'technologies' => ['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
            'sort_order' => 3,
        ]);

        // Create additional non-featured projects
        \App\Models\Project::factory(5)->create();
    }
}
