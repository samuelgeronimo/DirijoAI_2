
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env vars
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Use Service Role to see all data without restrictions
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// If no service key, we can try Anon but might be limited by RLS unless we own the data.
// Since this is an investigation requested by user (admin-like), we assume we need visibility.
const supabaseKey = serviceRoleKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing credentials');
    process.exit(1);
}

const client = createClient(supabaseUrl, supabaseKey);

async function inspect() {
    console.log('--- PRICE AUDIT START ---');

    // 1. Fetch recent orders
    const { data: orders, error: orderError } = await client
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

    if (orderError) {
        console.error('Error fetching orders:', orderError);
        return;
    }

    if (!orders || orders.length === 0) {
        console.log('No orders found to analyze.');
        return;
    }

    console.log(`Analyzing ${orders.length} recent orders...`);

    for (const order of orders) {
        console.log(`\n------------------------------------------------`);
        console.log(`Order ID: ${order.id}`);
        console.log(`Student ID: ${order.student_id}`);
        console.log(`Order Total (cents): ${order.amount_cents}`);
        console.log(`Plan Name: ${order.plan_name}`);
        console.log(`Lessons Count: ${order.lessons_count}`);
        console.log(`Order Metadata:`, order.metadata || '{}');

        // 2. Find Lessons likely associated with this order
        // Strategy: Created AFTER order created, Same Student.
        // Or if created same time.
        const orderDate = new Date(order.created_at!);

        // Look for lessons created within 1 hour of order? 
        // Or just lessons for this student created AFTER order date.
        const { data: lessons, error: lessonError } = await client
            .from('lessons')
            .select('id, price_cents, created_at, status')
            .eq('student_id', order.student_id)
            .gte('created_at', order.created_at!) // Created at or after order
            // .limit(order.lessons_count) // Maybe strict limit?
            .order('created_at', { ascending: true });

        if (lessonError) {
            console.error('  Error fetching lessons:', lessonError);
            continue;
        }

        const lessonSum = lessons?.reduce((acc, l) => acc + l.price_cents, 0) || 0;
        const count = lessons?.length || 0;

        console.log(`Found ${count} matching lessons created >= Order Date.`);
        if (lessons && lessons.length > 0) {
            console.log(`  First Lesson Price: ${lessons[0].price_cents}`);
            console.log(`  Sum of Lessons Prices: ${lessonSum}`);
        }

        const delta = order.amount_cents - lessonSum;
        console.log(`\n  [ANALYSIS] Order Total - Lesson Sum = ${delta}`);

        if (delta > 0) {
            console.log(`  => POSITIVE DELTA (${delta}). Order includes items NOT in lesson prices.`);
            console.log(`  => CONCLUSION: Lessons likely have clean price.`);
        } else if (delta === 0) {
            console.log(`  => ZERO DELTA. Order Total equals Lesson Sum.`);
            console.log(`  => CONCLUSION: Lesson prices likely include spread of total order (including addons).`);
        } else {
            console.log(`  => NEGATIVE DELTA. Lessons sum is HIGHER than order.`);
            console.log(`  => Strange. Maybe fetching unrelated lessons?`);
        }
    }
    console.log('--- PRICE AUDIT END ---');
}

inspect();
