export function MiniAgenda() {
    return (
        <div className="bg-instructor-surface-dark rounded-3xl p-6 border border-white/5">
            <div className="flex justify-between items-center mb-4">
                <h4 className="text-white font-bold">Próximos</h4>
                <button className="text-instructor-primary text-sm font-medium hover:underline cursor-pointer">
                    Ver tudo
                </button>
            </div>
            <div className="space-y-4">
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-full bg-gray-700 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBzEtw0SMxu79K5W-6LqfrQQjVX9F2GdA41pju1sQu7B4c4gqGZixsoHFttZUzpgB-NaBbJi6gx2IClvPt8LZs4BTpiV1Feo0fE4lXY_HEawF3V6SYLLVaw7s4_cFWcecDCFTKmfWhR-3hp9YjhUTpLJrAZop3ikFSuyE6mkb9fTvgtctzRDLs_OXYscFJ3N7swJiGm-IEfBBVKsmvS50SSsV-mVmDFCtjP6el-VktbeQGmvj5IwSfs17ZXX3AUt0GBHOPC4fmKBU6i')",
                        }}
                    ></div>
                    <div className="flex-1">
                        <p className="text-white text-sm font-bold">Ana B.</p>
                        <p className="text-gray-500 text-xs">Hoje, 16:30</p>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-instructor-primary"></div>
                </div>
                <div className="flex items-center gap-3">
                    <div
                        className="w-10 h-10 rounded-full bg-gray-700 bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAahNGLfEiImA2lsS1kfDFg1GeI5dRWhy7m0ATglgAHTk_KVo2vcK9EYf_t5Q4gKf6QOdFRtT69n6cqfzr4AulUSFMHnio8amnU6HWMe5MmfsgwAuDW1BGiK_LNLHIPv-18piy07deN_oEzc_JXyKfSghY8ErLj9CWyuZ35g1xmRm8ycrTp_vF9ER2cWl0DIq-jZhyFZjH7gAwRafbqmISb9PJaR36AhOI1jG2kn0k3ZjmtaEbt3kY-Q9tWHwbwQH5mDMV65llroief')",
                        }}
                    ></div>
                    <div className="flex-1">
                        <p className="text-white text-sm font-bold">Pedro S.</p>
                        <p className="text-gray-500 text-xs">Amanhã, 09:00</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
