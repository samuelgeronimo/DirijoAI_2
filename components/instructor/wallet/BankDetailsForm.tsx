"use client";

import { useState } from "react";
import { updateBankDetails } from "@/app/instructor/actions";

interface BankDetailsFormProps {
    initialData: {
        pix_key: string | null;
        bank_name: string | null;
        account_number: string | null;
        agency_number: string | null;
        account_type: string | null;
    } | null;
}

export function BankDetailsForm({ initialData }: BankDetailsFormProps) {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setStatus(null);

        const pix_key = (formData.get('pix_key') as string).replace(/\D/g, '');
        const bank_name = formData.get('bank_name') as string;
        const account_number = formData.get('account_number') as string;
        const agency_number = formData.get('agency_number') as string;
        const account_type = formData.get('account_type') as string;

        try {
            const result = await updateBankDetails({
                pix_key,
                bank_name,
                account_number,
                agency_number,
                account_type
            });

            if (result.success) {
                setStatus({ type: 'success', message: 'Dados bancários salvos com sucesso!' });
            }
        } catch (error: any) {
            console.error(error);
            setStatus({ type: 'error', message: error.message || 'Erro ao salvar dados bancários. Tente novamente.' });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form action={handleSubmit} className="space-y-6">
            {/* Disclaimer */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3 items-start mb-6">
                <span className="material-symbols-outlined text-blue-500 mt-0.5">info</span>
                <div>
                    <p className="text-blue-200 text-sm font-medium">
                        Importante: Titularidade da Conta
                    </p>
                    <p className="text-blue-200/70 text-xs mt-1">
                        O instrutor deve ser obrigatoriamente o titular da conta bancária informada. Não realizamos depósitos em contas de terceiros.
                    </p>
                </div>
            </div>

            {status && (
                <div className={`p-4 rounded-xl flex items-center gap-3 ${status.type === 'success'
                        ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                        : 'bg-red-500/10 border border-red-500/20 text-red-400'
                    }`}>
                    <span className="material-symbols-outlined">
                        {status.type === 'success' ? 'check_circle' : 'error'}
                    </span>
                    <p className="text-sm font-medium">{status.message}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* PIX Key (CPF) */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-300">
                        Chave PIX (Deve ser seu CPF)
                    </label>
                    <input
                        name="pix_key"
                        type="text"
                        defaultValue={initialData?.pix_key || ''}
                        placeholder="000.000.000-00"
                        required
                        className="w-full bg-instructor-bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-instructor-primary/50 transition-all"
                    />
                    <p className="text-[10px] text-gray-500">Mínimo 11 dígitos. Apenas os números serão salvos.</p>
                </div>

                {/* Bank Name */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-300">
                        Nome do Banco
                    </label>
                    <input
                        name="bank_name"
                        type="text"
                        defaultValue={initialData?.bank_name || ''}
                        placeholder="Ex: Nubank, Itaú, BB"
                        required
                        className="w-full bg-instructor-bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-instructor-primary/50 transition-all"
                    />
                </div>

                {/* Agency Number */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-300">
                        Agência
                    </label>
                    <input
                        name="agency_number"
                        type="text"
                        defaultValue={initialData?.agency_number || ''}
                        placeholder="0001"
                        required
                        className="w-full bg-instructor-bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-instructor-primary/50 transition-all"
                    />
                </div>

                {/* Account Number */}
                <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-300">
                        Número da Conta
                    </label>
                    <input
                        name="account_number"
                        type="text"
                        defaultValue={initialData?.account_number || ''}
                        placeholder="1234567-8"
                        required
                        className="w-full bg-instructor-bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-instructor-primary/50 transition-all"
                    />
                </div>

                {/* Account Type */}
                <div className="space-y-2 md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-300">
                        Tipo de Conta
                    </label>
                    <select
                        name="account_type"
                        defaultValue={initialData?.account_type || 'corrente'}
                        className="w-full bg-instructor-bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-instructor-primary/50 transition-all"
                    >
                        <option value="corrente">Conta Corrente</option>
                        <option value="poupanca">Conta Poupança</option>
                    </select>
                </div>
            </div>

            <div className="pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-instructor-primary hover:bg-instructor-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-instructor-bg-dark font-bold py-4 rounded-xl shadow-lg shadow-instructor-primary/20 transition-all flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <>
                            <span className="animate-spin material-symbols-outlined">sync</span>
                            Salvando...
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined">save</span>
                            Salvar Dados Bancários
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
