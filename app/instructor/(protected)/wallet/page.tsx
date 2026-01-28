import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { updateBankDetails } from "@/app/instructor/actions";
import { revalidatePath } from "next/cache";

export default async function WalletPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/instructor/login");
    }

    const { data: instructor } = await supabase
        .from('instructors')
        .select('*')
        .eq('id', user.id)
        .single();

    async function handleSaveAction(formData: FormData) {
        "use server";
        const pix_key = formData.get('pix_key') as string;
        const bank_name = formData.get('bank_name') as string;
        const account_number = formData.get('account_number') as string;
        const agency_number = formData.get('agency_number') as string;
        const account_type = formData.get('account_type') as string;

        try {
            await updateBankDetails({
                pix_key,
                bank_name,
                account_number,
                agency_number,
                account_type
            });
            revalidatePath('/instructor/wallet');
        } catch (error) {
            console.error(error);
            // In a real app, handle error display (e.g. search params or toast)
        }
    }

    return (
        <div className="p-6 lg:p-10 max-w-4xl mx-auto pb-32">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Carteira</h1>
                <p className="text-gray-400">Configure seus dados bancários para receber seus pagamentos.</p>
            </div>

            <div className="bg-instructor-surface-dark rounded-2xl border border-white/10 p-6 lg:p-8 shadow-xl">
                <form action={handleSaveAction} className="space-y-6">
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

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* PIX Key (CPF) */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-300">
                                Chave PIX (CPF)
                            </label>
                            <input
                                name="pix_key"
                                type="text"
                                defaultValue={instructor?.pix_key || ''}
                                placeholder="000.000.000-00"
                                required
                                className="w-full bg-instructor-bg-dark border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-instructor-primary/50 transition-all"
                            />
                            <p className="text-[10px] text-gray-500">Apenas números (11 dígitos).</p>
                        </div>

                        {/* Bank Name */}
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-300">
                                Nome do Banco
                            </label>
                            <input
                                name="bank_name"
                                type="text"
                                defaultValue={instructor?.bank_name || ''}
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
                                defaultValue={instructor?.agency_number || ''}
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
                                defaultValue={instructor?.account_number || ''}
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
                                defaultValue={instructor?.account_type || 'corrente'}
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
                            className="w-full bg-instructor-primary hover:bg-instructor-primary/90 text-instructor-bg-dark font-bold py-4 rounded-xl shadow-lg shadow-instructor-primary/20 transition-all flex items-center justify-center gap-2"
                        >
                            <span className="material-symbols-outlined">save</span>
                            Salvar Dados Bancários
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
