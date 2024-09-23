<?php

namespace Database\Seeders;

use App\Models\Task;
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
            'role' => 's1',
            'email' => 'test@gmail.com',
            'password' => bcrypt('test12345'),
            'email_verified_at' => time(),
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'role' => 's3',
            'email' => 'xtian@gmail.com',
            'password' => bcrypt('12345'),
            'email_verified_at' => time(),
        ]);

        Task::factory()->count(100)->create();
    }
}
