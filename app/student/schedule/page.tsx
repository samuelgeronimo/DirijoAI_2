import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ScheduleContent } from "@/components/student/schedule/ScheduleContent";

export default async function StudentSchedulePage() {
    const supabase = await createClient();

    // 1. Get Authenticated User
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return redirect("/auth/login");

    // 2. Get Latest Paid Order to find Hired Instructor
    const { data: latestOrder } = await supabase
        .from('orders')
        .select(`
            instructor_id,
            lessons_count,
            amount_cents,
            created_at
        `)
        .eq('student_id', user.id)
        .eq('status', 'paid')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    if (!latestOrder || !latestOrder.instructor_id) {
        // If no active instructor, they should probably go to search or dashboard
        // For now, redirect to search
        return redirect('/student/search');
    }

    const { instructor_id, lessons_count } = latestOrder;

    // 3. Fetch Instructor Detais
    // REMOVED price_cents which was causing crash
    const { data: instructor } = await supabase
        .from('instructors')
        .select(`
            id,
            profiles (
                full_name,
                avatar_url
            ),
            vehicles (
                brand,
                model,
                color
            )
        `)
        .eq('id', instructor_id)
        .single();

    // 4. Calculate Balance
    const { count: totalCreatedLessons } = await supabase
        .from('lessons')
        .select('*', { count: 'exact', head: true })
        .eq('student_id', user.id)
        .in('status', ['scheduled', 'in_progress', 'completed']);

    const balance = Math.max(0, (lessons_count || 0) - (totalCreatedLessons || 0));

    // Calculate effective price per lesson from the package
    const effectivePriceCents = lessons_count && lessons_count > 0
        ? Math.round((latestOrder.amount_cents || 0) / lessons_count)
        : 0;

    // 5. Fetch Availability Patterns
    const { data: availabilityPatterns } = await supabase
        .from('instructor_availability')
        .select('*')
        .eq('instructor_id', instructor_id);

    // 6. Fetch Busy Slots (RPC)
    // We want to fetch slots for the next 14 days maybe?
    const today = new Date();
    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(today.getDate() + 14);

    const { data: busySlotsData, error: rpcError } = await supabase
        .rpc('get_instructor_busy_slots', {
            p_instructor_id: instructor_id,
            p_start_date: today.toISOString(),
            p_end_date: twoWeeksFromNow.toISOString()
        });

    if (rpcError) {
        console.error('Error fetching busy slots:', rpcError);
    }

    const busySlots = (busySlotsData || []).map((b: any) => b.scheduled_at);

    // 7. Fetch Student's Own Scheduled Lessons (to display in calendar)
    const { data: studentLessons } = await supabase
        .from('lessons')
        .select('scheduled_at, status, id')
        .eq('student_id', user.id)
        .eq('instructor_id', instructor_id)
        .in('status', ['scheduled', 'in_progress'])
        .gte('scheduled_at', today.toISOString())
        .order('scheduled_at', { ascending: true });

    const scheduledLessons = (studentLessons || []).map(lesson => ({
        scheduled_at: lesson.scheduled_at,
        status: lesson.status,
        id: lesson.id
    }));

    return (
        <ScheduleContent
            user={user}
            instructor={instructor}
            balance={balance}
            totalPackage={lessons_count || 0}
            availabilityPatterns={availabilityPatterns || []}
            busySlots={busySlots}
            scheduledLessons={scheduledLessons}
            priceCents={effectivePriceCents}
        />
    );
}
