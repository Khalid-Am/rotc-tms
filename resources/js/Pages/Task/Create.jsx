import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Textarea } from "@/Shadcn/components/ui/textarea";
import PrimaryButton from "@/Components/PrimaryButton";
import { useToast } from "@/Shadcn/hooks/use-toast";
import SecondaryButton from "@/Components/SecondaryButton";

const Create = () => {
    const { data, setData, post, errors, processing } = useForm({
        title: "",
        instruction: "",
    });

    const { toast } = useToast();

    const onSubmit = (e) => {
        e.preventDefault();

        post(route("task.store"), {
            onSuccess: () => {
                toast({
                    variant: "success",
                    description: "Task was added successfully!",
                }); // Show toast on success
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Add New Task
                </h2>
            }
        >
            <Head title="Tasks" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <form
                            onSubmit={onSubmit}
                            method="POST"
                            className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
                        >
                            <div>
                                <InputLabel
                                    htmlFor="task_title"
                                    value="Task Title"
                                />
                                <TextInput
                                    id="task_title"
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    className="mt-1 block w-full"
                                    onChange={(e) =>
                                        setData("title", e.target.value)
                                    }
                                    isFocused={true}
                                />
                                <InputError
                                    message={errors.title}
                                    className="mt-2"
                                />
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
                            <div className="mt-3 flex justify-end">
                                <SecondaryButton>
                                    <Link href={route("task.index")}>
                                        Cancel
                                    </Link>
                                </SecondaryButton>
                                <PrimaryButton
                                    className="ms-3"
                                    disabled={processing}
                                >
                                    Submit
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Create;
