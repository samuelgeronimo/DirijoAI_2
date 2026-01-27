
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing credentials');
    process.exit(1);
}

const client = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log('--- CHECKING LAST LESSON SCORE ---');

    // Fetch most recent COMPLETED lesson
    const { data: lessons, error } = await client
        .from('lessons')
        .select('id, status, instructor_score, skills_evaluation, updated_at')
        .eq('status', 'completed')
        .order('updated_at', { ascending: false })
        .limit(1);

    if (error) {
        console.error('Error:', error);
        return;
    }

    if (lessons && lessons.length > 0) {
        console.log('Last Completed Lesson:', lessons[0]);
        if (lessons[0].instructor_score != null) {
            console.log('✅ Score IS saved:', lessons[0].instructor_score);
            console.log('✅ Skills:', JSON.stringify(lessons[0].skills_evaluation));
        } else {
            console.log('❌ Score is NULL.');
        }
    } else {
        console.log('No completed lessons found.');
    }
    console.log('--- END ---');
}

check();
