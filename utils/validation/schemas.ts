// Input validation schemas
// Fixes: Missing input validation (Issue #6)

import { z } from 'zod';

// Ledger metadata validation
export const LedgerMetadataSchema = z.object({
    lesson_id: z.string().uuid('Invalid lesson ID format'),
    student_id: z.string().uuid('Invalid student ID format')
});

// Sales feedback validation
export const SalesFeedbackSchema = z.object({
    score: z.number().min(1).max(10, 'Score must be between 1 and 10'),
    skills: z.record(z.string(), z.number().min(1).max(10))
});

// Platform settings validation
export const PlatformTakeRateSchema = z.object({
    percentage: z.number()
        .min(0, 'Take rate cannot be negative')
        .max(100, 'Take rate cannot exceed 100%')
});

// Lesson ID validation
export const LessonIdSchema = z.string().uuid('Invalid lesson ID format');

// Review validation
export const ReviewSchema = z.object({
    student_id: z.string().uuid(),
    instructor_id: z.string().uuid(),
    order_id: z.string().uuid().optional(),
    rating: z.number().int().min(1).max(5, 'Rating must be between 1 and 5'),
    comment: z.string().max(1000, 'Comment too long').optional()
});

// Helper function to validate and parse
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): T {
    try {
        return schema.parse(data);
    } catch (error) {
        if (error instanceof z.ZodError) {
            const messages = error.issues.map((e: z.ZodIssue) => `${e.path.join('.')}: ${e.message}`).join(', ');
            throw new Error(`Validation failed: ${messages}`);
        }
        throw error;
    }
}
