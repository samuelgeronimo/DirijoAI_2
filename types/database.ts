// Extended type definitions for database entities
// These extend the auto-generated Supabase types with proper null handling

import type { Database } from './supabase';

// Order type with proper status handling
export type Order = Database['public']['Tables']['orders']['Row'] & {
    status: string; // Override to make non-null (RLS ensures this)
};

// Lesson type with proper field handling
export type Lesson = Database['public']['Tables']['lessons']['Row'] & {
    duration_minutes: number; // Override to make non-null
    status: string; // Override to make non-null
};

// Instructor type
export type Instructor = Database['public']['Tables']['instructors']['Row'];

// Profile type
export type Profile = Database['public']['Tables']['profiles']['Row'];
