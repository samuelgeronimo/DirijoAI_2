"use client";

export function PayoutRequestsTable() {
    return (
        <div className="flex-1 w-full bg-[#111a22] rounded-xl border border-[#324d67] flex flex-col">
            {/* Toolbar */}
            <div className="p-4 border-b border-[#324d67] flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="relative w-full sm:max-w-md">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="material-symbols-outlined text-[#92adc9]">
                            search
                        </span>
                    </div>
                    <input
                        className="block w-full pl-10 pr-3 py-2.5 bg-[#233648] border-none rounded-lg text-white placeholder-[#92adc9] focus:ring-2 focus:ring-[#137fec] text-sm"
                        placeholder="Buscar por instrutor, CPF ou ID..."
                        type="text"
                    />
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-[#324d67] text-[#92adc9] hover:text-white hover:bg-[#233648] transition-colors text-sm font-medium">
                        <span className="material-symbols-outlined text-[20px]">
                            download
                        </span>
                        Exportar
                    </button>
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#137fec] hover:bg-blue-600 text-white shadow-lg shadow-blue-500/25 transition-all text-sm font-bold">
                        <span className="material-symbols-outlined text-[20px]">
                            check_circle
                        </span>
                        Aprovar (0)
                    </button>
                </div>
            </div>
            {/* Table Container */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[#324d67] bg-[#1a2632]">
                            <th className="p-4 w-12">
                                <input
                                    className="rounded border-[#324d67] bg-[#233648] text-[#137fec] focus:ring-offset-[#111a22] focus:ring-[#137fec] size-4"
                                    type="checkbox"
                                />
                            </th>
                            <th className="p-4 text-xs font-semibold text-[#92adc9] uppercase tracking-wider">
                                Instrutor
                            </th>
                            <th className="p-4 text-xs font-semibold text-[#92adc9] uppercase tracking-wider text-right">
                                Valor Solicitado
                            </th>
                            <th className="p-4 text-xs font-semibold text-[#92adc9] uppercase tracking-wider">
                                Dados Bancários
                            </th>
                            <th className="p-4 text-xs font-semibold text-[#92adc9] uppercase tracking-wider">
                                Data
                            </th>
                            <th className="p-4 text-xs font-semibold text-[#92adc9] uppercase tracking-wider text-center">
                                Status Risk
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#324d67]">
                        {/* Row 1: Normal */}
                        <tr className="group hover:bg-[#1a2632] transition-colors">
                            <td className="p-4">
                                <input
                                    className="rounded border-[#324d67] bg-[#233648] text-[#137fec] focus:ring-offset-[#111a22] focus:ring-[#137fec] size-4"
                                    type="checkbox"
                                />
                            </td>
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="size-9 rounded-full bg-cover bg-center"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDhveIWxQIb5Hyv62x3fu07zqsMkw3Mka1-K7A6fRhWvqOP6dmUEuus3eauD9SJyqcMu3vxDF7NedEKW4qBP7dz6HNe0_GGG5HKsZ9X3aXn7mHsf44t9aOFPqwA9xsPFKTmpccBG56Xukz5tmwzT0QANjRkZxIRluJPI_X694Mjry2IU0VY91yUdcJiHR__1B14bj9WuSZkvRVfuGDuSDLLixGWFvje5mtWJRvHK88CEdWff80peaDJPxSmOfHw369E41S1wYTAeRog")',
                                        }}
                                    ></div>
                                    <div>
                                        <p className="text-white text-sm font-medium">
                                            Roberto Alves
                                        </p>
                                        <div className="flex items-center gap-1 text-xs text-[#92adc9]">
                                            <span className="material-symbols-outlined text-[14px] text-yellow-400 fill-current">
                                                star
                                            </span>
                                            4.9
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4 text-right">
                                <p className="text-white font-medium">R$ 1.250,00</p>
                            </td>
                            <td className="p-4">
                                <div className="flex flex-col">
                                    <p className="text-white text-sm">Nubank (260)</p>
                                    <p className="text-[#92adc9] text-xs">
                                        PIX: roberto.a@email.com
                                    </p>
                                </div>
                            </td>
                            <td className="p-4 text-[#92adc9] text-sm">24 Out, 10:30</td>
                            <td className="p-4 text-center">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    <span className="material-symbols-outlined text-[14px]">
                                        verified_user
                                    </span>
                                    Seguro
                                </span>
                            </td>
                        </tr>
                        {/* Row 2: RISK ALERT */}
                        <tr className="group bg-red-900/10 hover:bg-red-900/20 transition-colors border-l-2 border-l-red-500">
                            <td className="p-4 pl-[14px]">
                                <input
                                    className="rounded border-red-900/30 bg-red-900/20 text-red-500 focus:ring-offset-[#111a22] focus:ring-red-500 size-4"
                                    type="checkbox"
                                />
                            </td>
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="size-9 rounded-full bg-cover bg-center ring-2 ring-red-500/30"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDIeFdvMq7WnuMunUEsP17hIlbzMYL_LoobHqGJMnORKBDFUMxMVGyHsd-1fFgwB-8STXa_lrsgkT-qncrVDDHw4Rmqv_S0IFtvqAfTeTRYo6aLdf5hhOeLL9Vg7I6hzf9hlsit-TVdOqNJzE2XgnJTAelYfLkwkOGL5QozPidaA_OrA8X7JpV4EvZ3pj75D031z58GXKbG8VcsXtILxURyzIx0Bn5RUfVYvfSzZOgk0VBdLxQD5l6VOOYsKIYYzQ_-oVcunCdIDAHu")',
                                        }}
                                    ></div>
                                    <div>
                                        <p className="text-white text-sm font-medium">
                                            Mariana Costa
                                        </p>
                                        <div className="flex items-center gap-1 text-xs text-red-400">
                                            <span className="material-symbols-outlined text-[14px] fill-current">
                                                star
                                            </span>
                                            2.4 • 3 Disputas
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4 text-right">
                                <p className="text-white font-medium">R$ 4.890,00</p>
                                <p className="text-xs text-red-400 font-medium">Valor Alto</p>
                            </td>
                            <td className="p-4">
                                <div className="flex flex-col">
                                    <p className="text-white text-sm">Itaú (341)</p>
                                    <p className="text-[#92adc9] text-xs">
                                        Ag: 3002 CC: 99821-2
                                    </p>
                                </div>
                            </td>
                            <td className="p-4 text-[#92adc9] text-sm">24 Out, 09:15</td>
                            <td className="p-4 text-center">
                                <div className="flex flex-col items-center gap-1">
                                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-red-500 text-white shadow-sm shadow-red-900/50 animate-pulse">
                                        <span className="material-symbols-outlined text-[14px]">
                                            warning
                                        </span>
                                        Risco Fraude
                                    </span>
                                </div>
                            </td>
                        </tr>
                        {/* Row 3: Normal */}
                        <tr className="group hover:bg-[#1a2632] transition-colors">
                            <td className="p-4">
                                <input
                                    className="rounded border-[#324d67] bg-[#233648] text-[#137fec] focus:ring-offset-[#111a22] focus:ring-[#137fec] size-4"
                                    type="checkbox"
                                />
                            </td>
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="size-9 rounded-full bg-cover bg-center"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAKEFq8q7-p4Sp5lGFh3X7cgUOPr72pHkggse-zXs405ZtnVOR_vloiCbqFA_dV_71nUiyV31_JoqBStntglWCqDXwXBnAgobDHqToGxxrnjOKTbh4kR6YTTCS4QasZF4L0gcZEIJoZ6sC9QWWSIutP7nLu0JXcYtN0zttnM-tdH_OhYtWMpw4QNiqn0z7GnRjzxSEgJsXMy6cZISrbwlgZO8mOwg_OgDJVMBd0u29Yik2GO-kWASBezY0g_dwuFPA_FBOr2-LV8Zf2")',
                                        }}
                                    ></div>
                                    <div>
                                        <p className="text-white text-sm font-medium">
                                            Carlos Mendes
                                        </p>
                                        <div className="flex items-center gap-1 text-xs text-[#92adc9]">
                                            <span className="material-symbols-outlined text-[14px] text-yellow-400 fill-current">
                                                star
                                            </span>
                                            4.5
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4 text-right">
                                <p className="text-white font-medium">R$ 850,00</p>
                            </td>
                            <td className="p-4">
                                <div className="flex flex-col">
                                    <p className="text-white text-sm">Banco Inter (077)</p>
                                    <p className="text-[#92adc9] text-xs">PIX: 11999887766</p>
                                </div>
                            </td>
                            <td className="p-4 text-[#92adc9] text-sm">23 Out, 18:45</td>
                            <td className="p-4 text-center">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    <span className="material-symbols-outlined text-[14px]">
                                        verified_user
                                    </span>
                                    Seguro
                                </span>
                            </td>
                        </tr>
                        {/* Row 4: Retention Alert */}
                        <tr className="group hover:bg-[#1a2632] transition-colors border-l-2 border-l-yellow-500 bg-yellow-900/5">
                            <td className="p-4 pl-[14px]">
                                <input
                                    className="rounded border-[#324d67] bg-[#233648] text-[#137fec] focus:ring-offset-[#111a22] focus:ring-[#137fec] size-4"
                                    type="checkbox"
                                />
                            </td>
                            <td className="p-4">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="size-9 rounded-full bg-cover bg-center"
                                        style={{
                                            backgroundImage:
                                                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCLsN8-UpMsKorUKU4vjjXF5kZSAkZKAf5HhfTy8OlcqFgVakqSpILEro_c6g9OpKPQtqNvZJyyYIv2aaoKFYRFS5D2d6t70GhCys6I2zISp4nACIf3S5LhfodRl5BcqrRLsBySscCpOF6FJ3oIqJGcXXDlnRsaLW2i35xmpkZSq6yzktP_3ftXm5b4PlH_AxzonLm5DN2qMK2C91Ngr409Ox8h68dHfZs4ZGCXvbbMsspDN3kAcXOFHgOhkXIvRDiPGY_2ylk8YwHm")',
                                        }}
                                    ></div>
                                    <div>
                                        <p className="text-white text-sm font-medium">Amanda Lee</p>
                                        <div className="flex items-center gap-1 text-xs text-yellow-500">
                                            <span className="material-symbols-outlined text-[14px] fill-current">
                                                star
                                            </span>
                                            3.2 • Observação
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td className="p-4 text-right">
                                <p className="text-white font-medium">R$ 2.100,00</p>
                            </td>
                            <td className="p-4">
                                <div className="flex flex-col">
                                    <p className="text-white text-sm">Bradesco (237)</p>
                                    <p className="text-[#92adc9] text-xs">Ag: 1120 CC: 4401-9</p>
                                </div>
                            </td>
                            <td className="p-4 text-[#92adc9] text-sm">23 Out, 16:20</td>
                            <td className="p-4 text-center">
                                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                                    <span className="material-symbols-outlined text-[14px]">
                                        history_edu
                                    </span>
                                    Retenção
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="p-4 border-t border-[#324d67] flex justify-between items-center">
                <span className="text-sm text-[#92adc9]">Mostrando 4 de 15</span>
                <div className="flex gap-2">
                    <button className="px-3 py-1 rounded text-white bg-[#233648] hover:bg-[#324d67] disabled:opacity-50 text-sm">
                        Anterior
                    </button>
                    <button className="px-3 py-1 rounded text-white bg-[#233648] hover:bg-[#324d67] text-sm">
                        Próximo
                    </button>
                </div>
            </div>
        </div>
    );
}
