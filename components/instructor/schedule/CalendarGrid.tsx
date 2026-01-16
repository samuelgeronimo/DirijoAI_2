export function CalendarGrid() {
    return (
        <div className="flex flex-col rounded-xl border border-instructor-surface-dark bg-instructor-bg-dark overflow-hidden shadow-2xl">
            {/* Calendar Header Days */}
            <div className="grid grid-cols-8 border-b border-instructor-surface-dark bg-[#1a2333]">
                {/* Time Col Header */}
                <div className="h-14 border-r border-instructor-surface-dark p-3"></div>
                {/* Days */}
                <div className="flex flex-col items-center justify-center border-r border-instructor-surface-dark h-14 bg-instructor-surface-dark-2/50">
                    <span className="text-xs font-medium text-[#92a4c9]">SEG</span>
                    <span className="text-lg font-bold text-white">12</span>
                </div>
                <div className="flex flex-col items-center justify-center border-r border-instructor-surface-dark h-14 bg-instructor-primary/10 relative overflow-hidden">
                    <div className="absolute top-0 w-full h-1 bg-instructor-primary"></div>
                    <span className="text-xs font-bold text-instructor-primary">
                        TER (Hoje)
                    </span>
                    <span className="text-lg font-bold text-white">13</span>
                </div>
                <div className="flex flex-col items-center justify-center border-r border-instructor-surface-dark h-14">
                    <span className="text-xs font-medium text-[#92a4c9]">QUA</span>
                    <span className="text-lg font-bold text-white">14</span>
                </div>
                <div className="flex flex-col items-center justify-center border-r border-instructor-surface-dark h-14">
                    <span className="text-xs font-medium text-[#92a4c9]">QUI</span>
                    <span className="text-lg font-bold text-white">15</span>
                </div>
                <div className="flex flex-col items-center justify-center border-r border-instructor-surface-dark h-14">
                    <span className="text-xs font-medium text-[#92a4c9]">SEX</span>
                    <span className="text-lg font-bold text-white">16</span>
                </div>
                <div className="flex flex-col items-center justify-center border-r border-instructor-surface-dark h-14">
                    <span className="text-xs font-medium text-[#92a4c9]">SÁB</span>
                    <span className="text-lg font-bold text-white">17</span>
                </div>
                <div className="flex flex-col items-center justify-center h-14">
                    <span className="text-xs font-medium text-[#92a4c9]">DOM</span>
                    <span className="text-lg font-bold text-white">18</span>
                </div>
            </div>
            {/* Calendar Body (Times + Slots) */}
            <div className="grid grid-cols-8 relative overflow-y-auto max-h-[600px] custom-scrollbar">
                {/* 08:00 Row */}
                <div className="border-r border-b border-instructor-surface-dark p-2 text-xs font-medium text-[#92a4c9] text-center h-28 relative">
                    <span className="-top-2.5 relative bg-instructor-bg-dark px-1">
                        08:00
                    </span>
                </div>
                {/* Mon 08:00 */}
                <div className="border-r border-b border-instructor-surface-dark p-1 h-28 relative group/slot">
                    <div className="h-full w-full rounded bg-[#2e3b52] border-l-4 border-indigo-500 p-2 cursor-pointer hover:bg-[#364560] transition-all">
                        <div className="flex items-center gap-2 mb-1">
                            <div
                                className="h-6 w-6 rounded-full bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB64XPp5vGgl0efppmjYvX4HE1XsLPHHawuPBskz9slYmObQyMnWdA9NyvpwH8OI_i7HLUCNbd3z9x31OZwm2Oe5rf11eoJ0H6A6-_oHBlPIc_mz9dOdlnpStHQbudHjDk_tUZLue--Y_RYpAIVlUoPEXobh5HUtyCNQ7Rrc3TjX6gqr9s_3Z3ViIzAFP102d4DcbPaWniLJuhNsaBE-eOOaHZMWjn6j4OchvtDommiePX-UJLUod0bzJsgUJft65RZ_Fn2ZwilEORT')",
                                }}
                            ></div>
                            <span className="text-xs font-bold text-white truncate">
                                Ana Paula
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-indigo-400">
                                location_on
                            </span>
                            <span className="text-[10px] text-gray-300 truncate">Centro</span>
                        </div>
                    </div>
                </div>
                {/* Tue 08:00 (Today - Occupied) */}
                <div className="border-r border-b border-instructor-surface-dark p-1 h-28 bg-instructor-primary/5">
                    <div className="h-full w-full rounded bg-instructor-primary/20 border-l-4 border-instructor-primary p-2 cursor-pointer hover:bg-instructor-primary/30 transition-all flex flex-col justify-between">
                        <div className="flex items-center gap-2">
                            <div
                                className="h-6 w-6 rounded-full bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD_V7Vm6c8o_f3pO4Kw_WByT8CKEUz_x3H-6Z91ZFQchp_RHk5OInaEr8nNkdjYnRPD9jWNs1JD5D7olS5gWrA8G_yyKL9mBHCxGgOsZr3K_JBIFR6Mlx6OOf0ebNVGMQKb5OM6lUENAE3_7A2tZ7kUYcN0pgjFjUiaxYNuq8ae15sTbGg8uGB__PuYAguv4QmmJo8ANz1nqLLFwpsgJggBqJHZ1uk6CsuukPGuOAV0BnCePtPHDvuiWvhieQQN_qE_sXvK4SU8hZ1R')",
                                }}
                            ></div>
                            <span className="text-xs font-bold text-white truncate">
                                Carlos M.
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-instructor-primary">
                                school
                            </span>
                            <span className="text-[10px] text-gray-300 truncate">
                                Aula 4/20
                            </span>
                        </div>
                    </div>
                </div>
                {/* Wed 08:00 (Flash Offer Slot) */}
                <div className="border-r border-b border-instructor-surface-dark p-1 h-28 relative">
                    <div className="h-full w-full rounded border-2 border-dashed border-instructor-primary/40 bg-instructor-primary/5 p-2 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-instructor-primary/10 hover:border-instructor-primary group animate-pulse-glow transition-all">
                        <div className="flex items-center gap-1 rounded-full bg-instructor-primary px-2 py-0.5 shadow-lg shadow-instructor-primary/20">
                            <span className="material-symbols-outlined text-[12px] text-white">
                                bolt
                            </span>
                            <span className="text-[10px] font-bold text-white">5% OFF</span>
                        </div>
                        <span className="text-[10px] text-instructor-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                            Disponível
                        </span>
                    </div>
                </div>
                {/* Thu 08:00 */}
                <div className="border-r border-b border-instructor-surface-dark p-1 h-28"></div>
                {/* Fri 08:00 */}
                <div className="border-r border-b border-instructor-surface-dark p-1 h-28"></div>
                {/* Sat 08:00 */}
                <div className="border-r border-b border-instructor-surface-dark p-1 h-28 bg-[#1a2333]/50">
                    <div className="h-full w-full flex items-center justify-center opacity-30">
                        <span className="material-symbols-outlined text-gray-500">
                            block
                        </span>
                    </div>
                </div>
                {/* Sun 08:00 */}
                <div className="border-b border-instructor-surface-dark p-1 h-28 bg-[#1a2333]/50"></div>
                {/* 09:00 Row */}
                <div className="border-r border-b border-instructor-surface-dark p-2 text-xs font-medium text-[#92a4c9] text-center h-28 relative">
                    <span className="-top-2.5 relative bg-instructor-bg-dark px-1">
                        09:00
                    </span>
                </div>
                {/* Mon 09:00 */}
                <div className="border-r border-b border-instructor-surface-dark p-1 h-28"></div>
                {/* Tue 09:00 (Today - Details Open) */}
                <div className="border-r border-b border-instructor-surface-dark p-1 h-28 bg-instructor-primary/5 relative z-20">
                    {/* The Slot Card */}
                    <div className="h-full w-full rounded bg-[#2e3b52] border-l-4 border-emerald-500 p-2 cursor-pointer shadow-lg ring-2 ring-white/20">
                        <div className="flex items-center gap-2 mb-1">
                            <div
                                className="h-6 w-6 rounded-full bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAjjXk-kqt5CaKO7MyL3uf1ZrcZriWmRWg1dIDiibuZ4ffHDNenCdYYloWkguoSGCXuN_SPRbk9iz0CMGCvfotluIdhrTqtl4Q9EZJ4yEzM8FvypH8EU0rDrUQt82j3fKI7S3pw3V8faSG3OSWQrq4iXJI4TtuZpYhdRQ1Yo3n8r7fuDbekA4n2TUPTWL0Iym8vciT7UbZ6BH3Ggw1ujGeiTPhW_vq-b_D-lcPZZIpRirECKfyoCMId2MgZw4_YRLxa3Wge5tHA5X5-')",
                                }}
                            ></div>
                            <span className="text-xs font-bold text-white truncate">
                                Mariana S.
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-emerald-400">
                                timer
                            </span>
                            <span className="text-[10px] text-gray-300 truncate">
                                45min rest.
                            </span>
                        </div>
                    </div>
                    {/* The Popover (Visualizing Click State) */}
                    <div className="absolute top-0 left-[105%] w-64 rounded-xl bg-[#1e293b] border border-instructor-surface-dark shadow-2xl p-4 z-50">
                        <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center gap-3">
                                <div
                                    className="h-10 w-10 rounded-full bg-cover bg-center"
                                    style={{
                                        backgroundImage:
                                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAYEQ8z6nYr5_z77XcoER180K3jMXeP5WxJw2izrT3JdJt4FamdgzSjCUlK0BgE0Sqhi5GjkX0WZrh5EVj-LjhWWAXPqCied0IRCeuWeyrxuDqIhkKl39F9gQ-5P3RPG-tEF_-N7wF2hjMY9YorMmSj_ayE55UHrME84ZGKlRYUye6EmTdPPFACBY1MW-DHTg1pMsvikfdsm88EDksdn6OVOha_4XF6noOyQ5t_RTSGhgEIYcZMr7VYkKejSdIATm0hrWecTg4mUSk2')",
                                    }}
                                ></div>
                                <div>
                                    <p className="text-sm font-bold text-white">Mariana Souza</p>
                                    <p className="text-xs text-[#92a4c9]">Pacote Iniciante</p>
                                </div>
                            </div>
                            <button className="text-[#92a4c9] hover:text-white cursor-pointer">
                                <span className="material-symbols-outlined text-[18px]">
                                    close
                                </span>
                            </button>
                        </div>
                        <div className="space-y-3">
                            <div className="flex gap-3 items-start">
                                <div className="mt-0.5 rounded bg-instructor-bg-dark p-1 text-[#92a4c9]">
                                    <span className="material-symbols-outlined text-[16px]">
                                        location_on
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-[#64748b]">
                                        Endereço de Busca
                                    </p>
                                    <p className="text-xs text-white leading-tight">
                                        Rua das Acácias, 450 - Jd. Paulista
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <div className="mt-0.5 rounded bg-instructor-bg-dark p-1 text-[#92a4c9]">
                                    <span className="material-symbols-outlined text-[16px]">
                                        call
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-[#64748b]">
                                        Telefone
                                    </p>
                                    <p className="text-xs text-white leading-tight">
                                        (11) 98765-4321
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3 items-start">
                                <div className="mt-0.5 rounded bg-instructor-bg-dark p-1 text-[#92a4c9]">
                                    <span className="material-symbols-outlined text-[16px]">
                                        flag
                                    </span>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-[#64748b]">
                                        Foco da Aula
                                    </p>
                                    <span className="inline-block rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/20">
                                        Baliza e Estacionamento
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-2">
                            <button className="flex-1 rounded-md bg-instructor-primary py-1.5 text-xs font-bold text-white hover:bg-blue-600 cursor-pointer">
                                Iniciar
                            </button>
                            <button className="flex-1 rounded-md bg-instructor-bg-dark py-1.5 text-xs font-bold text-[#92a4c9] hover:text-white border border-instructor-surface-dark cursor-pointer">
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
                {/* Wed 09:00 (Flash Offer Slot) */}
                <div className="border-r border-b border-instructor-surface-dark p-1 h-28 relative">
                    <div className="h-full w-full rounded border-2 border-dashed border-instructor-primary/40 bg-instructor-primary/5 p-2 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-instructor-primary/10 hover:border-instructor-primary group animate-pulse-glow transition-all">
                        <div className="flex items-center gap-1 rounded-full bg-instructor-primary px-2 py-0.5 shadow-lg shadow-instructor-primary/20">
                            <span className="material-symbols-outlined text-[12px] text-white">
                                bolt
                            </span>
                            <span className="text-[10px] font-bold text-white">5% OFF</span>
                        </div>
                    </div>
                </div>
                {/* Thu 09:00 */}
                <div className="border-r border-b border-instructor-surface-dark p-1 h-28">
                    <div className="h-full w-full rounded bg-[#2e3b52] border-l-4 border-orange-500 p-2 cursor-pointer hover:bg-[#364560] transition-all">
                        <div className="flex items-center gap-2 mb-1">
                            <div
                                className="h-6 w-6 rounded-full bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBMdtbMCJveGTzxG7yyB2Sl_Gl8qrVM9wPFrgG2KKVbnts_6Fe1pMdxC6jjiwjpltKNMnnnigL31zNEFOeS2tCzoiGsIclimylQsMwfzLmyz1KDxPgMZY8-aDKZlc07x2cXn2RqCEtZeomsO_-_VgS3PwEhmWi-YvYyqtOIRh5XRwFkz2Ddrpj9O3Jhi8LZZW99IxZZtwJSjcU8UJFBfa-tBGlPsz2O98fVSo8hR03jPkuJegt2zx1xBLSLrEph_SyVGFt8YiPJxSAP')",
                                }}
                            ></div>
                            <span className="text-xs font-bold text-white truncate">
                                Pedro H.
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-orange-400">
                                school
                            </span>
                            <span className="text-[10px] text-gray-300 truncate">
                                Prova Prática
                            </span>
                        </div>
                    </div>
                </div>
                {/* Fri 09:00 */}
                <div className="border-r border-b border-instructor-surface-dark p-1 h-28"></div>
                {/* Sat 09:00 */}
                <div className="border-r border-b border-instructor-surface-dark p-1 h-28 bg-[#1a2333]/50"></div>
                {/* Sun 09:00 */}
                <div className="border-b border-instructor-surface-dark p-1 h-28 bg-[#1a2333]/50"></div>
                {/* 10:00 Row (Just grid lines for context) */}
                <div className="border-r border-b border-instructor-surface-dark p-2 text-xs font-medium text-[#92a4c9] text-center h-28 relative">
                    <span className="-top-2.5 relative bg-instructor-bg-dark px-1">
                        10:00
                    </span>
                </div>
                <div className="border-r border-b border-instructor-surface-dark p-1 h-28"></div>
                <div className="border-r border-b border-instructor-surface-dark p-1 h-28 bg-instructor-primary/5"></div>{" "}
                {/* Today Col Highlight */}
                <div className="border-r border-b border-instructor-surface-dark p-1 h-28 relative">
                    {" "}
                    {/* Flash Offer */}
                    <div className="h-full w-full rounded border-2 border-dashed border-instructor-primary/40 bg-instructor-primary/5 p-2 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-instructor-primary/10 hover:border-instructor-primary group animate-pulse-glow transition-all">
                        <div className="flex items-center gap-1 rounded-full bg-instructor-primary px-2 py-0.5 shadow-lg shadow-instructor-primary/20">
                            <span className="material-symbols-outlined text-[12px] text-white">
                                bolt
                            </span>
                            <span className="text-[10px] font-bold text-white">5% OFF</span>
                        </div>
                    </div>
                </div>
                <div className="border-r border-b border-instructor-surface-dark p-1 h-28">
                    <div className="h-full w-full rounded bg-[#2e3b52] border-l-4 border-purple-500 p-2 cursor-pointer hover:bg-[#364560] transition-all">
                        <div className="flex items-center gap-2 mb-1">
                            <div
                                className="h-6 w-6 rounded-full bg-cover bg-center"
                                style={{
                                    backgroundImage:
                                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBiwgMkd088sATGoFuGamJCNpQqBOV2S7STW7jpQHLM5aAux6Gq8ebwt9ruRp0EtVYWdzk_38_7wuZnCUZwJdfGtT6TavBqt9y6SjYUe1QCSBV3vM2DWEXDCa7YR7z9Xk-YQVhDTUOTioyCeRHiQW0sR-7bHNPx71do5vRdHiJN3qs65eagBrmXmd6HLBLX7J6JswVOhJAPXnLEkNQrgqO4xINAkLa8pJTP6z3i7In6wMSZUaSlDFvIC062YEQvE61YOfvkZvDdEqFp')",
                                }}
                            ></div>
                            <span className="text-xs font-bold text-white truncate">
                                Lúcia F.
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px] text-purple-400">
                                route
                            </span>
                            <span className="text-[10px] text-gray-300 truncate">
                                Estrada
                            </span>
                        </div>
                    </div>
                </div>
                <div className="border-r border-b border-instructor-surface-dark p-1 h-28"></div>
                <div className="border-r border-b border-instructor-surface-dark p-1 h-28 bg-[#1a2333]/50"></div>
                <div className="border-b border-instructor-surface-dark p-1 h-28 bg-[#1a2333]/50"></div>
            </div>
        </div>
    );
}
