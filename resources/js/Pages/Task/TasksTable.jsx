import React from "react";
import Paginattion from "@/Components/Pagination";
import EditTaskForm from "./EditTaskForm";
import {
    Table,
    TableRow,
    TableHead,
    TableHeader,
    TableBody,
    TableCell,
} from "@/Shadcn/components/ui/table";
import {
    TASK_STATUS_TEXT_MAP,
    TASK_STATUS_CLASS_MAP,
} from "@/Components/constants";

const TasksTable = ({ tasks }) => {
    return (
        <>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-left">Action</TableHead>
                        <TableHead className="w-[100px]">ID</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Instruction</TableHead>
                        <TableHead className="text-center">Status</TableHead>
                        <TableHead className="text-right text-nowrap">
                            Date Posted
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tasks.data.length > 0 ? (
                        tasks.data.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell>
                                    <EditTaskForm task={task}></EditTaskForm>
                                </TableCell>
                                <TableCell className="font-medium">
                                    {task.id}
                                </TableCell>
                                <TableCell>{task.title}</TableCell>
                                <TableCell>{task.instruction}</TableCell>
                                <TableHead className="text-center text-nowrap">
                                    <span
                                        className={
                                            "px-2 py-2 rounded text-white " +
                                            TASK_STATUS_CLASS_MAP[task.status]
                                        }
                                    >
                                        {TASK_STATUS_TEXT_MAP[task.status]}
                                    </span>
                                </TableHead>
                                <TableCell className="text-right text-nowrap">
                                    {task.posted_at}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6} className="text-center">
                                No tasks found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Paginattion links={tasks.meta.links} />
        </>
    );
};

export default TasksTable;
