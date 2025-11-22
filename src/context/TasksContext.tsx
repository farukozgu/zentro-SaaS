import {
    createContext,
    useContext,
    useReducer,
    useEffect,
    type Dispatch,
    type ReactNode,
} from "react";
import type { Task, TaskStatus, TaskPriority } from "../types/task";

// --------------------
// Types
// --------------------

interface TasksState {
    tasks: Task[];
}

type TaskAction =
    | { type: "ADD_TASK"; payload: { title: string; description?: string; dueDate?: string; priority?: TaskPriority; } }
    | { type: "UPDATE_TASK"; payload: { id: string; title: string; description?: string } }
    | { type: "CHANGE_STATUS"; payload: { id: string; status: TaskStatus } }
    | { type: "DELETE_TASK"; payload: { id: string } };

// --------------------
// (fallback) state
// --------------------

const defaultState: TasksState = {
    tasks: [],
};


function loadInitialState(): TasksState {
    if (typeof window === "undefined") {
        return defaultState;
    }

    try {
        const saved = window.localStorage.getItem("taskflow-tasks");
        if (!saved) {
            return defaultState;
        }

        const parsed = JSON.parse(saved) as Task[];

        const normalized = parsed.map((task) => ({
            ...task,
            priority: task.priority ?? "medium",
        }));

        return { tasks: normalized };
    } catch {
        return defaultState;
    }
}


// --------------------
// Reducer
// --------------------

function tasksReducer(state: TasksState, action: TaskAction): TasksState {
    switch (action.type) {
        case "ADD_TASK": {
            const now = new Date().toISOString();
            const newTask: Task = {
                id: crypto.randomUUID(),
                title: action.payload.title,
                description: action.payload.description,
                status: "todo",
                priority: action.payload.priority ?? "medium",
                dueDate: action.payload.dueDate,
                createdAt: now,
                updatedAt: now,
            };
            return { ...state, tasks: [newTask, ...state.tasks] };
        }

        case "UPDATE_TASK": {
            const { id, title, description } = action.payload;
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === id
                        ? { ...task, title, description, updatedAt: new Date().toISOString() }
                        : task
                ),
            };
        }

        case "CHANGE_STATUS": {
            const { id, status } = action.payload;
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === id
                        ? { ...task, status, updatedAt: new Date().toISOString() }
                        : task
                ),
            };
        }

        case "DELETE_TASK": {
            const { id } = action.payload;
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== id),
            };
        }

        default:
            return state;
    }
}

// --------------------
// Context type creation
// --------------------

interface TasksContextValue extends TasksState {
    dispatch: Dispatch<TaskAction>;
}

const TasksContext = createContext<TasksContextValue | undefined>(undefined);

// --------------------
// Provider
// --------------------

export function TasksProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(tasksReducer, undefined, () =>
        loadInitialState()
    );

    useEffect(() => {
        window.localStorage.setItem("taskflow-tasks", JSON.stringify(state.tasks));
    }, [state.tasks]);

    return (
        <TasksContext.Provider value={{ ...state, dispatch }}>
            {children}
        </TasksContext.Provider>
    );
}

// --------------------
// Custom hook
// --------------------

export function useTasks() {
    const context = useContext(TasksContext);
    if (!context) {
        throw new Error("useTasks must be used within a TasksProvider");
    }
    return context;
}
