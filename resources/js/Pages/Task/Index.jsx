import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Shadcn/components/ui/select";
import TasksTable from "./TasksTable";
import { Toaster } from "@/Shadcn/components/ui/toaster";

const Index = ({ tasks, queryParams = null }) => {
    queryParams = queryParams || {};

    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route("task.index"), queryParams);
    };

    const onKeyPress = (name, e) => {
        if (e.key !== "Enter") return;

        searchFieldChanged(name, e.target.value);
    };

    const resetQuery = () => {
        queryParams = {};
        router.get(route("task.index"), queryParams, {
            preserveState: false,
            preserveScroll: true,
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                        Tasks
                    </h2>
                    <PrimaryButton>
                        <Link href={route("task.create")}>Add Task</Link>
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Tasks" />

            <Toaster />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <div className="flex justify-end">
                                <div className="flex gap-2">
                                    <TextInput
                                        className="w-[250px]"
                                        placeholder="Search Title"
                                        onBlur={(e) =>
                                            searchFieldChanged(
                                                "title",
                                                e.target.value
                                            )
                                        }
                                        onKeyPress={(e) =>
                                            onKeyPress("title", e)
                                        }
                                    />
                                    <Select
                                        defaultValue={queryParams.status}
                                        onValueChange={(value) =>
                                            searchFieldChanged("status", value)
                                        }
                                    >
                                        <SelectTrigger className="w-[125px]">
                                            <SelectValue placeholder="Status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pending">
                                                Pending
                                            </SelectItem>
                                            <SelectItem value="in_progress">
                                                In Progress
                                            </SelectItem>
                                            <SelectItem value="done">
                                                Done
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Select
                                        defaultValue={queryParams.posted_at}
                                        onValueChange={(value) =>
                                            searchFieldChanged(
                                                "posted_at",
                                                value
                                            )
                                        }
                                    >
                                        <SelectTrigger className="w-[125px]">
                                            <SelectValue placeholder="Date" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="latest">
                                                Latest
                                            </SelectItem>
                                            <SelectItem value="week_ago">
                                                A week ago
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <PrimaryButton
                                        onClick={resetQuery}
                                        className="bg-red-600 hover:bg-red-500"
                                    >
                                        Reset
                                    </PrimaryButton>
                                </div>
                            </div>
                            <TasksTable tasks={tasks} />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Index;
