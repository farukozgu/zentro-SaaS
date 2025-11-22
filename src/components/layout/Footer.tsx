import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="shadow-xs dark:shadow-none bg-white dark:bg-[#121417] mt-8">
            <div className="mx-auto max-w-6xl gap-1 px-4 py-4 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                <div className="flex items-center gap-1 font-bold text-base sm:text-lg text-black dark:text-slate-100 logo"><span className="text-amber-500 text-xl text-center">•</span> Zentro</div>
                <div className="flex items-center gap-4 ml-auto">
                    <div className="flex items-center gap-1 sm:gap-4">
                        <a href="https://github.com/farukozgu" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-slate-100"><FaGithub size={20} /></a>
                        <a href="https://www.linkedin.com/in/farukozgu/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 dark:hover:text-slate-100"><FaLinkedin size={20} /></a>
                    </div>
                    <div className="text-xs text-black dark:text-slate-300 pl-4">&copy; {new Date().getFullYear()} TaskFlow. All rights reserved.</div>
                </div>
            </div>
        </footer>
    );
}
