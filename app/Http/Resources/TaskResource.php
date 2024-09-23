<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'instruction' => $this->instruction,
            'status' => $this->status,
            'posted_at' => (new Carbon($this->posted_at))->format('Y-m-d'),
            'postedBy' => new UserResource($this->postedBy),
            'archived_at' => (new Carbon($this->archived_at))->format('Y-m-d')
        ];
    }
}
