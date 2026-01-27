"use client";
import React from 'react';

interface FilterEmptyStateProps {
    onClearFilters: () => void;
}

export default function FilterEmptyState({ onClearFilters }: FilterEmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm animate-fade-in">
            <div className="size-24 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-5xl text-[#137fec]">filter_list_off</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                Nenhum instrutor atende seus critérios
            </h3>

            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto leading-relaxed">
                Tente remover alguns filtros (como avaliação, horário ou modo de atendimento) para encontrar mais opções na sua região.
            </p>

            <button
                onClick={onClearFilters}
                className="bg-[#137fec] hover:bg-[#137fec]/90 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5"
            >
                Limpar todos os filtros
            </button>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl text-left border-t border-slate-100 dark:border-slate-800 pt-10">
                <div className="flex flex-col gap-2">
                    <span className="material-symbols-outlined text-[#137fec]">schedule</span>
                    <h4 className="font-bold text-sm dark:text-white text-slate-900">Horários Flexíveis</h4>
                    <p className="text-xs text-slate-500">Muitos instrutores têm agendas dinâmicas.</p>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="material-symbols-outlined text-[#137fec]">location_on</span>
                    <h4 className="font-bold text-sm dark:text-white text-slate-900">Modos Diversos</h4>
                    <p className="text-xs text-slate-500">Experimente trocar "Vou até você" por "Ponto de Encontro".</p>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="material-symbols-outlined text-[#137fec]">verified_user</span>
                    <h4 className="font-bold text-sm dark:text-white text-slate-900">Qualidade Garantida</h4>
                    <p className="text-xs text-slate-500">Todos os instrutores passam por triagem rigorosa.</p>
                </div>
            </div>
        </div>
    );
}
