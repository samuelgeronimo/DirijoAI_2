
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseUrl || !serviceRoleKey) {
    console.error('❌ Missing environment variables.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

const MOCK_INSTRUCTOR = {
    email: 'instrutor@exemplo.com',
    password: 'password123',
    full_name: 'Carlos Instrutor',
    phone: '11999991111',
    role: 'instructor'
};

const MOCK_STUDENT = {
    email: 'aluno@exemplo.com',
    password: 'password123',
    full_name: 'Ana Aluna',
    phone: '11988882222',
    role: 'student'
};

async function seedDatabase() {
    console.log('🌱 STARTING DATABASE SEED... ');

    try {
        // 1. Create/Get Instructor User
        console.log('👤 ensuring Instructor user...');
        let instructorId = await ensureUser(MOCK_INSTRUCTOR);

        // 2. Create/Get Student User
        console.log('👤 ensuring Student user...');
        let studentId = await ensureUser(MOCK_STUDENT);

        if (!instructorId || !studentId) {
            throw new Error('Failed to create users');
        }

        // 3. Setup Instructor Profile & Data
        console.log('🚗 Setting up instructor details...');
        await supabase.from('instructors').upsert({
            id: instructorId,
            cpf: '111.222.333-44',
            bio: 'Instrutor experiente com 10 anos de estrada.',
            city: 'São Paulo',
            state: 'SP',
            status: 'active', // Approved
            accepted_terms: true,
            current_onboarding_step: 8,
            balance_cents: 15000, // R$ 150.00
            rating: 4.8
        });

        // 4. Create Vehicle
        console.log('🚙 Adding vehicle...');
        const { data: vehicle } = await supabase.from('vehicles').insert({
            instructor_id: instructorId,
            brand: 'Toyota',
            model: 'Etios',
            year: 2021,
            plate: 'ABC-1234',
            color: 'Branco',
            transmission: 'manual',
            is_active: true
        }).select().single();

        // 5. Create Lessons & Orders
        console.log('📅 Creating lessons...');

        // 5a. Completed Lesson (Past)
        await supabase.from('lessons').insert({
            student_id: studentId,
            instructor_id: instructorId,
            vehicle_id: vehicle?.id,
            scheduled_at: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
            status: 'completed',
            price_cents: 8000, // R$ 80,00
            duration_minutes: 50,
            pickup_address: 'Av. Paulista, 1000'
        });

        // 5b. Disputed Lesson (Past)
        const { data: disputedLesson } = await supabase.from('lessons').insert({
            student_id: studentId,
            instructor_id: instructorId,
            vehicle_id: vehicle?.id,
            scheduled_at: new Date(Date.now() - 86400000 * 1).toISOString(), // 1 day ago
            status: 'disputed',
            price_cents: 8000,
            duration_minutes: 50,
            pickup_address: 'Rua Augusta, 500'
        }).select().single();

        // 5c. Future Lesson
        await supabase.from('lessons').insert({
            student_id: studentId,
            instructor_id: instructorId,
            vehicle_id: vehicle?.id,
            scheduled_at: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days future
            status: 'scheduled',
            price_cents: 8000,
            duration_minutes: 50,
            pickup_address: 'Av. Brigadeiro Faria Lima, 2000'
        });

        // 6. Create Dispute
        if (disputedLesson) {
            console.log('⚖️ Creating dispute...');
            const { data: dispute } = await supabase.from('disputes').insert({
                student_id: studentId,
                instructor_id: instructorId,
                lesson_id: disputedLesson.id,
                reason: 'instructor_no_show',
                status: 'open',
                created_at: new Date().toISOString()
            }).select().single();

            if (dispute) {
                await supabase.from('dispute_messages').insert({
                    dispute_id: dispute.id,
                    sender_id: studentId,
                    content: 'O instrutor não apareceu no local combinado e não atendeu o telefone.',
                    is_system_message: false
                });
            }
        }

        // 7. Create Orders (for Revenue Stats)
        console.log('💰 Creating financial records...');
        await supabase.from('orders').insert([
            {
                student_id: studentId,
                instructor_id: instructorId,
                plan_name: 'Aula Avulsa',
                amount_cents: 8000,
                status: 'paid',
                lessons_count: 1,
                created_at: new Date(Date.now() - 86400000 * 5).toISOString()
            },
            {
                student_id: studentId,
                instructor_id: instructorId,
                plan_name: 'Pacote 10 Aulas',
                amount_cents: 75000,
                status: 'paid',
                lessons_count: 10,
                created_at: new Date(Date.now() - 86400000 * 10).toISOString()
            }
        ]);

        console.log('✅ SEED COMPLETED SUCCESSFULLY!');
        console.log(`   👉 Instructor: ${MOCK_INSTRUCTOR.email} / ${MOCK_INSTRUCTOR.password}`);
        console.log(`   👉 Student:    ${MOCK_STUDENT.email}    / ${MOCK_STUDENT.password}`);

    } catch (err: any) {
        console.error('❌ FATAL ERROR:', err.message);
    }
}

async function ensureUser(userData: any) {
    // Check if user exists by email (cheat way via listUsers or just try create)
    // We try to sign up/create. If it fails due to existing, we fetch user by email.

    // 1. Try create
    const { data: created, error: createError } = await supabase.auth.admin.createUser({
        email: userData.email,
        password: userData.password,
        email_confirm: true,
        user_metadata: {
            full_name: userData.full_name,
            role: userData.role
        }
    });

    if (created.user) {
        // Ensure profile exists (might be triggered, but let's upsert to be safe and ensure role)
        await supabase.from('profiles').upsert({
            id: created.user.id,
            email: userData.email,
            full_name: userData.full_name,
            role: userData.role,
            phone: userData.phone
        });
        return created.user.id;
    }

    // If already exists, find it
    console.log(`   - User ${userData.email} might already exist... fetching ID.`);
    // Since we don't have getUserByEmail in admin easily without finding, we just list.
    // Actually listUsers has no search. We rely on the fact that if we just ran reset-db, they are gone.
    // If we are seeding on top, we might duplicate profiles if we aren't careful.

    // Alternative: Delete user first to be sure
    // But we don't know the ID to delete. 

    // Just inform user.
    return null;
}

seedDatabase();
