
import { Database } from "@/types/supabase";

export type DisputeStatus = 'open' | 'analyzing' | 'resolved';

export interface DisputeListSummary {
    id: string;
    reason: string;
    description: string | null;
    status: DisputeStatus;
    created_at: string;
    admin_notes: string | null;
    student_name: string;
    instructor_name: string;
    lesson_date: string | null;
}

// Detailed Dispute Type
export interface DisputeDetail {
    id: string;
    created_at: string;
    status: DisputeStatus;
    reason: string;
    description: string | null;
    verdict: string | null;
    admin_notes: string | null;
    lesson_id: string;

    student: {
        full_name: string | null;
        avatar_url: string | null;
        reputation_score: number | null;
    } | null;

    instructor: {
        rating: number | null;
        profiles: {
            full_name: string | null;
            avatar_url: string | null;
        } | null;
    } | null;

    lesson: {
        scheduled_at: string;
        pickup_address: string | null;
        price_cents: number;
        status: string;
    } | null;

    messages: {
        content: string;
        created_at: string;
        sender_id: string;
        evidence_url: string | null;
        is_system_message: boolean;
        sender: {
            full_name: string | null;
            avatar_url: string | null;
        } | null;
    }[];
}
