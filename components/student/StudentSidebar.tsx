import Link from "next/link";
import Image from "next/image";

export function StudentSidebar() {
    return (
        <div className="w-64 flex-col justify-between border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hidden lg:flex h-screen fixed left-0 top-0 overflow-y-auto">
            <div className="p-4">
                <div className="flex flex-col gap-6">
                    {/* User Profile Snippet in Sidebar */}
                    <div className="flex items-center gap-3 px-2">
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 shadow-sm"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDodf4FdR9BJuDq2Djam04_Q3kwMb0hSPk1SgGYLh_AUsDPGuby0gUDs0QPpdpMZVtoZtoMZCZW4pG1JMnkisdE6UqGwWvZmZ-iXtHLk0Bx8dtdlhpo1JWzcD20X2zZ8W5CC_R2fyJvsLA9tgAYH58MHt62brvbytAIi5RBJX4qRjgsMsgOilWXQlgejfjLjYLBR8BDU5Hv_eOESWML4amyPF8IvTGLvS1w2gbXhP3nMqQvUQPHtlBcbZZzmiPbQ98f8lzcQXA5GoPG")',
                            }}
                        ></div>
                        <div className="flex flex-col">
                            <h1 className="text-slate-900 dark:text-white text-base font-semibold leading-normal">
                                João Silva
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-xs font-normal leading-normal">
                                Aluno
                            </p>
                        </div>
                    </div>
                    {/* Navigation Links */}
                    <nav className="flex flex-col gap-2">
                        <Link
                            className="flex items-center gap-3 px-3 py-3 rounded-lg bg-student-primary/10 text-student-primary"
                            href="#"
                        >
                            <span className="material-symbols-outlined">home</span>
                            <span className="text-sm font-medium leading-normal">Home</span>
                        </Link>
                        <Link
                            className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            href="/student/change-instructor"
                        >
                            <span className="material-symbols-outlined">search</span>
                            <span className="text-sm font-medium leading-normal">
                                Buscar Instrutor
                            </span>
                        </Link>
                        <Link
                            className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            href="/student/schedule"
                        >
                            <span className="material-symbols-outlined">calendar_month</span>
                            <span className="text-sm font-medium leading-normal">
                                Agenda
                            </span>
                        </Link>
                        <Link
                            className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            href="/student/profile"
                        >
                            <span className="material-symbols-outlined">person</span>
                            <span className="text-sm font-medium leading-normal">
                                Perfil
                            </span>
                        </Link>
                    </nav>
                </div>
            </div>
            {/* Sidebar Footer */}
            <div className="p-4">
                <button className="flex w-full items-center gap-3 px-3 py-3 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 transition-colors cursor-pointer">
                    <span className="material-symbols-outlined">logout</span>
                    <span className="text-sm font-medium leading-normal">Sair</span>
                </button>
            </div>
        </div>
    );
}
