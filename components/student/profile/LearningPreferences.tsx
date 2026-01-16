export function LearningPreferences() {
    return (
        <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 h-full">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg text-student-primary">
                        <span className="material-symbols-outlined">psychology</span>
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                            Meu Jeito de Aprender
                        </h2>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                            Personalize sua experiência para reduzir a ansiedade.
                        </p>
                    </div>
                </div>
                <div className="space-y-6">
                    {/* Toggle Item 1 */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                        <div className="flex gap-4 items-center">
                            <div className="bg-red-50 dark:bg-red-900/20 text-red-500 p-2 rounded-full hidden sm:block">
                                <span className="material-symbols-outlined">warning</span>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white">
                                    Tenho medo de dirigir em rodovias
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Avisaremos seu instrutor automaticamente para evitar essas
                                    rotas inicialmente.
                                </p>
                            </div>
                        </div>
                        <label className="inline-flex items-center cursor-pointer ml-4">
                            <input
                                defaultChecked
                                className="sr-only peer"
                                type="checkbox"
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-student-primary relative"></div>
                        </label>
                    </div>
                    {/* Toggle Item 2 */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                        <div className="flex gap-4 items-center">
                            <div className="bg-purple-50 dark:bg-purple-900/20 text-purple-500 p-2 rounded-full hidden sm:block">
                                <span className="material-symbols-outlined">volume_off</span>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white">
                                    Prefiro instrutores mais silenciosos
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Foco total na condução, com menos conversa casual.
                                </p>
                            </div>
                        </div>
                        <label className="inline-flex items-center cursor-pointer ml-4">
                            <input
                                className="sr-only peer"
                                type="checkbox"
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-student-primary relative"></div>
                        </label>
                    </div>
                    {/* Toggle Item 3 */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                        <div className="flex gap-4 items-center">
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 p-2 rounded-full hidden sm:block">
                                <span className="material-symbols-outlined">schedule</span>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white">
                                    Tenho pressa (Aulas intensivas)
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Sinaliza que você deseja agendar aulas com maior frequência.
                                </p>
                            </div>
                        </div>
                        <label className="inline-flex items-center cursor-pointer ml-4">
                            <input
                                className="sr-only peer"
                                type="checkbox"
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-student-primary relative"></div>
                        </label>
                    </div>
                    {/* Toggle Item 4 */}
                    <div className="flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                        <div className="flex gap-4 items-center">
                            <div className="bg-green-50 dark:bg-green-900/20 text-green-600 p-2 rounded-full hidden sm:block">
                                <span className="material-symbols-outlined">spa</span>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white">
                                    Sou uma pessoa tímida/nervosa ao volante
                                </p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">
                                    Instruções mais calmas e reforço positivo.
                                </p>
                            </div>
                        </div>
                        <label className="inline-flex items-center cursor-pointer ml-4">
                            <input
                                defaultChecked
                                className="sr-only peer"
                                type="checkbox"
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-student-primary relative"></div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}
