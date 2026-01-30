
import { createClient } from "@/utils/supabase/server";

export async function getFinanceOverview() {
    const supabase = await createClient();

    // 1. Float Total (Sum of all instructor balances)
    const { data: instructors } = await supabase
        .from("instructors")
        .select("balance_cents");
    const floatTotalCents = instructors?.reduce((acc, inst) => acc + (inst.balance_cents || 0), 0) || 0;

    // 2. Pending Withdrawals (Sum of requested/risk_check payouts)
    const { data: payouts } = await supabase
        .from("payouts")
        .select("amount_cents")
        .in("status", ["requested", "risk_check"]);
    const pendingWithdrawalsCents = payouts?.reduce((acc, p) => acc + (p.amount_cents || 0), 0) || 0;

    // 3. Net Revenue (Real Calculation: 15% Take Rate vs 100% Extras)
    const { data: orders } = await supabase
        .from("orders")
        .select("amount_cents, plan_name")
        .eq("status", "paid");

    let netRevenueCents = 0;
    const EXTRAS_KEYWORDS = ['ebook', 'pdf', 'manual', 'guia', 'kit'];

    orders?.forEach(order => {
        const amount = order.amount_cents;
        const planNameLower = (order.plan_name || '').toLowerCase();

        // Only check plan name to avoid false positives from metadata
        const isExtra = EXTRAS_KEYWORDS.some(k => planNameLower.includes(k));

        if (isExtra) {
            netRevenueCents += amount; // 100% for extras
        } else {
            netRevenueCents += Math.round(amount * 0.15); // 15% for lessons
        }
    });

    return {
        floatTotal: floatTotalCents,
        pendingWithdrawals: pendingWithdrawalsCents,
        netProfit: netRevenueCents
    };
}

export async function getPayoutRequests() {
    const supabase = await createClient();

    // Fetch payouts with related instructor data
    // Note: 'profiles' is linked via instructor_id -> instructors.id is same as profiles.id in this schema?
    // Schema: instructors.id REFERENCES auth.users. profiles.id REFERENCES auth.users.
    // So instructor.id === profile.id.
    const { data: payouts, error } = await supabase
        .from("payouts")
        .select(`
            id,
            amount_cents,
            status,
            risk_score,
            risk_notes,
            created_at,
            instructor:instructor_id(
                id,
                rating,
                profiles!inner(full_name, avatar_url, email)
            )
        `)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching payouts:", error);
        return [];
    }

    return payouts || [];
}
