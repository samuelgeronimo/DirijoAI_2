import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { FinancialStats } from "@/components/instructor/dashboard/FinancialStats";
import { MiniAgenda } from "@/components/instructor/dashboard/MiniAgenda";
import { NextMission } from "@/components/instructor/dashboard/NextMission";
import { ReputationCard } from "@/components/instructor/dashboard/ReputationCard";
import { SalesList } from "@/components/instructor/dashboard/SalesList";
import { getGreeting, calculateInstructorLevel } from "@/utils/instructorMetrics";
import { getPlatformTakeRate } from "@/app/admin/actions";

export default async function InstructorDashboardPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/instructor/login');
    }

    // Fetch Dynamic Take Rate first (needed for calculations)
    const platformTakeRate = await getPlatformTakeRate();
    const instructorRate = (100 - platformTakeRate) / 100;

    // OPTIMIZATION: Parallel query execution - reduces waterfall from ~800ms to ~150ms
    const [
        instructorResult,
        nextLessonResult,
        upcomingLessonsResult,
        scheduledLessonsResult,
        allPaidOrdersResult,
        completedLessonsResult,
        reviewsResult,
        salesResult
    ] = await Promise.all([
        // 1. Instructor profile
        supabase
            .from('instructors')
            .select('balance_cents, status, profiles!inner(full_name, avatar_url, created_at)')
            .eq('id', user.id)
            .single(),

        // 2. Next scheduled lesson
        supabase
            .from('lessons')
            .select(`
                id, scheduled_at, duration_minutes, price_cents, pickup_address, pickup_lat, pickup_lng,
                student:profiles!lessons_student_id_fkey(full_name, avatar_url)
            `)
            .eq('instructor_id', user.id)
            .eq('status', 'scheduled')
            .gte('scheduled_at', new Date().toISOString())
            .order('scheduled_at', { ascending: true })
            .limit(1)
            .single(),

        // 3. Upcoming lessons (next 2-3)
        supabase
            .from('lessons')
            .select(`
                id, scheduled_at, duration_minutes,
                student:profiles!lessons_student_id_fkey(full_name, avatar_url)
            `)
            .eq('instructor_id', user.id)
            .eq('status', 'scheduled')
            .gte('scheduled_at', new Date().toISOString())
            .order('scheduled_at', { ascending: true })
            .range(1, 3),

        // 4. Scheduled lessons (for amount to receive)
        supabase
            .from('lessons')
            .select('price_cents')
            .eq('instructor_id', user.id)
            .eq('status', 'scheduled'),

        // 5. All paid orders (for deduction map)
        supabase
            .from('orders')
            .select('amount_cents, metadata, lessons_count')
            .eq('instructor_id', user.id),

        // 6. Completed lessons count
        supabase
            .from('lessons')
            .select('price_cents', { count: 'exact' })
            .eq('instructor_id', user.id)
            .eq('status', 'completed'),

        // 7. Reviews
        supabase
            .from('reviews')
            .select('rating')
            .eq('instructor_id', user.id),

        // 8. Recent sales
        supabase
            .from('orders')
            .select(`
                id, amount_cents, lessons_count, status, created_at, metadata,
                student:profiles!orders_student_id_fkey(full_name, avatar_url)
            `)
            .eq('instructor_id', user.id)
            .order('created_at', { ascending: false })
            .limit(10)
    ]);

    const instructor = instructorResult.data;
    const nextLesson = nextLessonResult.data;
    const upcomingLessons = upcomingLessonsResult.data;
    const scheduledLessons = scheduledLessonsResult.data;
    const allPaidOrders = allPaidOrdersResult.data;
    const { data: completedLessons, count: completedLessonsCount } = completedLessonsResult;
    const reviews = reviewsResult.data;
    const sales = salesResult.data;

    if (!instructor) {
        redirect('/instructor/login');
    }

    // Check if instructor is approved - redirect to confirmation if not
    if (instructor.status !== 'active') {
        redirect('/instructor/onboarding/confirmation');
    }

    // Map of Lesson Price -> Deduction Amount (Net Value of Manual Share)
    const deductionMap: Record<number, number> = {};

    allPaidOrders?.forEach(ord => {
        const metadata = ord.metadata as any;
        if (metadata?.manual_included && metadata?.manual_price) {
            const manualCents = Math.round(Number(metadata.manual_price) * 100);
            const totalCents = Number(ord.amount_cents);
            const lessonsCount = Number(ord.lessons_count) || 1;

            // Calculate Unit Values
            // Unit Total = Total / Count
            // Unit Manual = Manual / Count
            // Unit Lesson = Unit Total - Unit Manual

            const unitTotal = Math.round(totalCents / lessonsCount);
            const unitManual = Math.round(manualCents / lessonsCount);
            const unitLesson = unitTotal - unitManual;

            // Calculate Deduction Per Lesson
            // Deduction = UnitNet - UnitLessonNet
            // This is the amount of "Manual Money" that ended up in the balance for ONE lesson
            const unitNet = Math.floor(unitTotal * instructorRate);
            const unitLessonNet = Math.floor(unitLesson * instructorRate);
            const deductionPerLesson = unitNet - unitLessonNet;

            // Store in map keyed by the Lesson Price (which is Unit Total)
            deductionMap[unitTotal] = deductionPerLesson;

            // Catch rounding variations (floor vs round)
            const unitTotalFloor = Math.floor(totalCents / lessonsCount);
            if (!deductionMap[unitTotalFloor]) deductionMap[unitTotalFloor] = deductionPerLesson;
        }
    });

    // Calculate total deduction for COMPLETED lessons only
    const totalManualsNetDeduction = completedLessons?.reduce((sum, lesson) => {
        const price = Number(lesson.price_cents) || 0;
        return sum + (deductionMap[price] || 0);
    }, 0) || 0;

    const amountToReceive = scheduledLessons?.reduce((sum, lesson) => {
        let price = Number(lesson.price_cents) || 0;
        // Logic for amountToReceive remains similar: we want to show Net Lesson Value
        // If it's a manual-included lesson, we subtract the deduction first
        if (deductionMap[price]) {
            // Effectively: NetLesson = NetTotal - Deduction
            const netTotal = Math.floor(price * instructorRate);
            return sum + (netTotal - deductionMap[price]);
        }
        return sum + Math.floor(price * instructorRate);
    }, 0) || 0;

    // Calculate Corrected Balance (Remove Manuals Net Value from Realized Balance)
    const correctedBalance = Math.max(0, (instructor.balance_cents || 0) - totalManualsNetDeduction);

    const totalReviews = reviews?.length || 0;
    const averageRating = totalReviews > 0 && reviews
        ? reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews
        : 5.0;

    const formattedSales = sales?.map(s => {
        // Calculate lesson-only price (exclude manual if included)
        let lessonOnlyPrice = s.amount_cents;
        if (s.metadata && typeof s.metadata === 'object' && 'manual_included' in s.metadata) {
            const metadata = s.metadata as { manual_included?: boolean; manual_price?: number };
            if (metadata.manual_included && metadata.manual_price) {
                lessonOnlyPrice = s.amount_cents - Math.round(metadata.manual_price * 100);
            }
        }

        return {
            ...s,
            amount_cents: lessonOnlyPrice,
            plan_name: `${s.lessons_count} aula${s.lessons_count > 1 ? 's' : ''}`,
            student: s.student,
            status: s.status || 'pending'
        };
    }) || [];

    // Calculate instructor level
    const memberSince = new Date(instructor.profiles.created_at || new Date());
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
                availableBalance={correctedBalance}
                amountToReceive={amountToReceive}
            />

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <NextMission lesson={nextLesson ? {
                    ...nextLesson,
                    pickup_address: nextLesson.pickup_address || undefined,
                    pickup_lat: nextLesson.pickup_lat || undefined,
                    pickup_lng: nextLesson.pickup_lng || undefined,
                    student_notes: (nextLesson as any).student_notes || undefined,
                    student: {
                        ...nextLesson.student,
                        full_name: nextLesson.student?.full_name || 'Aluno',
                        avatar_url: nextLesson.student?.avatar_url || undefined
                    }
                } : null} />

                {/* Right Column (Reputation & Quick Stats) */}
                <div className="flex flex-col gap-6">
                    <ReputationCard
                        rating={averageRating}
                        totalReviews={totalReviews}
                    />
                    <MiniAgenda lessons={upcomingLessons?.map(l => ({
                        ...l,
                        student: {
                            ...l.student,
                            full_name: l.student.full_name || 'Aluno',
                            avatar_url: l.student.avatar_url || undefined
                        }
                    })) || []} />
                </div>

                {/* Sales List */}
                <SalesList sales={formattedSales.map(s => ({
                    ...s,
                    status: (s.status as any) || 'pending',
                    created_at: s.created_at || new Date().toISOString(),
                    student: {
                        full_name: s.student?.full_name || 'Aluno',
                        avatar_url: s.student?.avatar_url || ''
                    }
                }))} />
            </div>
        </div>
    );
}
