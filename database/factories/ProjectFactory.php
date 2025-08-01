<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $technologies = [
            ['React', 'TypeScript', 'Tailwind CSS'],
            ['Laravel', 'Vue.js', 'MySQL'],
            ['Node.js', 'Express', 'MongoDB'],
            ['Python', 'Django', 'PostgreSQL'],
            ['Next.js', 'Prisma', 'tRPC'],
        ];

        return [
            'title' => $this->faker->words(3, true),
            'description' => $this->faker->paragraph(3),
            'image_url' => 'https://picsum.photos/600/400?random=' . $this->faker->numberBetween(1, 1000),
            'project_url' => $this->faker->optional(0.8)->url(),
            'github_url' => $this->faker->optional(0.9)->url(),
            'featured' => $this->faker->boolean(30),
            'technologies' => $this->faker->randomElement($technologies),
            'sort_order' => $this->faker->numberBetween(0, 100),
        ];
    }

    /**
     * Indicate that the project is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'featured' => true,
        ]);
    }
}