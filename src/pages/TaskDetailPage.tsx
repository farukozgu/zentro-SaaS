import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ eklendi
import { useTasks } from "../context/TasksContext";
import type { TaskStatus } from "../types/task";
import { useToast } from "../context/ToastContext";

const statusOptions: { value: TaskStatus; label: string }[] = [
    { value: "todo", label: "Todo" },
    { value: "in-progress", label: "In Progress" },
    { value: "done", label: "Done" },
];

export function TaskDetailPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { tasks, dispatch } = useTasks();
    const { showToast } = useToast();

    const task = useMemo(
        () => tasks.find((t) => t.id === id),
        [tasks, id]
    );

    if (!id) {
        return (
            <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <h1 className="text-xl font-semibold">Task Detail</h1>
                <p className="text-sm text-red-600">
                    Invalid quest address. You can go back and try again.
                </p>
                <motion.button
                    type="button"
                    onClick={() => navigate("/")}
                    whileHover={{ scale: 1.03, translateY: -1 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50 cursor-pointer"
                >
                    ← Return to the dashboard
                </motion.button>
            </motion.div>
        );
    }

    if (!task) {
        return (
            <motion.div
                className="space-y-3"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <h1 className="text-xl font-semibold">Task Detail</h1>
                <p className="text-sm text-red-600">
                    Bu ID ile bir görev bulunamadı. Silinmiş veya hiç oluşturulmamış
                    olabilir.
                </p>
                <motion.button
                    type="button"
                    onClick={() => navigate("/")}
                    whileHover={{ scale: 1.03, translateY: -1 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50 cursor-pointer"
                >
                    ← Return to the dashboard
                </motion.button>
            </motion.div>
        );
    }

    function handleStatusChange(newStatus: TaskStatus) {
        if (newStatus === task.status) return;

        dispatch({
            type: "CHANGE_STATUS",
            payload: {
                id: task.id,
                status: newStatus,
            },
        });
    }

    function handleDelete() {
        const confirmed = window.confirm(
            "Are you sure you want to delete this task? This action cannot be undone."
        );
        if (!confirmed) return;

        dispatch({ type: "DELETE_TASK", payload: { id: task.id } });

        showToast("Task deleted. ❌", "info"); // veya "success"

        navigate("/");
    }

    const createdDate = new Date(task.createdAt).toLocaleString("tr-TR");
    const updatedDate = new Date(task.updatedAt).toLocaleString("tr-TR");

    const formattedDueDate = task.dueDate
        ? new Date(task.dueDate).toLocaleDateString("tr-TR")
        : null;

    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();

    return (
        <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
        >
            <motion.header
                className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
            >
                <div className="space-y-1">
                    <h1 className="text-2xl font-semibold text-black dark:text-white mb-3 mt-5 md:text-4xl">
                        Task Detail
                    </h1>
                    <p className="text-base text-black dark:text-white md:text-xl">
                        You can view the details of the task, change its status, or delete it.
                    </p>
                </div>

                <motion.button
                    type="button"
                    onClick={() => navigate("/")}
                    whileHover={{ scale: 1.03, translateY: -1 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="inline-flex items-center justify-center rounded-md cursor-pointer border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50"
                >
                    ← Return to the dashboard
                </motion.button>
            </motion.header>

            <motion.section
                className="space-y-4 rounded-lg border py-6 bg-white dark:bg-[#1A1C1E] dark:border-[#2A2D31] px-5 shadow-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
            >
                <div className="space-y-2">
                    <h2 className="text-lg font-semibold text-black dark:text-white md:text-2xl">
                        {task.title}
                    </h2>

                    {task.description ? (
                        <p className="text-sm text-black dark:text-white md:text-xl whitespace-pre-wrap">
                            {task.description}
                        </p>
                    ) : (
                        <p className="text-sm italic text-black dark:text-white md:text-xl">
                            No description has been added for this task.
                        </p>
                    )}
                </div>

                <div className="grid gap-2 text-sm text-black dark:text-white sm:grid-cols-2">
                    <p>
                        <span className="font-medium">Created:</span> {createdDate}
                    </p>
                    <p>
                        <span className="font-medium">Last Updated:</span> {updatedDate}
                    </p>
                    {formattedDueDate && (
                        <p className="sm:col-span-2">
                            <span className="font-medium">Deadline:</span>{" "}
                            <span className={isOverdue ? "text-red-600 font-semibold" : ""}>
                                {formattedDueDate}
                                {isOverdue && " (Overdue)"}
                            </span>
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-3 border-t border-black pt-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <p className="text-xs font-medium text-black dark:text-white">
                            State
                        </p>
                        <select
                            value={task.status}
                            onChange={(e) => handleStatusChange(e.target.value as TaskStatus)}
                            className="w-full max-w-xs rounded-md border text-black border-slate-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        >
                            {statusOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <motion.button
                        type="button"
                        onClick={handleDelete}
                        whileHover={{ scale: 1.03, translateY: -1 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        className="inline-flex items-center justify-center rounded-md border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 shadow-sm hover:bg-red-100 cursor-pointer"
                    >
                        Delete Task
                    </motion.button>
                </div>
            </motion.section>
        </motion.div>
    );
}
