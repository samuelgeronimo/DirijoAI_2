// Type helpers for Supabase Json types
// Fixes type safety issues with Json columns

import type { Database } from './supabase';

export type Json = Database['public']['Tables']['profiles']['Row']['preferences'];

// Type guards for Json data
export function isJsonArray(value: Json): value is any[] {
    return Array.isArray(value);
}

export function isJsonObject(value: Json): value is Record<string, any> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function parseJsonArray<T = any>(value: Json): T[] {
    if (Array.isArray(value)) return value as T[];
    if (value === null) return [];
    return [];
}

export function parseJsonObject<T = Record<string, any>>(value: Json): T {
    if (isJsonObject(value)) return value as T;
    if (value === null) return {} as T;
    return {} as T;
}

// Safe Json conversion for updates
export function toJson<T>(value: T): Json {
    return value as unknown as Json;
}
