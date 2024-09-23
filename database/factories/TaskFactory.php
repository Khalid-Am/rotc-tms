<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        return [
            'title' => fake()->sentence(),
            'instruction' => fake()->realText(),
            'status' => fake()->randomElement(['pending', 'in_progress', 'done']),
            'posted_by' => User::inRandomOrder()->first()->id,
            'posted_at' => time(),
        ];
    }
}
