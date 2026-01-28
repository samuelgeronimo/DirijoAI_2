
import { Suspense } from 'react';
import { Metadata } from 'next';
import { createClient } from '@/utils/supabase/server';
import InstructorProfile from '@/components/InstructorProfile';
import { InstructorProfileSkeleton } from '@/components/skeletons/InstructorProfileSkeleton';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

// Helper to fetch valid instructor data
async function getInstructor(id: string) {
    const supabase = await createClient();

    // Fetch Instructor Details
    const { data: instructorData } = await supabase
        .from('instructors')
        .select(`
            id,
            bio,
            rating,
            superpowers,
            video_url,
            service_city,
            service_mode,
            profiles!instructors_id_fkey(full_name, avatar_url),
            vehicles(model, brand, year, features, photo_urls, updated_at),
            instructor_availability(day_of_week, start_time, end_time, hourly_rate_cents)
        `)
        .eq('id', id)
        .single();

    if (!instructorData) return null;

    // Fix profiles array issue
    const profilesData = Array.isArray(instructorData.profiles)
        ? instructorData.profiles[0]
        : instructorData.profiles;

    // Sort vehicles
    let vehiclesData = instructorData.vehicles;
    if (Array.isArray(vehiclesData) && vehiclesData.length > 0) {
        // @ts-ignore
        vehiclesData = vehiclesData.sort((a, b) => new Date(b.updated_at || b.created_at || 0).getTime() - new Date(a.updated_at || a.created_at || 0).getTime());
    }

    return { ...instructorData, profiles: profilesData, vehicles: vehiclesData };
}

async function getReviews(id: string) {
    const supabase = await createClient();
    const { data } = await supabase
        .from('reviews')
        .select(`
            id,
            rating,
            comment,
            created_at,
            profiles:student_id (full_name, avatar_url)
        `)
        .eq('instructor_id', id)
        .order('created_at', { ascending: false })
        .limit(5);

    if (!data) return [];

    // @ts-ignore
    return data.map(r => ({
        id: r.id,
        rating: r.rating,
        comment: r.comment,
        created_at: r.created_at,
        student_name: r.profiles?.full_name || 'Aluno',
        student_avatar: r.profiles?.avatar_url || undefined
    }));
}

async function getAndFormatSuccessStories(id: string) {
    const supabase = await createClient();
    const { data } = await supabase
        .from('success_stories')
        .select('*')
        .eq('instructor_id', id)
        .order('created_at', { ascending: false })
        .limit(10);

    return data || [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const instructor = await getInstructor(id);

    if (!instructor) {
        return {
            title: 'Instrutor não encontrado | Dirijo.ai',
        };
    }

    const name = instructor.profiles?.full_name || 'Instrutor';
    const city = instructor.service_city || 'Sua Cidade';
    const bio = instructor.bio || `Aulas de direção personalizadas com ${name}.`;

    return {
        title: `${name} - Instrutor de Direção em ${city} | Dirijo.ai`,
        description: bio.substring(0, 160),
        openGraph: {
            images: instructor.profiles?.avatar_url ? [instructor.profiles.avatar_url] : [],
        },
    };
}

export default async function InstructorPage({ params }: PageProps) {
    const { id } = await params;

    const instructorData = getInstructor(id);
    const reviewsData = getReviews(id);
    const galleryData = getAndFormatSuccessStories(id);

    const [instructor, reviews, gallery] = await Promise.all([
        instructorData,
        reviewsData,
        galleryData
    ]);

    if (!instructor) {
        return <div>Instrutor não encontrado</div>;
    }

    // JSON-LD for "Product" (Service)
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: `Aulas de Direção com ${instructor.profiles?.full_name}`,
        description: instructor.bio,
        image: instructor.profiles?.avatar_url,
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: instructor.rating || 5,
            reviewCount: reviews.length || 1,
        },
        offers: {
            '@type': 'Offer',
            priceCurrency: 'BRL',
            price: instructor.instructor_availability?.[0]?.hourly_rate_cents
                ? (instructor.instructor_availability[0].hourly_rate_cents / 100).toFixed(2)
                : '100.00',
            availability: 'https://schema.org/InStock',
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Suspense fallback={<InstructorProfileSkeleton />}>
                {/* @ts-ignore - Supabase types mismatch slightly but shape is correct */}
                <InstructorProfile
                    instructorId={id}
                    initialInstructor={instructor}
                    initialReviews={reviews}
                    initialGallery={gallery}
                />
            </Suspense>
        </>
    );
}
