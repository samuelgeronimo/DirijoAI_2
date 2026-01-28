import { MetadataRoute } from 'next';
import { createClient } from '@supabase/supabase-js';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://www.dirijoai.com';

    // Static routes
    const routes = [
        '',
        '/search',
        '/instructor',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic instructor routes
    try {
        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );
        const { data: instructors } = await supabase
            .from('instructors')
            .select('id, updated_at')
            .eq('status', 'active');

        if (instructors) {
            const instructorRoutes = instructors.map((instructor) => ({
                url: `${baseUrl}/instructor/${instructor.id}`,
                lastModified: new Date(instructor.updated_at || Date.now()),
                changeFrequency: 'weekly' as const,
                priority: 0.6,
            }));
            return [...routes, ...instructorRoutes];
        }
    } catch (error) {
        console.error('Error generating sitemap:', error);
    }

    return routes;
}
