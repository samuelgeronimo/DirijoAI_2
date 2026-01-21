
import InstructorProfile from '@/components/InstructorProfile';

interface PageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function InstructorPage({ params }: PageProps) {
    const { id } = await params;
    return <InstructorProfile instructorId={id} />;
}
