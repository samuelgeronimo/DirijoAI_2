import SearchResults from '@/components/SearchResults';
import { Suspense } from 'react';
import { createClient } from '@/utils/supabase/server';

type SearchParams = Promise<{ q?: string; page?: string }>;

export default async function SearchPage(props: { searchParams: SearchParams }) {
    const searchParams = await props.searchParams;
    const query = searchParams.q || '';
    const page = parseInt(searchParams.page || '1');
    const pageSize = 20;
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    const supabase = await createClient();

    // Optimized query - fetch all needed fields for display
    const { data: instructors, count } = await supabase
        .from('instructors')
        .select(`
            id,
            bio,
            rating,
            video_url,
            service_mode,
            meeting_point_name,
            superpowers,
            profiles!inner(full_name, avatar_url),
            vehicles(id, model, brand, year, color, photo_urls, features),
            instructor_availability(hourly_rate_cents, day_of_week, start_time, end_time),
            reviews(id)
        `, { count: 'exact' })
        .eq('status', 'active')
        .ilike('service_city', `%${query}%`)
        .range(from, to);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <SearchResults
                initialData={instructors || []}
                totalCount={count || 0}
                currentPage={page}
            />
        </Suspense>
    );
}
