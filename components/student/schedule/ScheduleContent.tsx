"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { InstructorHero } from "@/components/student/schedule/InstructorHero";
import { CalendarGrid } from "@/components/student/schedule/CalendarGrid";
import { FocusSelection } from "@/components/student/schedule/FocusSelection";
import { CancelConfirmationModal } from "@/components/student/schedule/CancelConfirmationModal";

interface ScheduleContentProps {
    user: any;
    instructor: any;
    balance: number;
    totalPackage: number;
    availabilityPatterns: any[];
    busySlots: string[];
    scheduledLessons: Array<{ scheduled_at: string; status: string; id: string }>;
    priceCents: number;
}

export function ScheduleContent({
    user,
    instructor,
    balance,
    totalPackage,
    availabilityPatterns,
    busySlots,
    scheduledLessons,
    priceCents
}: ScheduleContentProps) {
    const router = useRouter();
    const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
    const [selectedLessonsToCancel, setSelectedLessonsToCancel] = useState<string[]>([]);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [isBooking, setIsBooking] = useState(false);
    const [isCanceling, setIsCanceling] = useState(false);

    // Toggle slot selection for booking
    const handleSelectSlot = (slot: string) => {
        setSelectedSlots(prev => {
            if (prev.includes(slot)) {
                // Deselect
                return prev.filter(s => s !== slot);
            } else {
                // Select (validation is handled in CalendarGrid)
                return [...prev, slot];
            }
        });
    };

    const handleConfirm = async (focus: string) => {
        if (selectedSlots.length === 0 || !instructor || !user) return;

        // Validate balance
        if (selectedSlots.length > balance) {
            alert(`Você só tem ${balance} aula${balance > 1 ? 's' : ''} disponível${balance > 1 ? 'eis' : ''}. Selecione menos horários.`);
            return;
        }

        setIsBooking(true);
        const supabase = createClient();

        try {
            // Prepare all lessons for batch insert
            const lessonsToInsert = selectedSlots.map(slot => ({
                student_id: user.id,
                instructor_id: instructor.id,
                scheduled_at: slot,
                duration_minutes: 50,
                status: 'scheduled' as const,
                price_cents: priceCents,
            }));

            // Batch insert all lessons
            const { error } = await supabase
                .from('lessons')
                .insert(lessonsToInsert);

            if (error) throw error;

            // Success - redirect with count
            router.push(`/student/dashboard?schedule_success=true&count=${selectedSlots.length}`);
            router.refresh();

        } catch (error) {
            console.error('Error booking lessons:', error);
            alert('Erro ao agendar aulas. Tente novamente.');
        } finally {
            setIsBooking(false);
        }
    };

    const handleCancelLesson = async (lessonId: string) => {
        const supabase = createClient();

        try {
            const { error } = await supabase
                .from('lessons')
                .update({ status: 'canceled' })
                .eq('id', lessonId);

            if (error) throw error;

            // Refresh the page to show updated state
            router.refresh();

        } catch (error) {
            console.error('Error canceling lesson:', error);
            alert('Erro ao cancelar aula. Tente novamente.');
        }
    };

    // Toggle lesson selection for cancellation
    const handleToggleLessonToCancel = (lessonId: string) => {
        setSelectedLessonsToCancel(prev => {
            if (prev.includes(lessonId)) {
                return prev.filter(id => id !== lessonId);
            } else {
                return [...prev, lessonId];
            }
        });
    };

    // Open cancel confirmation modal
    const handleOpenCancelModal = () => {
        if (selectedLessonsToCancel.length > 0) {
            setShowCancelModal(true);
        }
    };

    // Confirm batch cancellation
    const handleConfirmCancellation = async () => {
        setIsCanceling(true);
        const supabase = createClient();

        try {
            const { error } = await supabase
                .from('lessons')
                .update({ status: 'canceled' })
                .in('id', selectedLessonsToCancel);

            if (error) throw error;

            // Reset state and refresh
            setSelectedLessonsToCancel([]);
            setShowCancelModal(false);
            router.refresh();

        } catch (error) {
            console.error('Error canceling lessons:', error);
            alert('Erro ao cancelar aulas. Tente novamente.');
        } finally {
            setIsCanceling(false);
        }
    };

    return (
        <div className="flex-1 w-full max-w-6xl mx-auto p-6 md:p-8 flex flex-col gap-8">
            {/* Instructor Hero Section */}
            <InstructorHero
                instructorName={Array.isArray(instructor?.profiles) ? instructor?.profiles[0]?.full_name : instructor?.profiles?.full_name || 'Seu Instrutor'}
                instructorAvatar={Array.isArray(instructor?.profiles) ? instructor?.profiles[0]?.avatar_url : instructor?.profiles?.avatar_url}
                vehicleInitial={
                    instructor?.vehicles && instructor.vehicles.length > 0
                        ? (Array.isArray(instructor.vehicles)
                            ? `${instructor.vehicles[0]?.brand} ${instructor.vehicles[0]?.model} • ${instructor.vehicles[0]?.color}`
                            : 'Veículo não informado')
                        : 'Veículo não informado'
                }
                balance={balance}
                totalPackage={totalPackage}
            />

            {/* Scarcity Headline */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 p-4 rounded-r-lg flex items-start gap-3">
                <span className="material-symbols-outlined text-amber-600 dark:text-amber-500 mt-0.5">
                    local_fire_department
                </span>
                <div>
                    <h3 className="font-bold text-amber-900 dark:text-amber-100 text-lg">
                        Horários muito disputados!
                    </h3>
                    <p className="text-amber-800 dark:text-amber-200/80 text-sm">
                        A agenda dele costuma lotar em menos de 24 horas. Garanta o seu.
                    </p>
                </div>
            </div>

            {/* Cancel Selected Button */}
            {selectedLessonsToCancel.length > 0 && (
                <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg flex items-center justify-between">
                    <div className="flex items-start gap-3">
                        <span className="material-symbols-outlined text-red-600 dark:text-red-500 mt-0.5">
                            warning
                        </span>
                        <div>
                            <h3 className="font-bold text-red-900 dark:text-red-100 text-lg">
                                {selectedLessonsToCancel.length} aula{selectedLessonsToCancel.length > 1 ? 's' : ''} selecionada{selectedLessonsToCancel.length > 1 ? 's' : ''} para cancelamento
                            </h3>
                            <p className="text-red-800 dark:text-red-200/80 text-sm">
                                Clique no botão para confirmar o cancelamento
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleOpenCancelModal}
                        disabled={isCanceling}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-bold rounded-lg shadow-lg transition-colors flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-[20px]">cancel</span>
                        Cancelar Selecionadas
                    </button>
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-8">
                {/* LEFT COLUMN: Calendar */}
                <CalendarGrid
                    availabilityPatterns={availabilityPatterns}
                    busySlots={busySlots}
                    scheduledLessons={scheduledLessons}
                    selectedSlots={selectedSlots}
                    selectedLessonsToCancel={selectedLessonsToCancel}
                    onSelectSlot={handleSelectSlot}
                    onToggleLessonToCancel={handleToggleLessonToCancel}
                    balance={balance}
                />

                {/* RIGHT COLUMN: Focus & CTA */}
                <FocusSelection
                    selectedSlots={selectedSlots}
                    instructorName={instructor?.profiles?.full_name || 'Instrutor'}
                    onConfirm={handleConfirm}
                    isBooking={isBooking}
                    balance={balance}
                />
            </div>

            {/* Cancel Confirmation Modal */}
            <CancelConfirmationModal
                isOpen={showCancelModal}
                lessonCount={selectedLessonsToCancel.length}
                onConfirm={handleConfirmCancellation}
                onCancel={() => setShowCancelModal(false)}
            />
        </div>
    );
}
