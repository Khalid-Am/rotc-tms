<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        "title",
        "instruction",
        "status",
        "posted_by",
        "posted_at",
        "archived_at"
    ];

    public function postedBy() {
        return $this->belongsTo(User::class, 'posted_by');
    }
}
