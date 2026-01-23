
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// Note: Anon key cannot run DDL (ALTER TABLE). We need SERVICE_ROLE_KEY.
// Usually available in .env.local as SUPABASE_SERVICE_ROLE_KEY or similar.
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseServiceKey) {
    console.error("No SUPABASE_SERVICE_ROLE_KEY found in .env.local. Cannot run migration.");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const sql = `
-- Add JSONB columns for flexible student data
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{}'::jsonb,
ADD COLUMN IF NOT EXISTS saved_addresses JSONB DEFAULT '[]'::jsonb;

-- Comment on columns for clarity
COMMENT ON COLUMN public.profiles.preferences IS 'Stores learning preferences (e.g., fear_highway, needs_silence)';
COMMENT ON COLUMN public.profiles.saved_addresses IS 'Stores list of favorite addresses (e.g., Home, Work)';
`;

async function run() {
    console.log("Running migration...");
    // Supabase JS client doesn't expose a direct 'query' method for DDL easily unless using RPC.
    // However, if we have the connection string we can use 'pg'. 
    // Let's try to find the Postgres connection string in .env

    // Fallback: If we can't run DDL via JS client, we might be stuck without CLI/PG.
    // But we can check if there's a POSTGRES_URL.

    if (process.env.POSTGRES_URL) {
        const { Client } = require('pg');
        const client = new Client({ connectionString: process.env.POSTGRES_URL });
        await client.connect();
        try {
            await client.query(sql);
            console.log("Migration successful!");
        } catch (e) {
            console.error("Migration failed:", e);
        } finally {
            await client.end();
        }
    } else {
        console.log("No POSTGRES_URL found. checking logic via rpc?");
        // If we can't run SQL, we can't apply the migration.
        console.log("Skipping migration run.");
    }
}

run();
