import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing credentials');
    process.exit(1);
}

const client = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log('=== VERIFICANDO DADOS DE FEEDBACK ===\n');

    // 1. Buscar TODAS as aulas completadas (últimas 10)
    const { data: allLessons, error: allError } = await client
        .from('lessons')
        .select('id, status, instructor_score, skills_evaluation, updated_at, student_id')
        .order('updated_at', { ascending: false })
        .limit(10);

    if (allError) {
        console.error('Erro ao buscar aulas:', allError);
        return;
    }

    console.log(`Total de aulas encontradas: ${allLessons?.length || 0}\n`);

    if (allLessons && allLessons.length > 0) {
        allLessons.forEach((lesson, idx) => {
            console.log(`--- Aula ${idx + 1} ---`);
            console.log(`ID: ${lesson.id}`);
            console.log(`Status: ${lesson.status}`);
            console.log(`Student ID: ${lesson.student_id}`);
            console.log(`Score: ${lesson.instructor_score ?? 'NULL'}`);
            console.log(`Skills: ${lesson.skills_evaluation ? JSON.stringify(lesson.skills_evaluation) : 'NULL'}`);
            console.log(`Updated: ${lesson.updated_at}`);
            console.log('');
        });

        // Verificar se alguma tem score
        const withScore = allLessons.filter(l => l.instructor_score !== null);
        console.log(`\n✅ Aulas COM score: ${withScore.length}`);
        console.log(`❌ Aulas SEM score: ${allLessons.length - withScore.length}`);
    }

    console.log('\n=== FIM DA VERIFICAÇÃO ===');
}

check();
