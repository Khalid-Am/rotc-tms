import React, { useState } from "react";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Textarea } from "@/Shadcn/components/ui/textarea";
import { useToast } from "@/Shadcn/hooks/use-toast";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Shadcn/components/ui/select";
import { TASK_STATUS_TEXT_MAP } from "@/Components/constants";

const EditTaskForm = ({ task }) => {
    const [showingEditTaskForm, setShowingEditTaskForm] = useState(false);
    const { toast } = useToast();

    const { data, setData, post, processing, errors } = useForm({
        title: task.title || "",
        instruction: task.instruction || "",
        status: task.status || "",
        _method: "PUT",
    });

    const showTaskForm = () => {
        setShowingEditTaskForm(true);
    };

    const closeModal = () => {
        setShowingEditTaskForm(false);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("task.update", task.id), {
            onSuccess: () => {
                toast({
                    variant: "success",
                    description: "Task was updated successfully!",
                }); // Show toast on success
                closeModal();
            },
        });
    };

    return (
        <>
            <PrimaryButton onClick={showTaskForm}>Edit</PrimaryButton>

            <Modal show={showingEditTaskForm}>
                <form onSubmit={onSubmit} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 text-center">
                        Edit Task
                    </h2>

                    <div className="mt-3">
                        <InputLabel htmlFor="task_title" value="Task Title" />
                        <TextInput
                            id="task_title"
                            type="text"
                            name="title"
                            value={data.title}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("title", e.target.value)}
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel
                            htmlFor="task_instruction"
                            value="Task Instruction"
                        />
                        <Textarea
                            id="task_instruction"
                            name="instruction"
                            value={data.instruction}
                            className="mt-1 block w-full"
                            onChange={(e) =>
                                setData("instruction", e.target.value)
                            }
                        />
                        <InputError
                            message={errors.instruction}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="status" value="Status" />
                        <Select
                            onValueChange={(value) => setData("status", value)}
                        >
                            <SelectTrigger className="mt-1 w-full">
                                <SelectValue
                                    placeholder={
                                        TASK_STATUS_TEXT_MAP[data.status]
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in_progress">
                                    In Progress
                                </SelectItem>
                                <SelectItem value="done">Done</SelectItem>
                            </SelectContent>
                        </Select>
                        <InputError message={errors.status} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>
                        <PrimaryButton className="ms-3" disabled={processing}>
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default EditTaskForm;
