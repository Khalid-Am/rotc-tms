import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Shadcn/components/ui/card";

export default function Dashboard() {
    const user = usePage().props.auth.user;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {user.role != "corps" ? (
                                <div className="flex gap-5">
                                    <Card className="w-4/12">
                                        <CardHeader>
                                            <CardTitle>Pending Tasks</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <span>10 tasks</span>
                                        </CardContent>
                                    </Card>
                                    <Card className="w-4/12">
                                        <CardHeader>
                                            <CardTitle>
                                                In Progress Tasks
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <span>10 tasks</span>
                                        </CardContent>
                                    </Card>
                                    <Card className="w-4/12">
                                        <CardHeader>
                                            <CardTitle>Done Tasks</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <span>10 tasks</span>
                                        </CardContent>
                                    </Card>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
