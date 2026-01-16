export function FeedbackHeader() {
    return (
        <div className="px-8 pt-8 pb-4">
            <div className="flex flex-col sm:flex-row gap-5 items-start">
                {/* Avatar */}
                <div className="relative shrink-0">
                    <div className="h-16 w-16 rounded-full overflow-hidden border-2 border-white dark:border-slate-700 shadow-md">
                        <img
                            alt="Portrait of instructor Carlos M."
                            className="h-full w-full object-cover"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuACsrlk32GuYXGeZY36apZdsbbaCDAEsKNPEvZADVYt_veXxrh4y9c1XWpgZxTJ5MS3wHptn6f41h7G_P6n78Z8uI0EXOgzYFZyGZIU30m9bW9lwvp4q_dYsvTI8af1K15a5rneRQWKRLhTIijO3pI6Tq0vvK-9M2nY_LwYDnSf1Hrd4xIrlDfhWYnCLRGm_lYEmfvdhJAA9OTm0Wxf5DV55pF_fb_iIyMo5fBrJI7ZeLGhCxPwooHczQh5637oqMvsqLNEU4mAPWmC"
                        />
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-800 rounded-full p-1 shadow-sm">
                        <span className="material-symbols-outlined text-yellow-500 text-[18px]">
                            star
                        </span>
                    </div>
                </div>
                {/* Titles */}
                <div className="flex flex-col gap-1 pt-1">
                    <h2 className="text-2xl font-bold leading-tight text-slate-900 dark:text-white">
                        Poxa, o que houve com o Carlos M.?
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">
                        Sua opinião é muito importante para nós e nos ajuda a melhorar.
                    </p>
                </div>
            </div>
        </div>
    );
}
