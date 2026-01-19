
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

async function checkVehicles() {
    console.log('Checking Vehicles...');

    const { data: vehicles, error } = await supabase
        .from('vehicles')
        .select(`
        id,
        plate,
        instructor_id,
        instructors (
            profiles (
                email
            )
        )
    `);

    if (error) {
        console.error('Error fetching vehicles:', error.message);
        return;
    }

    console.log(`Found ${vehicles.length} vehicles.`);
    vehicles.forEach(v => {
        const email = v.instructors?.profiles?.email || 'Unknown Owner';
        console.log(`Plate: ${v.plate.padEnd(10)} | Owner: ${email} (${v.instructor_id})`);
    });
}

checkVehicles();
