import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTasks } from "../context/TasksContext";
import type { TaskStatus, Task } from "../types/task"; // ✅ Task eklendi

const statusLabels: Record<string, string> = {
    todo: "Todo",
    "in-progress": "In Progress",
    done: "Done",
};

const columns: { status: TaskStatus; title: string }[] = [
    { status: "todo", title: "Todo" },
    { status: "in-progress", title: "In Progress" },
    { status: "done", title: "Done" },
];

const MotionLink = motion(Link);

export function DashboardPage() {
    const { tasks, dispatch } = useTasks();
    const [viewMode, setViewMode] = useState<"list" | "board">("list");

    const total = tasks.length;
    const todo = tasks.filter((t) => t.status === "todo").length;
    const inProgress = tasks.filter((t) => t.status === "in-progress").length;
    const done = tasks.filter((t) => t.status === "done").length;
    const hasTasks = tasks.length > 0;

    const [searchTerm, setSearchTerm] = useState("");
    const [priorityFilter, setPriorityFilter] = useState<
        "all" | "low" | "medium" | "high"
    >("all");
    const [statusFilter, setStatusFilter] = useState<
        "all" | "todo" | "in-progress" | "done"
    >("all");

    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch =
            !normalizedSearch ||
            task.title.toLowerCase().includes(normalizedSearch) ||
            (task.description?.toLowerCase().includes(normalizedSearch) ?? false);

        const matchesPriority =
            priorityFilter === "all" || task.priority === priorityFilter;

        const matchesStatus =
            statusFilter === "all" || task.status === statusFilter;

        return matchesSearch && matchesPriority && matchesStatus;
    });

    function handleStatusChange(id: string, status: TaskStatus) {
        if (!id) return;
        dispatch({
            type: "CHANGE_STATUS",
            payload: { id, status },
        });
    }

    return (
        <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Title */}
            <section>
                <h1 className="text-2xl font-semibold mb-3 mt-5 md:text-4xl">
                    Dashboard
                </h1>
                <p className="text-base text-black dark:text-white md:text-xl">
                    Here you can see a general summary of your tasks within Zentro.
                </p>
            </section>

            {/* Stat Cards */}
            <section className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                <StatCard label="Total Tasks" value={total} />
                <StatCard label="Todo" value={todo} />
                <StatCard label="In Progress" value={inProgress} />
                <StatCard label="Done" value={done} />
            </section>
            {/* ✅ Analytics Section */}
            <AnalyticsSection tasks={tasks} />

            {/* Tasks Section */}
            <section className="space-y-7">
                <header className="flex flex-col mt-10 gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl font-semibold mb-3 mt-5 md:text-4xl">
                            Tasks
                        </h2>
                        <p className="text-base text-black dark:text-white md:text-xl">
                            All tasks are listed here. You can switch between list and board
                            views.
                        </p>
                    </div>


                </header>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-400 dark:bg-[#1A1C1E] dark:text-slate-100 dark:border-[#1A1C1E]"
                    />

                    {/* Priority filter */}
                    <select
                        value={priorityFilter}
                        onChange={(e) =>
                            setPriorityFilter(
                                e.target.value as "all" | "low" | "medium" | "high"
                            )
                        }
                        className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-400 dark:bg-[#1A1C1E] dark:text-slate-100 dark:border-[#1A1C1E]"
                    >
                        <option value="all">All priorities</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>

                    {/* Status filter */}
                    <select
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(
                                e.target.value as "all" | "todo" | "in-progress" | "done"
                            )
                        }
                        className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-400 dark:bg-[#1A1C1E] dark:text-slate-100 dark:border-[#1A1C1E]"
                    >
                        <option value="all">All statuses</option>
                        <option value="todo">Todo</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>

                    {/* View switcher */}
                    <div className="inline-flex rounded-md border border-slate-300 bg-white dark:bg-[#1A1C1E]">
                        <button
                            type="button"
                            onClick={() => setViewMode("list")}
                            className={`px-3 py-1.5 cursor-pointer text-sm font-medium ${viewMode === "list"
                                ? "bg-amber-200 dark:bg-white dark:text-black"
                                : "text-slate-700 dark:text-slate-200"
                                }`}
                        >
                            List
                        </button>
                        <button
                            type="button"
                            onClick={() => setViewMode("board")}
                            className={`px-3 py-1.5 cursor-pointer text-sm font-medium ${viewMode === "board"
                                ? "bg-amber-200 dark:bg-white dark:text-black"
                                : "text-slate-700 dark:text-slate-200"
                                }`}
                        >
                            Board
                        </button>
                    </div>

                    <MotionLink
                        to="/tasks/new"
                        whileHover={{ scale: 1.03, translateY: -1 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        className="inline-flex items-center justify-center w-full sm:max-w-[120px] rounded-md bg-amber-200 px-3 py-1.5 text-sm font-medium text-black transition-all duration-100 hover:bg-amber-300 dark:bg-amber-200 dark:hover:bg-amber-300 dark:text-black"
                    >
                        + New Task
                    </MotionLink>
                </div>

                {/* Content */}
                {!hasTasks ? (
                    <p className="text-md text-black dark:text-white">
                        You don't have any tasks yet. You can add a new task using the{" "}
                        <span className="font-medium">New Task</span> button in the top
                        right corner.
                    </p>
                ) : viewMode === "list" ? (
                    <ul className="space-y-2">
                        {filteredTasks.map((task, index) => {
                            const hasDue = !!task.dueDate;
                            const isOverdue =
                                task.dueDate && new Date(task.dueDate) < new Date();
                            const formattedDue = task.dueDate
                                ? new Date(task.dueDate).toLocaleDateString("tr-TR")
                                : "";

                            return (
                                <motion.li
                                    key={task.id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.25, delay: index * 0.02 }}
                                    whileHover={{ scale: 1.01, translateY: -2 }}
                                >
                                    <MotionLink
                                        to={`/tasks/${task.id}`}
                                        whileTap={{ scale: 0.99 }}
                                        className="flex items-center justify-between gap-3 flex-wrap rounded-xl border bg-white dark:bg-[#1A1C1E] dark:border-[#2A2D31] px-6 py-6 shadow-sm transition hover:border-slate-400 hover:bg-slate-50 dark:hover:bg-[#111827]"
                                    >
                                        <div className="space-y-1">
                                            <p className="text-lg font-medium text-black dark:text-white md:text-2xl">
                                                {task.title}
                                            </p>
                                            {task.description && (
                                                <p className="text-base text-black dark:text-[#E5E7EB] line-clamp-2 md:text-lg">
                                                    {task.description}
                                                </p>
                                            )}

                                            <div className="flex items-center gap-3">
                                                <p className="text-[14px] text-black dark:text-[#9CA3AF] pt-1">
                                                    Created:{" "}
                                                    {new Date(task.createdAt).toLocaleDateString("tr-TR")}
                                                </p>
                                                {hasDue && (
                                                    <p className="text-[14px] text-black dark:text-[#9CA3AF] pt-1">
                                                        Deadline:{" "}
                                                        <span
                                                            className={
                                                                isOverdue
                                                                    ? "text-red-600 dark:text-red-400 font-semibold"
                                                                    : ""
                                                            }
                                                        >
                                                            {formattedDue}
                                                            {isOverdue && " (Overdue)"}
                                                        </span>
                                                    </p>
                                                )}
                                            </div>
                                            <span
                                                className={`
                          inline-flex items-center rounded-full border px-3 py-1 mt-2 text-[10px] font-medium md:text-[12px]
                          ${task.priority === "high"
                                                        ? "border-red-300 text-red-700 bg-red-50"
                                                        : task.priority === "medium"
                                                            ? "border-amber-300 text-amber-700 bg-amber-50"
                                                            : "border-emerald-300 text-emerald-700 bg-emerald-50"
                                                    }
                        `}
                                            >
                                                Priority:{" "}
                                                {task.priority === "high"
                                                    ? "High"
                                                    : task.priority === "medium"
                                                        ? "Medium"
                                                        : "Low"}
                                            </span>
                                        </div>

                                        <span
                                            className="inline-flex items-center rounded-full border border-slate-300 px-2 py-0.5 text-[10px] font-medium text-black dark:text-[#E5E7EB] md:text-[16px] md:px-4"
                                            aria-label={`Status: ${statusLabels[task.status]}`}
                                        >
                                            {statusLabels[task.status]}
                                        </span>
                                    </MotionLink>
                                </motion.li>
                            );
                        })}
                    </ul>
                ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        {columns.map((column, columnIndex) => {
                            const columnTasks = filteredTasks.filter(
                                (t) => t.status === column.status
                            );

                            return (
                                <motion.div
                                    key={column.status}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: columnIndex * 0.06 }}
                                    className="flex flex-col rounded-xl border bg-white dark:bg-[#1A1C1E] dark:border-[#2A2D31] p-4 shadow-sm min-h-[260px]"
                                >
                                    <div className="mb-3 flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-black dark:text-[#FAFAFA]">
                                            {column.title}
                                        </h3>
                                        <span className="rounded-full bg-slate-100 dark:bg-[#111827] px-3 py-1 text-xs font-medium text-slate-700 dark:text-[#E5E7EB]">
                                            {columnTasks.length}
                                        </span>
                                    </div>

                                    <div className="flex-1 space-y-2">
                                        {columnTasks.length === 0 ? (
                                            <p className="text-xs text-slate-500 dark:text-[#9CA3AF]">
                                                There are no tasks in this column.
                                            </p>
                                        ) : (
                                            columnTasks.map((task, index) => {
                                                const hasDue = !!task.dueDate;
                                                const isOverdue =
                                                    task.dueDate && new Date(task.dueDate) < new Date();
                                                const formattedDue = task.dueDate
                                                    ? new Date(task.dueDate).toLocaleDateString("tr-TR")
                                                    : "";

                                                return (
                                                    <motion.div
                                                        key={task.id}
                                                        initial={{ opacity: 0, y: 8 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{
                                                            duration: 0.25,
                                                            delay: index * 0.03,
                                                        }}
                                                        whileHover={{ scale: 1.02, translateY: -2 }}
                                                        whileTap={{ scale: 0.98 }}
                                                        className="rounded-lg border border-slate-200 dark:border-[#2A2D31] bg-white dark:bg-[#111827] px-3 py-3 space-y-2"
                                                    >
                                                        <MotionLink
                                                            to={`/tasks/${task.id}`}
                                                            whileHover={{ scale: 1.01 }}
                                                            whileTap={{ scale: 0.99 }}
                                                            className="text-sm font-medium text-black dark:text-[#F9FAFB] hover:underline md:text-base"
                                                        >
                                                            {task.title}
                                                        </MotionLink>

                                                        {task.description && (
                                                            <p className="text-xs text-slate-600 dark:text-[#9CA3AF] line-clamp-2 md:text-sm">
                                                                {task.description}
                                                            </p>
                                                        )}

                                                        <div className="flex flex-col gap-1">
                                                            <p className="text-[11px] text-slate-500 dark:text-[#9CA3AF]">
                                                                Created:{" "}
                                                                {new Date(
                                                                    task.createdAt
                                                                ).toLocaleDateString("tr-TR")}
                                                            </p>
                                                            {hasDue && (
                                                                <p className="text-[11px] text-slate-500 dark:text-[#9CA3AF]">
                                                                    Deadline:{" "}
                                                                    <span
                                                                        className={
                                                                            isOverdue
                                                                                ? "text-red-600 dark:text-red-400 font-semibold"
                                                                                : ""
                                                                        }
                                                                    >
                                                                        {formattedDue}
                                                                        {isOverdue && " (Overdue)"}
                                                                    </span>
                                                                </p>
                                                            )}
                                                        </div>

                                                        <p className="text-[11px] text-slate-500 dark:text-[#9CA3AF]">
                                                            Priority:{" "}
                                                            <span
                                                                className={
                                                                    task.priority === "high"
                                                                        ? "text-red-500 font-semibold"
                                                                        : task.priority === "medium"
                                                                            ? "text-amber-500 font-medium"
                                                                            : "text-emerald-500"
                                                                }
                                                            >
                                                                {task.priority.charAt(0).toUpperCase() +
                                                                    task.priority.slice(1)}
                                                            </span>
                                                        </p>

                                                        <div className="pt-1">
                                                            <select
                                                                value={task.status}
                                                                onChange={(e) =>
                                                                    handleStatusChange(
                                                                        task.id,
                                                                        e.target.value as TaskStatus
                                                                    )
                                                                }
                                                                className="w-full rounded-md border border-slate-300 dark:border-[#374151] bg-white dark:bg-[#111827] px-2 py-1 text-xs text-slate-800 dark:text-[#E5E7EB] shadow-sm focus:outline-none focus:ring-1 focus:ring-slate-400 dark:focus:ring-[#4F46E5]"
                                                            >
                                                                <option value="todo">Todo</option>
                                                                <option value="in-progress">In Progress</option>
                                                                <option value="done">Done</option>
                                                            </select>
                                                        </div>
                                                    </motion.div>
                                                );
                                            })
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </section>
        </motion.div>
    );
}

function StatCard({ label, value }: { label: string; value: number }) {
    const getColor = () => {
        switch (label) {
            case "Total Tasks":
                return "bg-[#F9F1F5] dark:bg-[#F9F1F5] text-blue-800 border-indigo-200";
            case "Todo":
                return "bg[#FEF0E6] dark:bg-[#FEF0E6] text-yellow-800 border-orange-200";
            case "In Progress":
                return "bg-[#FEF5E3] dark:bg-[#FEF5E3] text-purple-800 border-purple-200";
            case "Done":
                return "bg-[#F4F8EC] dark:bg-[#F4F8EC] text-green-800 border-green-200";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <motion.div
            className={`rounded-lg border px-5 py-5 ${getColor()}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.02, translateY: -2 }}
            whileTap={{ scale: 0.98 }}
        >
            <p className="mb-1 text-xl font-medium md:text-2xl">{label}</p>
            <p className="text-2xl font-semibold md:text-5xl">{value}</p>
        </motion.div>
    );
}


function AnalyticsSection({ tasks }: { tasks: Task[] }) {
    const total = tasks.length;
    const done = tasks.filter((t) => t.status === "done").length;
    const highPriority = tasks.filter((t) => t.priority === "high").length;

    const now = new Date();
    const overdue = tasks.filter(
        (t) =>
            t.dueDate &&
            new Date(t.dueDate) < now &&
            t.status !== "done"
    ).length;

    const upcoming = tasks.filter((t) => {
        if (!t.dueDate) return false;
        const due = new Date(t.dueDate);
        const diffDays = (due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);
        return diffDays >= 0 && diffDays <= 7;
    }).length;

    const completionRate = total > 0 ? Math.round((done / total) * 100) : 0;

    return (
        <motion.section
            className="rounded-lg border bg-white dark:bg-[#1A1C1E] dark:border-[#2A2D31] px-5 py-4 shadow-sm"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.05 }}
        >
            <h2 className="text-lg font-semibold text-black dark:text-white mb-3 md:text-2xl">
                Analytics
            </h2>

            <div className="grid gap-4 md:grid-cols-2">
                {/* Completion rate */}
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-black dark:text-white">
                            Completion rate
                        </p>
                        <p className="text-sm font-semibold text-black dark:text-white">
                            {completionRate}%
                        </p>
                    </div>
                    <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-[#111827] overflow-hidden">
                        <div
                            className="h-full rounded-full bg-emerald-400 dark:bg-emerald-500 transition-all"
                            style={{ width: `${completionRate}%` }}
                        />
                    </div>
                    <p className="text-xs text-slate-500 dark:text-[#9CA3AF]">
                        {done} of {total} tasks completed.
                    </p>
                </div>

                {/* Other stats */}
                <div className="grid grid-cols-3 gap-3 text-center md:text-left">
                    <div className="rounded-md bg-[#FEF2F2] border border-red-100 px-3 py-2 dark:bg-[#1A1C1E] dark:border-red-900">
                        <p className="text-xs font-medium text-red-700 dark:text-red-300">
                            Overdue
                        </p>
                        <p className="text-lg font-semibold text-red-800 dark:text-red-400">
                            {overdue}
                        </p>
                    </div>

                    <div className="rounded-md bg-[#EFF6FF] border border-blue-100 px-3 py-2 dark:bg-[#1A1C1E] dark:border-blue-900">
                        <p className="text-xs font-medium text-blue-700 dark:text-blue-300">
                            Next 7 days
                        </p>
                        <p className="text-lg font-semibold text-blue-800 dark:text-blue-400">
                            {upcoming}
                        </p>
                    </div>

                    <div className="rounded-md bg-[#FFFBEB] border border-amber-100 px-3 py-2 dark:bg-[#1A1C1E] dark:border-amber-900">
                        <p className="text-xs font-medium text-amber-700 dark:text-amber-300">
                            High priority
                        </p>
                        <p className="text-lg font-semibold text-amber-800 dark:text-amber-400">
                            {highPriority}
                        </p>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}
