import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin/', '/instructor/onboarding/', '/student/dashboard/'],
        },
        sitemap: 'https://www.dirijoai.com/sitemap.xml',
    };
}
