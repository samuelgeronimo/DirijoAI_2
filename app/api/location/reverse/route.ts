import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    if (!lat || !lon) {
        return NextResponse.json({ error: 'Latitude and longitude are required' }, { status: 400 });
    }

    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
            {
                headers: {
                    'User-Agent': 'DirijoAI/1.0',
                },
                next: { revalidate: 86400 } // Cache for 24 hours
            }
        );

        if (!response.ok) {
            throw new Error('Failed to fetch from Nominatim');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Reverse geocoding error:', error);
        return NextResponse.json({ error: 'Failed to reverse geocode' }, { status: 500 });
    }
}
