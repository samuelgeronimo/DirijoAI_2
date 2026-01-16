"use client";

import { useState } from "react";

export function DocumentVisualizer() {
    const [zoom, setZoom] = useState(1);
    const [rotation, setRotation] = useState(0);

    const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 3));
    const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
    const handleReset = () => {
        setZoom(1);
        setRotation(0);
    };
    const handleRotateLeft = () => setRotation((r) => r - 90);
    const handleRotateRight = () => setRotation((r) => r + 90);

    return (
        <section className="flex-1 relative bg-[#0f151b] flex flex-col items-center justify-center p-6 overflow-hidden group">
            {/* Document Container */}
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Image Wrapper */}
                <div
                    className="relative max-w-full max-h-full shadow-2xl rounded-lg overflow-hidden border border-gray-700 transition-transform duration-200 ease-out"
                    style={{
                        transform: `scale(${zoom}) rotate(${rotation}deg)`,
                    }}
                >
                    <img
                        alt="Digital scan of a brazilian driver license document"
                        className="object-contain max-h-[80vh] max-w-full"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAghydAMtBph_U_fQ5KmqPEs_OEUQ0zWshwzOi_mkfd0nxTcxYN0YNcW6yEHprBmXprqaJePF1FUX2vJQfx9Y8Pzdu1eHN-n-QvO3TjDIr6qcAh97ZLQy2rxSWNjSfoSiUcbYYOgPhRy_uSTG-XUamdgB6NI_8OnDaCn0IFCxnfCevbR0k_VhEoCzo6-bKSvbw-WNgFb20ghIqTzYixQUgh4Qz_CPjIOj_D-cmWB4IjbqW6JwdyOFrtmmF_uRNpt5NzqzjqFT0XJkTk"
                    />
                    {/* Watermark/Overlay for security context */}
                    <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHRleHQgeD0iMTAiIHk9IjEwIiBmb250LXNpemU9IjIiIGZpbGw9IiNmZmYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIHRyYW5zZm9ybT0icm90YXRlKC00NSAxMCAxMCkiPkRJUklKTy5BSTwvdGV4dD48L3N2Zz4=')]"></div>
                </div>
            </div>

            {/* Floating Toolbar */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-[#1e2936]/70 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 shadow-xl z-10">
                <button
                    onClick={handleZoomOut}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors tooltip-trigger"
                    title="Zoom Out"
                >
                    <span className="material-symbols-outlined">remove_circle</span>
                </button>
                <div className="w-px h-4 bg-white/20"></div>
                <button
                    onClick={handleReset}
                    className="p-2 text-white hover:text-[#137fec] hover:bg-white/10 rounded-full transition-colors tooltip-trigger"
                    title="Reset View"
                >
                    <span className="text-xs font-mono font-medium">
                        {Math.round(zoom * 100)}%
                    </span>
                </button>
                <div className="w-px h-4 bg-white/20"></div>
                <button
                    onClick={handleZoomIn}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors tooltip-trigger"
                    title="Zoom In"
                >
                    <span className="material-symbols-outlined">add_circle</span>
                </button>
                <div className="w-px h-4 bg-white/20 mx-1"></div>
                <button
                    onClick={handleRotateLeft}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors tooltip-trigger"
                    title="Rotate Left"
                >
                    <span className="material-symbols-outlined">rotate_left</span>
                </button>
                <button
                    onClick={handleRotateRight}
                    className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-full transition-colors tooltip-trigger"
                    title="Rotate Right"
                >
                    <span className="material-symbols-outlined">rotate_right</span>
                </button>
            </div>

            {/* Doc Info Badge (Overlay) */}
            <div className="absolute top-6 left-6 bg-[#1e2936]/70 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-gray-400 text-[18px]">
                    image
                </span>
                <span className="text-sm text-gray-200 font-medium">CNH_Frente.jpg</span>
                <span className="text-xs text-gray-500 border-l border-gray-600 pl-2">
                    2.4 MB
                </span>
            </div>
        </section>
    );
}
