import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { BankDetailsForm } from "@/components/instructor/wallet/BankDetailsForm";

export default async function WalletPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/instructor/login");
    }

    const { data: instructor } = await supabase
        .from('instructors')
        .select('pix_key, bank_name, account_number, agency_number, account_type')
        .eq('id', user.id)
        .single();

    return (
        <div className="p-6 lg:p-10 max-w-4xl mx-auto pb-32">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Carteira</h1>
                <p className="text-gray-400">Configure seus dados bancários para receber seus pagamentos.</p>
            </div>

            <div className="bg-instructor-surface-dark rounded-2xl border border-white/10 p-6 lg:p-8 shadow-xl">
                <BankDetailsForm initialData={instructor} />
            </div>
        </div>
    );
}
