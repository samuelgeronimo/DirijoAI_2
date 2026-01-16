export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string
                    role: 'admin' | 'instructor' | 'student'
                    full_name: string | null
                    avatar_url: string | null
                    reputation_score: number
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    email: string
                    role?: 'admin' | 'instructor' | 'student'
                    full_name?: string | null
                    avatar_url?: string | null
                    reputation_score?: number
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    role?: 'admin' | 'instructor' | 'student'
                    full_name?: string | null
                    avatar_url?: string | null
                    reputation_score?: number
                    created_at?: string
                    updated_at?: string
                }
            }
            instructors: {
                Row: {
                    id: string
                    cpf: string | null
                    phone: string | null
                    bio: string | null
                    pix_key: string | null
                    balance_cents: number
                    status: 'pending_docs' | 'active' | 'suspended'
                    rating: number
                    street: string | null
                    number: string | null
                    complement: string | null
                    neighborhood: string | null
                    city: string | null
                    state: string | null
                    zip_code: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id: string
                    cpf?: string | null
                    phone?: string | null
                    bio?: string | null
                    pix_key?: string | null
                    balance_cents?: number
                    status?: 'pending_docs' | 'active' | 'suspended'
                    rating?: number
                    street?: string | null
                    number?: string | null
                    complement?: string | null
                    neighborhood?: string | null
                    city?: string | null
                    state?: string | null
                    zip_code?: string | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    cpf?: string | null
                    phone?: string | null
                    bio?: string | null
                    pix_key?: string | null
                    balance_cents?: number
                    status?: 'pending_docs' | 'active' | 'suspended'
                    rating?: number
                    street?: string | null
                    number?: string | null
                    complement?: string | null
                    neighborhood?: string | null
                    city?: string | null
                    state?: string | null
                    zip_code?: string | null
                    created_at?: string
                    updated_at?: string
                }
            }
            payouts: {
                Row: {
                    id: string
                    instructor_id: string
                    amount_cents: number
                    status: 'requested' | 'risk_check' | 'approved' | 'paid' | 'rejected'
                    risk_score: number
                    risk_notes: string | null
                    created_at: string
                    processed_at: string | null
                }
                Insert: {
                    id?: string
                    instructor_id: string
                    amount_cents: number
                    status?: 'requested' | 'risk_check' | 'approved' | 'paid' | 'rejected'
                    risk_score?: number
                    risk_notes?: string | null
                    created_at?: string
                    processed_at?: string | null
                }
                Update: {
                    id?: string
                    instructor_id?: string
                    amount_cents?: number
                    status?: 'requested' | 'risk_check' | 'approved' | 'paid' | 'rejected'
                    risk_score?: number
                    risk_notes?: string | null
                    created_at?: string
                    processed_at?: string | null
                }
            }
            disputes: {
                Row: {
                    id: string
                    instructor_id: string
                    student_id: string
                    lesson_id: string | null
                    status: 'open' | 'analyzing' | 'resolved'
                    reason: string
                    verdict: 'student_fault' | 'instructor_fault' | 'force_majeure' | null
                    admin_notes: string | null
                    sla_deadline: string
                    created_at: string
                }
            }
            dispute_messages: {
                Row: {
                    id: string
                    dispute_id: string
                    sender_id: string
                    content: string
                    evidence_url: string | null
                    is_system_message: boolean
                    created_at: string
                }
            }
            coupons: {
                Row: {
                    id: string
                    code: string
                    type: 'percentage' | 'fixed'
                    value: number
                    rules: Json
                    uses: number
                    max_uses: number | null
                    expires_at: string | null
                    is_active: boolean
                    created_at: string
                }
            }
            order_bumps: {
                Row: {
                    id: string
                    name: string
                    description: string | null
                    price_cents: number
                    type: string
                    conversion_rate: number
                    is_active: boolean
                }
            }
        }
    }
}
