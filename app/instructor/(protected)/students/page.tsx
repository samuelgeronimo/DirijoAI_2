"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';
import { StudentPreferencesModal } from '@/components/instructor/dashboard/StudentPreferencesModal';

interface StudentSummary {
    student_id: string;
    full_name: string;
    avatar_url: string;
    total_spent_cents: number;
    total_lessons: number;
    last_order_date: string;
    preferences: Record<string, boolean>;
}

interface NextLesson {
    id: string;
    student: {
        full_name: string;
        avatar_url: string;
    };
    scheduled_at: string;
    pickup_address: string | null;
    status: string;
}

export default function InstructorStudentsPage() {
    const [students, setStudents] = useState<StudentSummary[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedStudent, setSelectedStudent] = useState<{ id: string, name: string, preferences: Record<string, boolean> | null } | null>(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [nextLesson, setNextLesson] = useState<NextLesson | null>(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) return;

            // Fetch Next Lesson
            const { data: nextLessonData, error: nextLessonError } = await supabase
                .from('lessons')
                .select(`
                    id,
                    scheduled_at,
                    pickup_address,
                    status,
                    student:profiles!lessons_student_id_fkey(full_name, avatar_url)
                `)
                .eq('instructor_id', user.id)
                .eq('status', 'scheduled')
                .gt('scheduled_at', new Date().toISOString())
                .order('scheduled_at', { ascending: true })
                .limit(1)
                .single();

            if (nextLessonData) {
                setNextLesson(nextLessonData as any);
            }

            // Fetch all paid orders for this instructor
            const { data: orders, error } = await supabase
                .from('orders')
                .select(`
                    amount_cents,
                    created_at,
                    student_id,
                    metadata,
                    lessons_count,
                    lessons_count,
                    student:profiles!orders_student_id_fkey(full_name, avatar_url, preferences)
                `)
                .eq('instructor_id', user.id)
                .eq('status', 'paid')
                .order('created_at', { ascending: false });

            if (error) {
                console.error("Error fetching students", error);
            } else if (orders) {
                // Process orders to group by student
                const studentMap = new Map<string, StudentSummary>();

                orders.forEach(order => {
                    const studentId = order.student_id;
                    if (!studentId) return;

                    const studentData = order.student as any; // Cast to access joined data
                    const current = studentMap.get(studentId) || {
                        student_id: studentId,
                        full_name: studentData?.full_name || 'Aluno',
                        avatar_url: studentData?.avatar_url || '',
                        total_spent_cents: 0,
                        total_lessons: 0,
                        last_order_date: order.created_at || new Date().toISOString(), // Fallback to now if null
                        preferences: studentData?.preferences || {}
                    };

                    // Calculate lesson amount (Total - Manual Price)
                    let lessonAmount = order.amount_cents;
                    const metadata = order.metadata as any;

                    if (metadata?.manual_price) {
                        // metadata.manual_price is numeric (e.g. 19.90), so we must convert to cents
                        lessonAmount -= Math.round(metadata.manual_price * 100);
                    }

                    // If lessons_count is 0, it's likely a standalone manual purchase, so we might want to exclude it from "Investido" 
                    // if the user strictly wants "apenas as aulas". 
                    // However, logic above handles "bundle" where amount includes manual. 
                    // If it is ONLY manual, lessonAmount might be 0 or equal to amount if manual_price isn't set but it's a manual.
                    // Ideally we check if lessons_count > 0.

                    if (order.lessons_count > 0) {
                        current.total_spent_cents += Math.max(0, lessonAmount);
                        current.total_lessons += order.lessons_count;
                    }

                    if (!studentMap.has(studentId)) {
                        studentMap.set(studentId, current);
                    }
                });

                setStudents(Array.from(studentMap.values()));
            }
            setLoading(false);
        }

        fetchData();
    }, []);

    const filteredStudents = students.filter(student =>
        student.full_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex-1 bg-instructor-bg-dark h-[calc(100vh-theme(spacing.20))] overflow-y-auto p-4 md:p-10 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-instructor-primary"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-8 lg:px-12 lg:py-10">
            {/* Page Heading */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                <div>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-2">
                        Meus Alunos
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Gerencie sua lista de alunos e acompanhe o progresso.
                    </p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-instructor-surface-dark-2 rounded-full border border-white/5">
                    <span className="material-symbols-outlined text-instructor-primary text-sm">group</span>
                    <span className="text-white font-bold">{students.length} Total</span>
                </div>
            </header>

            {/* Next Lesson Card */}
            {nextLesson && (
                <div className="mb-10 bg-gradient-to-r from-instructor-surface-dark-2 to-instructor-surface-dark border border-instructor-primary/20 rounded-2xl p-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <span className="material-symbols-outlined text-9xl text-instructor-primary">schedule</span>
                    </div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-6 w-full md:w-auto">
                            <div className="bg-instructor-primary/20 p-4 rounded-xl shrink-0">
                                <span className="material-symbols-outlined text-instructor-primary text-3xl">timer</span>
                            </div>
                            <div>
                                <h3 className="text-instructor-primary text-sm font-bold uppercase tracking-wider mb-1">Próxima Aula</h3>
                                <div className="flex items-center gap-3">
                                    <h4 className="text-2xl font-bold text-white">
                                        {new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(nextLesson.scheduled_at))}
                                    </h4>
                                    <span className="text-2xl font-light text-gray-500">|</span>
                                    <span className="text-2xl font-bold text-white">
                                        {new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit' }).format(new Date(nextLesson.scheduled_at))}
                                    </span>
                                </div>
                                <p className="text-gray-400 mt-1 flex items-center gap-1 text-sm">
                                    <span className="material-symbols-outlined text-sm">location_on</span>
                                    {nextLesson.pickup_address || "Local a definir"}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-black/20 p-4 rounded-xl w-full md:w-auto border border-white/5">
                            <div
                                className="w-12 h-12 rounded-full bg-cover bg-center border-2 border-white/10"
                                style={{ backgroundImage: `url('${nextLesson.student.avatar_url || "https://via.placeholder.com/150"}')` }}
                            ></div>
                            <div>
                                <p className="text-xs text-gray-400 font-bold uppercase">Aluno(a)</p>
                                <p className="text-white font-bold text-lg leading-none">{nextLesson.student.full_name}</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Search Bar */}
            <div className="mb-8 max-w-md relative">
                <input
                    type="text"
                    placeholder="Buscar aluno por nome..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-instructor-surface-dark-2 border border-white/10 rounded-xl px-5 py-3 pl-12 text-white placeholder-gray-500 focus:outline-none focus:border-instructor-primary focus:ring-1 focus:ring-instructor-primary transition-all"
                />
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                    search
                </span>
            </div>

            {/* Students Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudents.length === 0 ? (
                    <div className="col-span-full bg-instructor-surface-dark-2 rounded-2xl p-12 text-center border border-white/5 border-dashed">
                        <div className="bg-white/5 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="material-symbols-outlined text-white/20 text-4xl">person_off</span>
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">
                            {searchQuery ? "Nenhum aluno encontrado para sua busca" : "Nenhum aluno encontrado"}
                        </h3>
                        <p className="text-gray-400 max-w-md mx-auto">
                            {searchQuery ? "Tente buscar com outro termo." : "Seus alunos aparecerão aqui assim que comprarem um pacote de aulas."}
                        </p>
                    </div>
                ) : (
                    filteredStudents.map((student) => (
                        <div key={student.student_id} className="bg-instructor-surface-dark-2 rounded-2xl p-6 border border-white/5 hover:border-instructor-primary/30 transition-all group">
                            <div className="flex items-start justify-between mb-6">
                                <div
                                    className="w-16 h-16 rounded-full bg-cover bg-center border-2 border-white/10 group-hover:border-instructor-primary/50 transition-colors"
                                    style={{ backgroundImage: `url('${student.avatar_url || "https://via.placeholder.com/150"}')` }}
                                ></div>
                                <button className="text-gray-500 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined">more_vert</span>
                                </button>
                            </div>

                            <h3 className="text-xl font-bold text-white mb-1">{student.full_name}</h3>
                            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-4">
                                Última compra em {new Date(student.last_order_date).toLocaleDateString('pt-BR')}
                            </p>

                            <div className="flex items-center gap-2 mb-6">
                                <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-500 text-xs font-bold border border-emerald-500/20">
                                    Ativo
                                </span>
                            </div>

                            <div className="bg-black/20 rounded-xl p-4 flex justify-between items-center mb-4">
                                <div>
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Investido</p>
                                    <p className="text-white font-bold">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(student.total_spent_cents / 100)}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Aulas</p>
                                    <p className="text-white font-bold">{student.total_lessons}</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedStudent({ id: student.student_id, name: student.full_name, preferences: student.preferences })}
                                className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors flex items-center justify-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">psychology</span>
                                <span>Ver Preferências</span>
                            </button>
                        </div>
                    ))
                )}
            </div>

            {/* Preferences Modal */}
            {selectedStudent && (
                <StudentPreferencesModal
                    studentName={selectedStudent.name}
                    preferences={selectedStudent.preferences}
                    onClose={() => setSelectedStudent(null)}
                />
            )}
        </div>
    );
}
