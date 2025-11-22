import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ eklendi
import { useTasks } from "../context/TasksContext";

const MotionLink = motion(Link); // ✅ Link için motion versiyonu

export function CompletedTasksPage() {
    const { tasks } = useTasks();

    const completedTasks = tasks.filter((task) => task.status === "done");
    const hasCompletedTasks = completedTasks.length > 0;

    return (
        <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
        >
            {/* Title */}
            <motion.header
                className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
            >
                <div>
                    <h1 className="text-2xl font-semibold text-black dark:text-white mb-3 mt-5 md:text-4xl">
                        Task History
                    </h1>
                    <p className="text-base text-black dark:text-white md:text-xl">
                        All the tasks you have completed are listed here.
                    </p>
                </div>

                <MotionLink
                    to="/"
                    whileHover={{ scale: 1.03, translateY: -1 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                    className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 shadow-sm hover:bg-slate-50"
                >
                    ← Return to the dashboard
                </MotionLink>
            </motion.header>

            {/* Content */}
            {!hasCompletedTasks ? (
                <motion.div
                    className="rounded-lg border border-dashed bg-white px-4 py-6 text-md text-black"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                >
                    You don't have any completed tasks yet. You can see them here by completing
                    your tasks via the <span className="font-medium">Dashboard.</span>
                </motion.div>
            ) : (
                <ul className="space-y-2">
                    {completedTasks.map((task, index) => {
                        const createdDate = new Date(task.createdAt).toLocaleDateString(
                            "tr-TR"
                        );

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
                                transition={{ duration: 0.25, delay: index * 0.03 }}
                            >
                                <motion.div
                                    className="flex flex-col gap-3 rounded-lg border bg-white px-4 py-6 shadow-sm dark:bg-[#1A1C1E] dark:border-[#2A2D31]"
                                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                                >
                                    <div className="flex items-center justify-between gap-2">
                                        <p className="text-lg font-medium text-black dark:text-white md:text-2xl">
                                            {task.title}
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex items-center rounded-full border border-slate-300 px-2 py-0.5 text-[10px] font-medium text-black dark:text-white md:text-[16px] md:px-4">
                                                Done
                                            </span>
                                        </div>
                                    </div>

                                    {task.description && (
                                        <p className="text-base text-black dark:text-white line-clamp-2 md:text-lg">
                                            {task.description}
                                        </p>
                                    )}

                                    <div className="flex items-center gap-3">
                                        <p className="text-[14px] text-black dark:text-white pt-1">
                                            Created: {createdDate}
                                        </p>

                                        {hasDue && (
                                            <p className="text-[14px] pt-1 text-slate-500 dark:text-white">
                                                Deadline:{" "}
                                                <span
                                                    className={
                                                        isOverdue
                                                            ? "text-red-600 font-semibold"
                                                            : ""
                                                    }
                                                >
                                                    {formattedDue}
                                                    {isOverdue && " (Overdue)"}
                                                </span>
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            </motion.li>
                        );
                    })}
                </ul>
            )}
        </motion.div>
    );
}
