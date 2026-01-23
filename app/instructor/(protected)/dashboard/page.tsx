import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { FinancialStats } from "@/components/instructor/dashboard/FinancialStats";
import { MiniAgenda } from "@/components/instructor/dashboard/MiniAgenda";
import { NextMission } from "@/components/instructor/dashboard/NextMission";
import { ReputationCard } from "@/components/instructor/dashboard/ReputationCard";
import { SalesList } from "@/components/instructor/dashboard/SalesList";
import { getGreeting, calculateInstructorLevel } from "@/utils/instructorMetrics";

export default async function InstructorDashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/instructor/login');
    }

    // Fetch instructor profile
    const { data: instructor } = await supabase
        .from('instructors')
        .select('*, profiles!inner(full_name, avatar_url, created_at)')
        .eq('id', user.id)
        .single();

    if (!instructor) {
        redirect('/instructor/login');
    }

    // Fetch next scheduled lesson
    const { data: nextLesson } = await supabase
        .from('lessons')
        .select(`
            *,
            student:profiles!lessons_student_id_fkey(full_name, avatar_url)
        `)
        .eq('instructor_id', user.id)
        .eq('status', 'scheduled')
        .gte('scheduled_at', new Date().toISOString())
        .order('scheduled_at', { ascending: true })
        .limit(1)
        .single();

    // Fetch upcoming lessons for mini agenda (next 2-3 lessons after the first one)
    const { data: upcomingLessons } = await supabase
        .from('lessons')
        .select(`
            *,
            student:profiles!lessons_student_id_fkey(full_name, avatar_url)
        `)
        .eq('instructor_id', user.id)
        .eq('status', 'scheduled')
        .gte('scheduled_at', new Date().toISOString())
        .order('scheduled_at', { ascending: true })
        .range(1, 3); // Skip first (it's the next mission), get next 2-3

    // Calculate amount to receive (scheduled lessons not yet completed)
    const { data: scheduledLessons } = await supabase
        .from('lessons')
        .select('price_cents')
        .eq('instructor_id', user.id)
        .eq('status', 'scheduled');

    const amountToReceive = scheduledLessons?.reduce((sum, lesson) => sum + (lesson.price_cents || 0), 0) || 0;

    // Fetch reviews for reputation calculation
    const { data: reviews } = await supabase
        .from('reviews')
        .select('rating')
        .eq('instructor_id', user.id);

    const totalReviews = reviews?.length || 0;
    const averageRating = totalReviews > 0 && reviews
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 5.0;

    // Count completed lessons
    const { count: completedLessonsCount } = await supabase
        .from('lessons')
        .select('*', { count: 'exact', head: true })
        .eq('instructor_id', user.id)
        .eq('status', 'completed');

    // Fetch sales
    const { data: sales } = await supabase
        .from('orders')
        .select(`
            *,
            student:profiles!orders_student_id_fkey(full_name, avatar_url)
        `)
        .eq('instructor_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

    const formattedSales = sales?.map(s => ({
        ...s,
        student: s.student
    })) || [];

    // Calculate instructor level
    const memberSince = new Date(instructor.profiles.created_at);
    const instructorLevel = calculateInstructorLevel(
        averageRating,
        completedLessonsCount || 0,
        memberSince
    );

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 lg:px-12 lg:py-10">
            {/* Page Heading */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                        {getGreeting()}, {instructor.profiles.full_name?.split(' ')[0] || 'Instrutor'}
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Vamos conferir seus ganhos e sua próxima missão.
                    </p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-instructor-secondary/10 border border-instructor-secondary/20 rounded-full">
                    <span className="material-symbols-outlined text-instructor-secondary text-sm">
                        trophy
                    </span>
                    <span className="text-instructor-secondary text-sm font-bold uppercase tracking-wider">
                        Nível {instructorLevel}
                    </span>
                </div>
            </header>

            <FinancialStats
                availableBalance={instructor.balance_cents || 0}
                amountToReceive={amountToReceive}
            />

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <NextMission lesson={nextLesson} />

                {/* Right Column (Reputation & Quick Stats) */}
                <div className="flex flex-col gap-6">
                    <ReputationCard
                        rating={averageRating}
                        totalReviews={totalReviews}
                    />
                    <MiniAgenda lessons={upcomingLessons || []} />
                </div>

                {/* Sales List */}
                <SalesList sales={formattedSales} />
            </div>
        </div>
    );
}
