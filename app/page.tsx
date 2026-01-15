import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Home() {
    const supabase = await createClient();
    // Simple check - auth.getSession is safe
    const { data: { session } } = await supabase.auth.getSession();

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-slate-50 p-4">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center">DirijoAI Platform</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-center">
                    <p className="text-muted-foreground">
                        Project successfully initialized with Next.js, Tailwind, Shadcn/UI, and Supabase.
                    </p>
                    <div className="p-4 bg-white border rounded-md">
                        <p className="text-sm font-medium">Supabase Status:</p>
                        <p className={`text-sm ${session ? 'text-green-600' : 'text-blue-600'}`}>
                            {session ? 'Authenticated' : 'Connected (No Session)'}
                        </p>
                    </div>
                    <Button className="w-full">Get Started</Button>
                </CardContent>
            </Card>
        </div>
    );
}
