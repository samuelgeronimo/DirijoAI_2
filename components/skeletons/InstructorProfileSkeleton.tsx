import React from 'react';

export function InstructorProfileSkeleton() {
    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f7f8] dark:bg-[#101922] pb-24 font-sans animate-pulse">
            <div className="layout-container flex h-full grow flex-col">
                {/* Header Skeleton */}
                <header className="flex items-center justify-between border-b border-solid border-b-[#e7edf3] dark:border-b-slate-700 bg-white dark:bg-[#101922] px-10 py-3 z-50">
                    <div className="flex items-center gap-8">
                        <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        <div className="hidden md:flex items-center gap-9">
                            <div className="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded"></div>
                            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
                            <div className="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
                        </div>
                    </div>
                </header>

                <main className="flex flex-1 justify-center py-8">
                    <div className="layout-content-container flex flex-col max-w-[1200px] w-full px-6 md:px-10">
                        {/* Hero Section Skeleton */}
                        <div className="flex flex-col lg:flex-row gap-8 p-6 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                            <div className="w-full lg:w-[480px] shrink-0">
                                <div className="w-full aspect-video bg-slate-200 dark:bg-slate-800 rounded-xl"></div>
                            </div>
                            <div className="flex flex-col justify-center flex-1 space-y-4">
                                <div className="flex gap-2">
                                    <div className="h-6 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                    <div className="h-6 w-32 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                </div>
                                <div className="h-10 w-3/4 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                <div className="h-6 w-1/2 bg-slate-200 dark:bg-slate-800 rounded"></div>

                                <div className="flex items-center gap-4 mt-4">
                                    <div className="h-12 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                    <div className="h-12 w-24 bg-slate-200 dark:bg-slate-800 rounded"></div>
                                </div>

                                <div className="flex gap-3 mt-4">
                                    <div className="h-12 w-40 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                                    <div className="h-12 w-12 bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                                </div>
                            </div>
                        </div>

                        {/* Gallery Skeleton */}
                        <div className="mt-8 mb-4">
                            <div className="h-8 w-48 bg-slate-200 dark:bg-slate-800 rounded mb-4"></div>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="aspect-[3/4] bg-slate-200 dark:bg-slate-800 rounded-lg"></div>
                                ))}
                            </div>
                        </div>

                        {/* Content Grid Skeleton */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                            <div className="lg:col-span-2 space-y-8">
                                <div className="h-64 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800"></div>
                                <div className="h-64 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800"></div>
                            </div>
                            <div className="relative">
                                <div className="h-96 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800"></div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
