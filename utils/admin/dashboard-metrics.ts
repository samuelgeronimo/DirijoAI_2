import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/admin";


export async function getDashboardKPIs() {
  const supabase = await createClient();

  // 1. GMV: Sum of all PAID orders
  const { data: orders, error: gmvError } = await supabase
    .from("orders")
    .select("amount_cents, plan_name, metadata")
    .eq("status", "paid");

  if (gmvError) console.error("Error fetching GMV:", gmvError);

  let gmvTotalCents = 0;
  let netRevenueCents = 0;

  const EXTRAS_KEYWORDS = ['ebook', 'pdf', 'manual', 'guia', 'kit'];

  orders?.forEach(order => {
    const amount = order.amount_cents;
    gmvTotalCents += amount;

    // Determine Take Rate
    const planNameLower = (order.plan_name || '').toLowerCase();

    // Only check plan name to avoid false positives in metadata technical keys (e.g., 'manual' context)
    const isExtra = EXTRAS_KEYWORDS.some(k => planNameLower.includes(k));

    if (isExtra) {
      netRevenueCents += amount; // 100% for extras
    } else {
      netRevenueCents += Math.round(amount * 0.15); // 15% for lessons/standard
    }
  });

  // 3. Float: Sum of all instructor balances
  const { data: floatData, error: floatError } = await supabase
    .from("instructors")
    .select("balance_cents");

  if (floatError) console.error("Error fetching Float:", floatError);

  const floatTotalCents = floatData?.reduce((acc, inst) => acc + (inst.balance_cents || 0), 0) || 0;

  // 4. CAC (Average Cost per Acquisition) - Mocked for now as we don't handle marketing spend yet
  const cacAverageCents = 3200; // R$ 32,00 fixed

  return {
    gmvTotal: gmvTotalCents / 100,
    netRevenue: netRevenueCents / 100,
    floatTotal: floatTotalCents / 100,
    cacAverage: cacAverageCents / 100
  };
}

export async function getPendingInstructorsCount() {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from("instructors")
    .select("*", { count: "exact", head: true })
    .eq("status", "pending_docs")
    .eq("current_onboarding_step", 8);

  if (error) console.error("Error fetching pending instructors:", error);

  return count || 0;
}

export async function getActionItems() {
  const supabase = await createClient();

  // 1. Open Disputes
  const { data: disputes, error: disputesError } = await supabase
    .from("disputes")
    .select("id, reason, created_at, status, student:student_id(full_name)")
    .in("status", ["open", "analyzing"])
    .order("created_at", { ascending: true })
    .limit(5);

  if (disputesError) console.error("Error fetching disputes:", disputesError);

  // 2. Pending Payouts
  const { data: payouts, error: payoutsError } = await supabase
    .from("payouts")
    .select("id, amount_cents, created_at, status, instructor:instructor_id(profiles(full_name))")
    .eq("status", "requested")
    .order("created_at", { ascending: true })
    .limit(5);

  if (payoutsError) console.error("Error fetching payouts:", payoutsError);

  // Normalize and merge
  const disputeItems = (disputes || []).map(d => ({
    type: 'dispute' as const,
    id: d.id,
    title: `Disputa #${d.id.substring(0, 8)} `,
    description: d.reason,
    // @ts-ignore
    user: d.student?.full_name || 'Aluno Desconhecido',
    severity: 'critical' as const,
    createdAt: d.created_at || new Date().toISOString(),
    displayType: 'Reembolso'
  }));

  const payoutItems = (payouts || []).map(p => {
    // @ts-ignore
    const instructorName = p.instructor?.profiles?.full_name || 'Instrutor';
    return {
      type: 'payout' as const,
      id: p.id,
      title: `Solicitação de Saque(${instructorName})`,
      description: `Valor: R$ ${(p.amount_cents / 100).toFixed(2)} `,
      user: instructorName,
      severity: p.amount_cents > 100000 ? ('high' as const) : ('medium' as const),
      createdAt: p.created_at || new Date().toISOString(),
      displayType: 'Financeiro'
    };
  });

  // Merge and sort by oldest first (urgent first)
  const allActions = [...disputeItems, ...payoutItems].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  return allActions;
}

export async function getGrowthMetrics(days = 30) {
  const supabase = await createClient();
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);

  // Get new students per day
  const { data: newStudents, error: studentsError } = await supabase
    .from("profiles")
    .select("created_at")
    .eq("role", "student")
    .gte("created_at", startDate.toISOString());

  // Get scheduled lessons per day
  const { data: newLessons, error: lessonsError } = await supabase
    .from("lessons")
    .select("created_at") // Using creation date as proxy for booking activity
    .gte("created_at", startDate.toISOString());

  // Group by date
  const groupedData: Record<string, { students: number, lessons: number }> = {};

  // Initialize all days
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    const dayStr = d.toISOString().split('T')[0];
    groupedData[dayStr] = { students: 0, lessons: 0 };
  }

  newStudents?.forEach(s => {
    const dayStr = (s.created_at || "").split('T')[0];
    if (groupedData[dayStr]) groupedData[dayStr].students++;
  });

  newLessons?.forEach(l => {
    const dayStr = (l.created_at || "").split('T')[0];
    if (groupedData[dayStr]) groupedData[dayStr].lessons++;
  });

  // Convert to array
  return Object.entries(groupedData).map(([date, counts]) => ({
    date,
    ...counts
  })).sort((a, b) => a.date.localeCompare(b.date));
}




export async function getOpenDisputesCount() {
  try {
    const supabase = createAdminClient();

    const { count, error } = await supabase
      .from("disputes")
      .select("*", { count: "exact", head: true })
      .in("status", ["open", "analyzing"]);

    if (error) {
      console.error("Error fetching open disputes count:", error);
      return 0;
    }

    return count || 0;
  } catch (error) {
    console.error("Error in getOpenDisputesCount (likely missing admin key):", error);
    return 0;
  }
}
