"use client";

import { fixOrder10004 } from "./actions";
import { useState } from "react";

export default function DebugPage() {
    const [status, setStatus] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const handleFix = async () => {
        setLoading(true);
        setStatus("Running...");
        try {
            const result = await fixOrder10004();
            setStatus(result.message);
        } catch (e: any) {
            setStatus("Error: " + e.toString());
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Debug Helper</h1>
            <p className="mb-4">Use this to force-fix the missing lesson for order 10004.</p>

            <button
                onClick={handleFix}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
                {loading ? "Fixing..." : "Fix Order 10004 Data"}
            </button>

            {status && (
                <div className="mt-4 p-4 border rounded bg-gray-100">
                    Result: {status}
                </div>
            )}
        </div>
    );
}
