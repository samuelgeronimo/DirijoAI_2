
import { createAdminClient } from "@/utils/supabase/admin";

export interface UserProfile {
    id: string;
    full_name: string;
    email: string;
    role: 'student' | 'instructor' | 'admin';
    avatar_url: string;
    created_at: string;
    status?: string;
}

export async function getAllUsers(): Promise<UserProfile[]> {
    try {
        // Use Admin Client to bypass RLS and see 'pending_docs' instructors
        const supabase = createAdminClient();

        console.log("Admin Users: Fetching all profiles...");

        const { data: profiles, error } = await supabase
            .from('profiles')
            .select(`
                id,
                full_name,
                email,
                role,
                avatar_url,
                created_at,
                instructor:instructors(status)
            `)
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching users:", error);
            return [];
        }

        console.log(`Admin Users: Fetched ${profiles?.length || 0} profiles.`);
        if (profiles && profiles.length > 0) {
            const instructors = profiles.filter(p => p.role === 'instructor');
            console.log(`Admin Users: Found ${instructors.length} profiles with role='instructor'.`);
            if (instructors.length > 0) {
                console.log("Sample instructor raw data:", JSON.stringify(instructors[0], null, 2));
            }
        }

        const filteredUsers = (profiles || []).map((p: any) => {
            let status = 'active'; // default for students/admins

            if (p.role === 'instructor') {
                // Extract status from the joined instructor array (or object if 1:1)
                const instructorData = Array.isArray(p.instructor) ? p.instructor[0] : p.instructor;
                status = instructorData?.status || 'unknown';
            }

            return {
                id: p.id,
                full_name: p.full_name,
                email: p.email,
                role: p.role,
                avatar_url: p.avatar_url,
                created_at: p.created_at,
                status
            };
        }).filter(user => {
            // If instructor, show 'active' (approved) or 'pending_docs'
            if (user.role === 'instructor') {
                return ['active', 'pending_docs'].includes(user.status);
            }
            return true;
        });

        return filteredUsers as UserProfile[];
    } catch (error) {
        console.error("Error in getAllUsers (likely missing admin key):", error);
        return [];
    }
}
