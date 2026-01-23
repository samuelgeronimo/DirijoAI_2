import { createClient } from "@supabase/supabase-js";
// Use service role key to bypass RLS for debugging if needed, but better to test with anon to mimic client if possible.
// However, since this is a backend script, we might need env vars.
// Let's assume we can use the project URL and anon key from a local env file or hardcode for this test if we can find them.
// Actually, reading from process.env is better.

const supabaseUrl = 'https://kiyvtpnzmpbigobuvbds.supabase.co';
const supabaseKey = 'sb_publishable_u-hLQetlUSVBq3PFAaBnSg_C1_l2g_e';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    console.log("Testing fetch...");

    // We need an instructor ID to test. 
    // Let's first fetch ANY instructor id from the table
    const { data: instructors, error: err1 } = await supabase.from('instructors').select('id').limit(1);

    if (err1 || !instructors || instructors.length === 0) {
        console.error("Could not fetch any instructor ID or table empty", err1);
        return;
    }

    const instructor_id = instructors[0].id;
    console.log(`Testing with Instructor ID: ${instructor_id}`);

    // Now run the joined query
    const { data, error } = await supabase
        .from('instructors')
        .select(`
            id,
            profiles (
                full_name,
                avatar_url
            ),
            vehicles (
                brand,
                model,
                color
            ),
            price_cents
        `)
        .eq('id', instructor_id)
        .single();

    if (error) {
        console.error("Query Error:", error);
    } else {
        console.log("Query Success! Result:");
        console.log(JSON.stringify(data, null, 2));
    }
}

main();
