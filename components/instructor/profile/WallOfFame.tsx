export function WallOfFame() {
    return (
        <section className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-instructor-primary">
                        photo_library
                    </span>
                    Mural da Fama
                </h2>
                <span className="text-xs text-slate-400 border border-slate-700 rounded px-2 py-0.5">
                    +10% saúde
                </span>
            </div>
            <p className="text-sm text-slate-500 dark:text-[#92c9a4] -mt-2">
                Fotos de alunos aprovados com a CNH geram confiança imediata.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Card 1 */}
                <div className="flex flex-col gap-2">
                    <div
                        className="aspect-square rounded-lg bg-cover bg-center relative group overflow-hidden"
                        style={{
                            backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCpGD9AtDf0xTQHsJT4G66Y93y9dGO7I9lbrjNDYVSA85ti5Nq3vshbmTFs6eFnwAOn6YkeJh0ILrinxzuZkxilHnkKnfBA32cC2RIKOE_49TED_vCb2JvBqu13qe7sW3GVDX5RJT1AlwJigE9o5OgAoZ5Wi8pg00C0zBM-uLoEmrxDUJP9GtEcgorWTz9-mUtglEf6vyEWZv7LQqrzvIM3KMlS07MT9kOfK5DrpWEo3m38AcjryErtrM6rqJvb71kWl2MTZ5p0FcAP')",
                        }}
                    >
                        <button className="absolute top-2 right-2 bg-black/50 hover:bg-red-500 p-1 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                    </div>
                    <input
                        className="bg-transparent border-b border-slate-700 text-xs py-1 focus:outline-none focus:border-instructor-primary w-full text-slate-300 placeholder-slate-600"
                        type="text"
                        defaultValue="Aprovada de primeira!"
                    />
                </div>
                {/* Card 2 */}
                <div className="flex flex-col gap-2">
                    <div
                        className="aspect-square rounded-lg bg-cover bg-center relative group overflow-hidden"
                        style={{
                            backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD2IKgBNmy4If8SPm7A2XctEjJQuf_dixUGAvYZvTJOD8t_Tde3g7s2XwlUXWuOL1v5KpKAaz3GAY2aiUJuxiisb0_9xDxS7oBWtAvD7miHQEvfuxK5yMQKtA7QAFffy428c8OwJppFDrwj9t6qFPFNwEBUEWFW1rI-jJvyw_9EUMGp7thj284J6ZUgA_pkJngDkUtNOa_RjpuyqKEaFGr5uPMSFSUjX5cUGHwsis2Ln_vYnRkJHkw19PIKbDQ72C-y9L0w6Wzu701j')",
                        }}
                    >
                        <button className="absolute top-2 right-2 bg-black/50 hover:bg-red-500 p-1 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                    </div>
                    <input
                        className="bg-transparent border-b border-slate-700 text-xs py-1 focus:outline-none focus:border-instructor-primary w-full text-slate-300 placeholder-slate-600"
                        type="text"
                        defaultValue="João perdeu o medo"
                    />
                </div>
                {/* Card 3 */}
                <div className="flex flex-col gap-2">
                    <div
                        className="aspect-square rounded-lg bg-cover bg-center relative group overflow-hidden"
                        style={{
                            backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDlHBMQWgY4p-UF-P2HU74ENybREZpZa_xkJP8QSNo9K077HYxN5dr3IvxehjYr7W7JIO1qVsvBJzfpxmJHtkc0KdgXfAPGfVDR9jaRhsPkAxZ5T8qpfuS-2lZ-pbQbHNP7z5kdBHaiPqt637ClZQmlWyUFX2O0a6TJLi8omGzDhl1-8foG3ggAkn5XA6IKtZMsu00EkcBAizxNOoXIX7k2y09WetfLpzyQbPH6sSyzFCF4U-Namv2oqsuySVRvARjItIMjTycK51jI')",
                        }}
                    >
                        <button className="absolute top-2 right-2 bg-black/50 hover:bg-red-500 p-1 rounded text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <span className="material-symbols-outlined text-sm">delete</span>
                        </button>
                    </div>
                    <input
                        className="bg-transparent border-b border-slate-700 text-xs py-1 focus:outline-none focus:border-instructor-primary w-full text-slate-300 placeholder-slate-600"
                        type="text"
                        defaultValue="Mais uma habilitada!"
                    />
                </div>
                {/* Add Button */}
                <button className="aspect-square rounded-lg border border-dashed border-slate-600 flex flex-col items-center justify-center gap-2 hover:bg-[#1a3324] hover:border-instructor-primary transition-all text-slate-400 hover:text-instructor-primary cursor-pointer">
                    <span className="material-symbols-outlined text-3xl">add_circle</span>
                    <span className="text-xs font-medium">Adicionar</span>
                </button>
            </div>
        </section>
    );
}
