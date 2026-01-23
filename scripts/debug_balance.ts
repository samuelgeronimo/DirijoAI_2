import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://kiyvtpnzmpbigobuvbds.supabase.co';
const supabaseKey = 'sb_publishable_u-hLQetlUSVBq3PFAaBnSg_C1_l2g_e'; // Anon key from previous steps
const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    console.log("Checking data for order 10004...");

    // 1. Get Order
    const { data: orders, error: orderError } = await supabase
        .from('orders')
        .select('*')
        .eq('order_number', 10004); // Assuming order_number column exists based on file name, otherwise check ID/Metadata

    if (orderError) {
        console.error("Error fetching order:", orderError);
    } else {
        console.log("Order found:", orders);
    }

    if (!orders || orders.length === 0) {
        console.log("Order 10004 NOT found using order_number. Trying to find any paid order.");
        const { data: anyOrder } = await supabase.from('orders').select('*').limit(1);
        console.log("Any order:", anyOrder);
        return;
    }

    const student_id = orders[0].student_id;
    console.log(`Checking lessons for student: ${student_id}`);

    // 2. Count Lessons
    const { count, data: lessons, error: lessonError } = await supabase
        .from('lessons')
        .select('*', { count: 'exact' })
        .eq('student_id', student_id);

    if (lessonError) {
        console.error("Error fetching lessons:", lessonError);
    } else {
        console.log(`Found ${count} lessons for this student.`, lessons);
    }
}

main();
