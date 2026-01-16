export function StudentProfileForm() {
    return (
        <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar Section */}
                <div className="flex flex-col items-center gap-4 mx-auto md:mx-0 min-w-[200px]">
                    <div className="relative group cursor-pointer">
                        <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full w-32 h-32 ring-4 ring-slate-50 dark:ring-slate-900 shadow-md"
                            style={{
                                backgroundImage:
                                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC4UYxWJzzr-1QnZbmiEhB2hGciC6gmoyMA1sT7bnttgeEU6XGVLfiQnaT91rjCo7hhzQIxzX0-AOkMiv3kLgoDRytgrOdwqK20NEWh7JpMy1GBvY5jUe9M8wQISKgeHCVHFvxCKUYdYEMD23tooYyQgAbf8vDhlkDJfnoQ4C70TNsDH3K_LP32TzsZWiL1imDBBjtv1J2wEFmxaOeW_88PSPqf2jdYzABGkAHY07S5248Tv0TBzyJVsqRs3xcJBlBjLQKcsoigHMVy")',
                            }}
                        ></div>
                        <div className="absolute bottom-0 right-0 bg-student-primary hover:bg-blue-600 text-white rounded-full p-2 shadow-lg transition-colors flex items-center justify-center">
                            <span className="material-symbols-outlined text-[20px]">
                                edit
                            </span>
                        </div>
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            Maria Silva
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Aluno(a)
                        </p>
                    </div>
                </div>
                {/* Form Fields */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <label className="flex flex-col gap-2">
                        <span className="text-slate-900 dark:text-slate-200 text-sm font-medium">
                            Nome Completo
                        </span>
                        <input
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-student-primary/50 focus:border-student-primary px-4 py-3 text-base"
                            type="text"
                            defaultValue="Maria Aparecida da Silva"
                        />
                    </label>
                    <label className="flex flex-col gap-2">
                        <span className="text-slate-900 dark:text-slate-200 text-sm font-medium">
                            E-mail
                        </span>
                        <input
                            className="w-full rounded-lg border border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-student-primary/50 focus:border-student-primary px-4 py-3 text-base"
                            type="email"
                            defaultValue="maria.silva@email.com"
                        />
                    </label>
                    <label className="flex flex-col gap-2 md:col-span-2">
                        <span className="text-slate-900 dark:text-slate-200 text-sm font-medium">
                            WhatsApp
                        </span>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 dark:text-slate-400">
                                <span className="material-symbols-outlined text-[20px]">
                                    chat
                                </span>
                            </span>
                            <input
                                className="w-full rounded-lg border border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-student-primary/50 focus:border-student-primary pl-11 pr-4 py-3 text-base"
                                type="tel"
                                defaultValue="(11) 99999-9999"
                            />
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
}
