import {
    createContext,
    useContext,
    useState,
    useCallback,
} from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

type ToastType = "success" | "error" | "info";

type Toast = {
    id: number;
    message: string;
    type: ToastType;
};

type ToastContextValue = {
    showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = "info") => {
        const id = Date.now();

        setToasts((prev) => [...prev, { id, message, type }]);

        // 3 saniye sonra otomatik kaldır
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast container */}
            <div className="pointer-events-none fixed inset-x-0 top-4 flex justify-center px-4 sm:justify-end">
                <div className="space-y-2 sm:w-full sm:max-w-sm">
                    <AnimatePresence>
                        {toasts.map((toast) => (
                            <motion.div
                                key={toast.id}
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.18 }}
                                className={`
                  pointer-events-auto flex items-start gap-2 rounded-lg border px-4 py-3 shadow-lg
                  ${toast.type === "success"
                                        ? "border-emerald-300 bg-emerald-50 text-emerald-900"
                                        : toast.type === "error"
                                            ? "border-red-300 bg-red-50 text-red-900"
                                            : "border-slate-300 bg-white text-slate-900"
                                    }
                `}
                            >
                                <div className="flex-1 text-md ">{toast.message}</div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const ctx = useContext(ToastContext);
    if (!ctx) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return ctx;
}
