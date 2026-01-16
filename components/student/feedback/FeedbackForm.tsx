export function FeedbackForm() {
    return (
        <div className="px-8 py-4 flex flex-col gap-6">
            {/* Checkbox Group */}
            <div className="flex flex-col gap-3">
                <label className="group relative flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 cursor-pointer transition-all hover:border-student-primary hover:bg-blue-50/50 dark:hover:bg-student-primary/10">
                    <input
                        className="h-5 w-5 rounded border-2 border-slate-300 dark:border-slate-500 bg-transparent text-student-primary checked:bg-student-primary checked:border-student-primary focus:ring-0 focus:ring-offset-0 focus:outline-none transition-colors"
                        type="checkbox"
                    />
                    <span className="text-base font-medium text-slate-900 dark:text-slate-200">
                        Ele não teve paciência
                    </span>
                </label>
                <label className="group relative flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 cursor-pointer transition-all hover:border-student-primary hover:bg-blue-50/50 dark:hover:bg-student-primary/10">
                    <input
                        className="h-5 w-5 rounded border-2 border-slate-300 dark:border-slate-500 bg-transparent text-student-primary checked:bg-student-primary checked:border-student-primary focus:ring-0 focus:ring-offset-0 focus:outline-none transition-colors"
                        type="checkbox"
                    />
                    <span className="text-base font-medium text-slate-900 dark:text-slate-200">
                        O carro apresentou problemas
                    </span>
                </label>
                <label className="group relative flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 cursor-pointer transition-all hover:border-student-primary hover:bg-blue-50/50 dark:hover:bg-student-primary/10">
                    <input
                        className="h-5 w-5 rounded border-2 border-slate-300 dark:border-slate-500 bg-transparent text-student-primary checked:bg-student-primary checked:border-student-primary focus:ring-0 focus:ring-offset-0 focus:outline-none transition-colors"
                        type="checkbox"
                    />
                    <span className="text-base font-medium text-slate-900 dark:text-slate-200">
                        Nossos horários não batem
                    </span>
                </label>
                <label className="group relative flex items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 cursor-pointer transition-all hover:border-student-primary hover:bg-blue-50/50 dark:hover:bg-student-primary/10">
                    <input
                        className="h-5 w-5 rounded border-2 border-slate-300 dark:border-slate-500 bg-transparent text-student-primary checked:bg-student-primary checked:border-student-primary focus:ring-0 focus:ring-offset-0 focus:outline-none transition-colors"
                        type="checkbox"
                    />
                    <span className="text-base font-medium text-slate-900 dark:text-slate-200">
                        Outro motivo
                    </span>
                </label>
            </div>
            {/* Text Area */}
            <label className="flex flex-col gap-2">
                <span className="text-slate-900 dark:text-slate-300 text-sm font-semibold tracking-wide">
                    Conte-nos um pouco mais (Opcional)
                </span>
                <textarea
                    className="form-textarea w-full resize-none rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-4 text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-student-primary focus:ring-1 focus:ring-student-primary focus:outline-none min-h-[120px] transition-shadow shadow-sm"
                    placeholder="Escreva seu comentário aqui..."
                ></textarea>
            </label>
        </div>
    );
}
