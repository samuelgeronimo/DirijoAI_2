import { createClient } from "@/utils/supabase/server";
import { StudentHeader } from "@/components/student/StudentHeader";
import { StudentDashboardGrid } from "@/components/student/StudentDashboardGrid";
import { redirect } from "next/navigation";

export default async function StudentDashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // 1. Fetch Profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('id', user.id)
        .single();

    // 2. Fetch Completed Lessons Count & Scores
    const { data: completedLessonsData, count: completedLessons } = await supabase
        .from('lessons')
        .select('instructor_score', { count: 'exact', head: false })
        .eq('student_id', user.id)
        .eq('status', 'completed');

    // 3. Fetch Next Scheduled Lesson
    const { data: nextLessonData } = await supabase
        .from('lessons')
        .select(`
            scheduled_at,
            instructors (
                profiles (
                    full_name,
                    avatar_url
                )
            ),
            vehicles (
                brand,
                model,
                color
            )
        `)
        .eq('student_id', user.id)
        .eq('status', 'scheduled')
        // Removed strict .gte(now) to allow showing 'today's' lessons even if slightly passed
        .order('scheduled_at', { ascending: true })
        .limit(1)
        .single();

    // 4. Fetch Latest Paid Order for Total Lessons Target
    const { data: latestOrder } = await supabase
        .from('orders')
        .select(`
            lessons_count,
            metadata,
            created_at,
            instructors (
                profiles (
                    full_name,
                    avatar_url
                ),
                vehicles (
                    brand,
                    model,
                    color
                )
            )
        `)
        .eq('student_id', user.id)
        .eq('status', 'paid')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

    // 5. Fetch Count of All Created Lessons (Scheduled + Completed + In Progress + No Show + Disputed)
    // Basically anything that consumes a credit. Only 'canceled' returns the credit.
    const { count: totalCreatedLessons } = await supabase
        .from('lessons')
        .select('*', { count: 'exact', head: true })
        .eq('student_id', user.id)
        .in('status', ['scheduled', 'in_progress', 'completed', 'no_show', 'disputed']);

    // Process Data
    const totalLessonsTarget = latestOrder?.lessons_count || 0; // Default to 0 if no order found
    const safeCompletedLessons = completedLessons || 0;
    const safeTotalCreatedLessons = totalCreatedLessons || 0;

    // Balance = Total Purchased - All Created (Scheduled/Completed/etc)
    const balance = Math.max(0, totalLessonsTarget - safeTotalCreatedLessons);

    // Calculate Confidence: Average of Instructor Scores (if available), else Progress Ratio
    let confidenceLevel = 0;
    const scores = completedLessonsData?.map(l => l.instructor_score).filter(s => s !== null && s !== undefined) as number[] || [];

    if (scores.length > 0) {
        const sum = scores.reduce((a, b) => a + b, 0);
        confidenceLevel = Math.round(sum / scores.length);
    } else {
        // Fallback to progress ratio if no scores yet
        confidenceLevel = totalLessonsTarget > 0 ? Math.min(100, Math.round((safeCompletedLessons / totalLessonsTarget) * 100)) : 0;
    }

    let nextLesson = null;

    // Priority 1: Real Lesson from Database
    if (nextLessonData) {
        // @ts-ignore - Supabase types join handling
        const instrProfile = nextLessonData.instructors?.profiles;
        // @ts-ignore
        const vehicleData = nextLessonData.vehicles;
        const vehicle = Array.isArray(vehicleData) ? vehicleData[0] : vehicleData;

        nextLesson = {
            scheduledAt: nextLessonData.scheduled_at,
            instructorName: Array.isArray(instrProfile) ? instrProfile[0]?.full_name : instrProfile?.full_name || 'Seu Instrutor',
            instructorAvatar: Array.isArray(instrProfile) ? instrProfile[0]?.avatar_url : instrProfile?.avatar_url,
            vehicleModel: vehicle ? `${vehicle.brand} ${vehicle.model} ${vehicle.color || ''}` : undefined
        };
    }
    // Priority 2: Fallback from Latest Order Metadata (if lesson creation failed or lagging)
    else if (latestOrder?.metadata) {
        // @ts-ignore
        const metaDate = latestOrder.metadata.reservation_date;
        // @ts-ignore
        const metaTime = latestOrder.metadata.reservation_time;

        if (metaDate && metaTime) {
            // Construct Date (assuming YYYY-MM-DD and HH:mm from checkout)
            const [y, m, d] = metaDate.split('-');
            const [h, min] = metaTime.split(':');
            const scheduledAt = new Date(Number(y), Number(m) - 1, Number(d), Number(h), Number(min));

            // @ts-ignore
            const instrProfile = latestOrder.instructors?.profiles;
            // @ts-ignore
            const vehicleData = latestOrder.instructors?.vehicles;
            const vehicle = Array.isArray(vehicleData) ? vehicleData[0] : vehicleData;

            nextLesson = {
                scheduledAt: scheduledAt.toISOString(),
                instructorName: Array.isArray(instrProfile) ? instrProfile[0]?.full_name : instrProfile?.full_name || 'Seu Instrutor',
                instructorAvatar: Array.isArray(instrProfile) ? instrProfile[0]?.avatar_url : instrProfile?.avatar_url,
                vehicleModel: vehicle ? `${vehicle.brand} ${vehicle.model} ${vehicle.color || ''}` : undefined
            };
        }
    }

    // Extract Instructor ID from Order
    // @ts-ignore
    const hiredInstructorId = latestOrder?.instructor_id;

    return (
        <div className="flex-1 w-full max-w-[1200px] mx-auto p-4 md:p-8 flex flex-col gap-8">
            {/* Header Section: Greeting + Progress */}
            <StudentHeader
                studentName={profile?.full_name || 'Motorista'}
                completedLessons={safeCompletedLessons}
                confidenceLevel={confidenceLevel}
                totalLessons={totalLessonsTarget}
            />
            {/* Dashboard Grid Layout */}
            <StudentDashboardGrid
                nextLesson={nextLesson}
                balance={balance}
                instructorId={hiredInstructorId}
                totalLessons={totalLessonsTarget}
                usedLessons={safeTotalCreatedLessons}
            />
        </div>
    );
}
