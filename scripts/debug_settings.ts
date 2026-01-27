
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

// Test 1: Public Client (simulating client-side or anon)
const publicClient = createClient(supabaseUrl, supabaseKey);

// Test 2: Service Role Client (Bypasses RLS - checking if table exists)
// If you don't have SERVICE_ROLE_KEY in .env.local, we can't fully test "bypassing RLS", 
// but we can test if the table exists.
const adminClient = serviceRoleKey
    ? createClient(supabaseUrl, serviceRoleKey)
    : null;

async function test() {
    console.log('--- DIAGNOSTIC START ---');
    console.log(`URL: ${supabaseUrl}`);
    console.log(`Has Service Key: ${!!serviceRoleKey}`);

    // Check if table exists using Service Role (if available) or Anon
    const client = adminClient || publicClient;

    console.log('\n1. Testing READ access (key=platform_take_rate)...');
    const { data: readData, error: readError } = await client
        .from('platform_settings')
        .select('*')
        .eq('key', 'platform_take_rate');

    if (readError) {
        console.error('READ FAILED:', readError.message, readError.details, readError.code);
    } else {
        console.log('READ SUCCESS:', readData);
    }

    console.log('\n2. Testing WRITE access (upsert)...');
    const { error: writeError } = await client
        .from('platform_settings')
        .upsert({
            key: 'test_key',
            value: { test: true },
            description: 'Diagnostic test'
        });

    if (writeError) {
        console.error('WRITE FAILED:', writeError.message, writeError.details, writeError.code);
        if (writeError.code === '42P01') {
            console.error('CONCLUSION: Table "platform_settings" does not exist.');
        } else if (writeError.code === '42501') {
            console.error('CONCLUSION: RLS Policy blocked the request (Permission Denied).');
        }
    } else {
        console.log('WRITE SUCCESS');
        // Clean up
        await client.from('platform_settings').delete().eq('key', 'test_key');
    }
    console.log('--- DIAGNOSTIC END ---');
}

test();
