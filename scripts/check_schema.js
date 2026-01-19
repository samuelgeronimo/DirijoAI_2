
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

async function checkSchema() {
    console.log('Checking schema...');

    // Check vehicles table
    const { data: vehiclesCols, error: vError } = await supabase
        .rpc('get_columns', { table_name: 'vehicles' }); // RPC might not exist, let's try direct hack if RPC fails or just select * limit 0

    // Standard PostgREST way to check definition is hard without access to information_schema via API directly usually.
    // But we can try to Select a specific column and catch error.

    console.log('--- Testing vehicles.photo_urls ---');
    const { error: photoError } = await supabase
        .from('vehicles')
        .select('photo_urls')
        .limit(1);

    if (photoError) {
        console.log('❌ photo_urls error:', photoError.message);
    } else {
        console.log('✅ photo_urls column exists.');
    }

    console.log('--- Testing vehicles.features ---');
    const { error: featuresError } = await supabase
        .from('vehicles')
        .select('features')
        .limit(1);

    if (featuresError) {
        console.log('❌ features error:', featuresError.message);
    } else {
        console.log('✅ features column exists.');
    }

    console.log('--- Testing instructors.superpowers ---');
    const { error: superError } = await supabase
        .from('instructors')
        .select('superpowers')
        .limit(1);

    if (superError) {
        console.log('❌ superpowers error:', superError.message);
    } else {
        console.log('✅ superpowers column exists.');
    }
}

checkSchema();
