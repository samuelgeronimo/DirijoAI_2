
const { createClient } = require('@supabase/supabase-js');
const path = require('path');
const fs = require('fs');

// Load env vars manually
const envPath = path.resolve(__dirname, '../.env.local');
const envConfig = {};

try {
    const envFile = fs.readFileSync(envPath, 'utf8');
    envFile.split('\n').forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            envConfig[key.trim()] = value.trim().replace(/^["']|["']$/g, '');
        }
    });
} catch (e) {
    console.error('Error reading .env.local:', e);
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || envConfig['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || envConfig['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase URL or Key');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkInstructorByEmail(email) {
    console.log(`Checking for user: ${email}...`);

    // 1. Get Profile ID first
    const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();

    if (profileError || !profileData) {
        console.log('Profile not found:', profileError?.message);
        return;
    }

    // 2. Get Instructor Data
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
        .eq('id', profileData.id)
        .single();

    if (error) {
        console.error('Error fetching instructor:', error.message);
        return;
    }

    if (!data) {
        console.log('Instructor record not found for this profile.');
        return;
    }

    const instructor = data;
    console.log('Instructor Record Found:');
    console.log('-------------------------');
    console.log('ID:', instructor.id);
    const profile = Array.isArray(instructor.profiles) ? instructor.profiles[0] : instructor.profiles;
    console.log('Email:', profile?.email);
    console.log('Name:', profile?.full_name);

    console.log('Created At:', instructor.created_at);
    console.log('Status:', instructor.status);
    console.log('--- Missing Fields Check ---');
    console.log('Phone:', instructor.phone);
    console.log('CNH Number:', instructor.cnh_number);
    console.log('CNH Category:', instructor.cnh_category);
    console.log('CNH State:', instructor.cnh_issue_state);
    console.log('Detran Registry (CFI):', instructor.detran_registry_number);
    console.log('Bio:', instructor.bio);
    console.log('Superpowers:', JSON.stringify(instructor.superpowers));
    console.log('--- Vehicle Check ---');
    if (instructor.vehicles && instructor.vehicles.length > 0) {
        const v = instructor.vehicles[0];
        console.log('Vehicle Features:', JSON.stringify(v.features));
    } else {
        console.log('No vehicle found.');
    }

}

checkInstructorByEmail('samuel@bestguai.com');
