import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // ✅ framer-motion
import { useTasks } from "../context/TasksContext";
import { useToast } from "../context/ToastContext";


export function NewTaskPage() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");

    const { dispatch } = useTasks();
    const navigate = useNavigate();
    const { showToast } = useToast()

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const trimmedTitle = title.trim();

        if (!trimmedTitle) {
            showToast("Please fill in the title field.", "error");
            return;
        }

        dispatch({
            type: "ADD_TASK",
            payload: {
                title: trimmedTitle,
                description: description.trim() || undefined,
                dueDate: dueDate || undefined,
                priority,
            },
        });

        setTitle("");
        setDescription("");
        setDueDate("");
        showToast("Task created successfully! ✅", "success");

        navigate("/");
    }

    return (
        <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
        >
            {/* Title */}
            <motion.header
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 }}
            >
                <h1 className="text-2xl font-semibold mb-3 mt-5 text-black dark:text-white md:text-4xl">
                    New Task
                </h1>
                <p className="text-base text-black dark:text-white  md:text-xl">
                    Fill out the form below to add a new task.
                </p>
            </motion.header>

            {/* Form */}
            <motion.form
                onSubmit={handleSubmit}
                className="space-y-4 rounded-lg border bg-white dark:bg-[#1A1C1E] dark:border-[#2A2D31] px-5 py-6 shadow-sm"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
            >
                <div className="space-y-1">
                    <label
                        htmlFor="title"
                        className="block text-lg font-medium text-black dark:text-white"
                    >
                        Title <span className="text-red-500 text-lg">*</span>
                    </label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        className="w-full rounded-md border border-slate-300 text-black dark:text-white px-3 py-2 text-md shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        placeholder="Example: Fix the leaking faucet"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                </div>


                <div className="space-y-1">
                    <label
                        htmlFor="description"
                        className="block text-lg font-medium text-black dark:text-white"
                    >
                        Description <span className="text-sm text-slate-500">(optional)</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows={4}
                        className="w-full rounded-md border border-slate-300 text-black dark:text-white px-3 py-2 text-md shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        placeholder="You can write the details about the task here..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="priority"
                        className="block text-sm font-medium text-black dark:text-white"
                    >
                        Priority
                    </label>
                    <select
                        id="priority"
                        name="priority"
                        value={priority}
                        onChange={(e) =>
                            setPriority(e.target.value as "low" | "medium" | "high")
                        }
                        className="w-full rounded-md border border-slate-300 text-black dark:text-white px-3 py-2 text-sm shadow-sm focus:dark:bg-[#1A1C1E]"
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                </div>

                <div className="space-y-1">
                    <label
                        htmlFor="dueDate"
                        className="block text-sm font-medium text-black dark:text-white"
                    >
                        Deadline{" "}
                        <span className="text-xs text-slate-400">(optional)</span>
                    </label>
                    <input
                        id="dueDate"
                        name="dueDate"
                        type="date"
                        className="w-full rounded-md border border-slate-300 text-black dark:text-white px-3 py-2 text-sm shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>

                {/* Butonlar */}
                <div className="flex items-center gap-2 pt-2">
                    <motion.button
                        type="submit"
                        whileHover={{ scale: 1.03, translateY: -1 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        className="inline-flex items-center justify-center rounded-md bg-amber-200 px-4 py-2 text-md font-medium text-black shadow-sm transition-all duration-100 hover:bg-amber-400 cursor-pointer"
                    >
                        Create
                    </motion.button>

                    <motion.button
                        type="button"
                        onClick={() => navigate("/")}
                        whileHover={{ scale: 1.02, translateY: -1 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2 text-md font-medium text-slate-800 shadow-sm transition-all duration-100 hover:bg-slate-100 cursor-pointer"
                    >
                        Cancel
                    </motion.button>
                </div>
            </motion.form>
        </motion.div>
    );
}
