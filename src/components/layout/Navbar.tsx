import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

export default function Navbar() {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between relative bg-white dark:bg-[#121417]">
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100 cursor-pointer" onClick={() => navigate("/")}> <span className="text-amber-500 text-3xl text-center">•</span> Zentro</div>
            {/* Desktop */}
            <div className="hidden md:flex items-center gap-4">
                <Link to="/" className="px-3 py-1.5 rounded hover:bg-amber-200 text-slate-800 hover:dark:text-black dark:text-slate-100 font-medium cursor-pointer">Home</Link>
                <Link to="/completed" className="px-3 py-1.5 rounded hover:bg-amber-200 text-slate-800 hover:dark:text-black dark:text-slate-100 font-medium cursor-pointer">Task History</Link>
                <button
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    className="ml-2 p-2 rounded cursor-pointer hover:bg-slate-100 dark:hover:bg-amber-200 dark:hover:text-black"
                >
                    {theme === 'dark' ? <FaSun /> : <FaMoon />}
                </button>
            </div>
            {/* Hamburger */}
            <button
                className="md:hidden flex flex-col justify-center cursor-pointer items-center w-10 h-10 rounded focus:outline-none"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Open Menu"
            >
                <span className={`block w-6 h-0.5 bg-slate-900 dark:bg-white mb-1 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-slate-900 dark:bg-white mb-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`block w-6 h-0.5 bg-slate-900 dark:bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </button>
            {/* Mobile */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${menuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}
            >
                <div className="flex flex-col h-full p-6 gap-4">
                    <button
                        className="self-end text-2xl text-black mb-6"
                        onClick={() => setMenuOpen(false)}
                        aria-label="Close Menu"
                    >
                        &times;
                    </button>
                    <Link to="/" className="px-3 py-2 rounded hover:bg-amber-200 text-black dark:text-black font-medium cursor-pointer" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/completed" className="px-3 py-1.5 rounded hover:bg-amber-200 text-black dark:text-black font-medium cursor-pointer">Task History</Link>
                    <div className="mt-auto">
                        <button
                            onClick={() => { toggleTheme(); setMenuOpen(false); }}
                            aria-label="Toggle theme"
                            className="flex items-center gap-2 px-3 py-2 rounded text-black hover:bg-slate-100 dark:hover:text-black cursor-pointer"
                        >
                            {theme === 'dark' ? <FaSun /> : <FaMoon />} Toggle Theme
                        </button>
                    </div>
                </div>
            </div>

        </nav>
    );
}
