import type { ReactNode } from "react";

import Navbar from "./Navbar";

import Footer from "./Footer";

export function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-[#FFFAF4] dark:bg-[#121417] dark:text-slate-100 flex flex-col">
            <header className="bg-white dark:bg-[#121417] shadow-xs dark:shadow-none">
                <Navbar />
            </header>
            <main className="mx-auto max-w-6xl px-4 py-6 flex-1 w-full ">{children}</main>
            <Footer />
        </div>
    )
}