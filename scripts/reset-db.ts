
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !serviceRoleKey) {
    console.error('❌ Missing environment variables. Make sure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function resetDatabase() {
    console.log('⚠️  STARTING DATABASE RESET (PRESERVING ADMINS) ⚠️');

    try {
        // 1. Identify Admin Users
        console.log('🔍 Identifying Admin users...');
        const { data: adminProfiles, error: adminError } = await supabase
            .from('profiles')
            .select('id, full_name, email')
            .eq('role', 'admin');

        if (adminError) throw new Error(`Failed to fetch admins: ${adminError.message}`);

        const adminIds = adminProfiles.map(p => p.id);
        console.log(`✅ Found ${adminIds.length} admin(s):`, adminProfiles.map(p => p.email || p.full_name).join(', '));

        if (adminIds.length === 0) {
            console.warn('⚠️  NO ADMINS FOUND. All users will be deleted if you proceed. (Safe mode: Aborting)');
            return;
        }

        // 2. Clear Application Data (Child Tables)
        const tablesToClear = [
            'dispute_messages',
            'disputes',
            'reviews',
            'lessons',
            'orders',
            'payouts',
            'vehicles',
            'bank_accounts'
        ];

        console.log('🗑️  Clearing application data tables...');

        for (const table of tablesToClear) {
            const { error } = await supabase.from(table).delete().neq('id', '00000000-0000-0000-0000-000000000000');
            if (error) {
                console.warn(`   - Failed to clear ${table}: ${error.message}`);
            } else {
                console.log(`   - Cleared ${table}`);
            }
        }

        // 3. Delete Instructors
        console.log('🗑️  Clearing instructors table...');
        const { error: instError } = await supabase.from('instructors').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        if (instError) console.warn(`   - Failed to clear instructors: ${instError.message}`);

        // 4. Delete Non-Admin Users (Auth + Profiles)
        console.log('👥 Fetching all users to delete non-admins...');

        // Pagination for listUsers
        let allUsers: any[] = [];
        let page = 1;
        let hasMore = true;

        while (hasMore) {
            const { data: { users }, error: listError } = await supabase.auth.admin.listUsers({ page: page, perPage: 1000 });
            if (listError) throw listError;

            if (!users || users.length === 0) {
                hasMore = false;
            } else {
                allUsers = [...allUsers, ...users];
                page++;
                if (users.length < 1000) hasMore = false;
            }
        }

        const usersToDelete = allUsers.filter(u => !adminIds.includes(u.id));
        console.log(`🔥 Deleting ${usersToDelete.length} users (keeping ${adminIds.length} admins)...`);

        for (const user of usersToDelete) {
            const { error: delError } = await supabase.auth.admin.deleteUser(user.id);
            if (delError) {
                console.error(`   ❌ Failed to delete User ${user.id} (${user.email}): ${delError.message}`);
            }
        }

        console.log('✅ DATABASE RESET COMPLETE.');

    } catch (err: any) {
        console.error('❌ FATAL ERROR:', err.message);
    }
}

resetDatabase();
