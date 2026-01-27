// Type definitions for server actions
// Fixes: Type safety violations (Issue #4)

export interface PlatformSetting {
    key: string;
    value: {
        percentage: number;
    };
    description: string;
}

export interface LessonUpdatePayload {
    status: 'completed';
    updated_at: string;
    instructor_score?: number;
    skills_evaluation?: Record<string, number>;
}

export interface SalesFeedback {
    score: number;
    skills: Record<string, number>;
}

export interface LedgerMetadata {
    lesson_id: string;
    student_id: string;
}

export interface InstructorBalance {
    balance_cents: number;
}

export interface Lesson {
    id: string;
    price_cents: number;
    student_id: string;
    instructor_id: string;
    status: 'scheduled' | 'in_progress' | 'completed' | 'canceled' | 'no_show' | 'disputed';
    scheduled_at: string;
}

export interface Profile {
    id: string;
    email: string;
    role: 'admin' | 'instructor' | 'student';
    full_name: string | null;
    avatar_url: string | null;
}
