
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkLatestInstructor() {
    console.log('Fetching latest instructor...');

    const { data, error } = await supabase
        .from('instructors')
        .select(`
      id,
      created_at,
      status,
      phone,
      cnh_number,
      cnh_category,
      cnh_issue_state,
      detran_registry_number,
      bio,
      superpowers,
      vehicles (
        brand,
        model,
        features
      ),
      profiles (
        email,
        full_name
      )
    `)
        .order('created_at', { ascending: false })
        .limit(1);

    if (error) {
        console.error('Error fetching instructor:', error);
        return;
    }

    if (!data || data.length === 0) {
        console.log('No instructors found.');
        return;
    }

    const instructor = data[0];
    console.log('Latest Instructor Record:');
    console.log('-------------------------');
    console.log('Email:', instructor.profiles?.email);
    console.log('Name:', instructor.profiles?.full_name);
    console.log('Created At:', instructor.created_at);
    console.log('Status:', instructor.status);
    console.log('--- Missing Fields Check ---');
    console.log('Phone:', instructor.phone);
    console.log('CNH Number:', instructor.cnh_number);
    console.log('CNH Category:', instructor.cnh_category);
    console.log('CNH State:', instructor.cnh_issue_state);
    console.log('Detran Registry (CFI):', instructor.detran_registry_number);
    console.log('Bio:', instructor.bio);
    console.log('Superpowers:', instructor.superpowers);
    console.log('--- Vehicle Check ---');
    if (instructor.vehicles && instructor.vehicles.length > 0) {
        console.log('Vehicle Features:', instructor.vehicles[0].features);
    } else {
        console.log('No vehicle found.');
    }

}

checkLatestInstructor();
