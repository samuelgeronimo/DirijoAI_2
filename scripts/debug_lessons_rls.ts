
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Use Anon key if service role is missing, but Anon key respects RLS
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing credentials');
    process.exit(1);
}

const client = createClient(supabaseUrl, supabaseKey);

async function test() {
    console.log('--- RLS DEBUG START ---');
    console.log('Using key type:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SERVICE_ROLE' : 'ANON');

    const targetId = '833091fa-3a1e-4d2b-b0de-16710c8dd86f';
    const { data: specificLesson, error } = await client
        .from('lessons')
        .select('*')
        .eq('id', targetId)
        .single();

    console.log(`\nChecking specific lesson from logs (${targetId}):`);
    if (specificLesson) {
        console.log('Found:', {
            id: specificLesson.id,
            instructor_id: specificLesson.instructor_id,
            status: specificLesson.status
        });
    } else {
        console.error('Lesson NOT FOUND (or blocked):', error?.message);
    }
    console.log('--- RLS DEBUG END ---');
}

test();
