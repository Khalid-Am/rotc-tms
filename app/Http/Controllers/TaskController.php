<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\TaskResource;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();
        $query = $user->tasks();

        if(request("title")) {
            $query->where("title", "like", "%" . request("title") . "%");
        }

        if(request("status")) {
            $query->where("status", request("status"));
        }

        if(request("posted_at")) {
            if(request("posted_at") == "week_ago") {
                $query->where("posted_at", "<=", now()->subWeek())->orderBy('posted_at', 'asc');
            }

            $query->orderBy("posted_at", "desc");
        }

        $tasks = $query->orderBy("posted_at", "desc")->paginate(10);

        return inertia('Task/Index', [
            "tasks" => TaskResource::collection($tasks),
            "queryParams" => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia('Task/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $user = Auth::user();

        $data = $request->validated(); 
        $data["posted_at"] = now();

        $user->tasks()->create($data);

        return to_route("task.index");
        
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();

        $task->update($data);

        return to_route("task.index");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
