
"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";

export default function InstructorOnboardingVideo() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [videoPreviewUrl, setVideoPreviewUrl] = useState<string | null>(null);

    // Webcam State
    const webcamRef = useRef<Webcam>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const [capturing, setCapturing] = useState(false);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [showCamera, setShowCamera] = useState(false);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data }) => {
            if (data.user) {
                setUser(data.user);
            } else {
                router.push("/instructor/login");
            }
        });
    }, [router]);

    // Handle File Upload
    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 100 * 1024 * 1024) { // 100MB limit
                alert("O vídeo deve ter no máximo 100MB");
                return;
            }
            setVideoFile(file);
            setVideoPreviewUrl(URL.createObjectURL(file));
            setShowCamera(false);
        }
    };

    // Handle Webcam Recording
    const handleStartCaptureClick = useCallback(() => {
        setCapturing(true);
        setRecordedChunks([]);
        if (webcamRef.current && webcamRef.current.stream) {
            mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
                mimeType: "video/webm"
            });
            mediaRecorderRef.current.addEventListener(
                "dataavailable",
                ({ data }: BlobEvent) => {
                    if (data.size > 0) {
                        setRecordedChunks((prev) => prev.concat(data));
                    }
                }
            );
            mediaRecorderRef.current.start();
        }
    }, [webcamRef]);

    const handleStopCaptureClick = useCallback(() => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        setCapturing(false);
        setShowCamera(false); // Close camera view to show preview
    }, []);

    // Create Blob from chunks when recording stops
    useEffect(() => {
        if (!capturing && recordedChunks.length > 0) {
            const blob = new Blob(recordedChunks, {
                type: "video/webm"
            });
            const file = new File([blob], "gravacao-webcam.webm", { type: "video/webm" });
            setVideoFile(file);
            setVideoPreviewUrl(URL.createObjectURL(blob));
        }
    }, [capturing, recordedChunks]);

    const handleRetake = () => {
        setVideoFile(null);
        setVideoPreviewUrl(null);
        setRecordedChunks([]);
    };

    const handleContinue = async () => {
        if (!user) return;
        setLoading(true);
        const supabase = createClient();

        try {
            let publicUrl = null;

            if (videoFile) {
                const fileExt = videoFile.name.split('.').pop();
                const fileName = `${user.id}/presentation_${Date.now()}.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                    .from('documents') // Using existing bucket
                    .upload(fileName, videoFile, { upsert: true });

                if (uploadError) throw uploadError;

                const { data } = supabase.storage
                    .from('documents')
                    .getPublicUrl(fileName);

                publicUrl = data.publicUrl;
            }

            const { error } = await supabase
                .from('instructors')
                .update({
                    current_onboarding_step: 5,
                    video_url: publicUrl
                })
                .eq('id', user.id);

            if (error) throw error;

            router.push("/instructor/onboarding/success");

        } catch (error: any) {
            console.error("Error upload:", error);
            alert("Erro ao salvar vídeo: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101922] text-[#0d141b] dark:text-slate-100 font-display transition-colors duration-200 min-h-screen flex flex-col">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e7edf3] dark:border-[#2d3b4a] bg-white dark:bg-[#1e2936] px-6 lg:px-10 py-3 sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <div className="size-8 flex items-center justify-center text-[#137fec]">
                        <span className="material-symbols-outlined text-3xl">directions_car</span>
                    </div>
                    <h2 className="text-[#0d141b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Instrutor Pro</h2>
                </div>
            </header>

            <main className="flex-1 flex justify-center py-8 px-4">
                <div className="flex flex-col max-w-3xl flex-1 gap-8">
                    {/* Progress */}
                    <div className="flex flex-col gap-3">
                        <div className="flex gap-6 justify-between items-end">
                            <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal">Etapa 4 de 6: Vídeo de Apresentação</p>
                            <p className="text-[#137fec] text-sm font-bold leading-normal">66%</p>
                        </div>
                        <div className="rounded-full bg-slate-200 dark:bg-slate-700 h-2 overflow-hidden">
                            <div className="h-full rounded-full bg-[#137fec] transition-all duration-500 ease-out" style={{ width: '66%' }}></div>
                        </div>
                    </div>

                    {!showCamera && !videoPreviewUrl && (
                        <div className="flex flex-col items-center text-center gap-10 animate-in fade-in zoom-in duration-300">
                            <div className="flex flex-col gap-4 max-w-xl mx-auto">
                                <h1 className="text-[#0d141b] dark:text-white text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
                                    Venda 3x mais com um vídeo
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 text-lg font-normal leading-relaxed">
                                    Pesquisas mostram que alunos preferem instrutores com vídeos de apresentação. Isso transmite confiança e profissionalismo.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
                                <button
                                    onClick={() => setShowCamera(true)}
                                    className="group relative flex flex-col items-center justify-center gap-4 p-8 rounded-2xl bg-white dark:bg-[#1e2936] border-2 border-[#e7edf3] dark:border-slate-800 hover:border-[#137fec]/50 dark:hover:border-[#137fec]/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
                                >
                                    <div className="size-20 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-600 dark:text-red-400 transition-transform group-hover:scale-110">
                                        <span className="material-symbols-outlined text-4xl">videocam</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xl font-bold text-[#0d141b] dark:text-white">Gravar Vídeo Agora</span>
                                        <span className="text-sm text-slate-500 dark:text-slate-400">Use a câmera do seu dispositivo</span>
                                    </div>
                                </button>

                                <label className="group relative flex flex-col items-center justify-center gap-4 p-8 rounded-2xl bg-transparent border-2 border-dashed border-slate-300 dark:border-slate-600 hover:border-[#137fec] hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-all duration-300 cursor-pointer">
                                    <input
                                        type="file"
                                        accept="video/*"
                                        className="hidden"
                                        onChange={handleFileUpload}
                                    />
                                    <div className="size-20 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-[#137fec] transition-transform group-hover:scale-110">
                                        <span className="material-symbols-outlined text-4xl">upload_file</span>
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xl font-bold text-[#0d141b] dark:text-white">Enviar da Galeria</span>
                                        <span className="text-sm text-slate-500 dark:text-slate-400">Carregue um arquivo pronto</span>
                                    </div>
                                </label>
                            </div>

                            <div className="w-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start text-left shadow-sm">
                                <div className="shrink-0 rounded-full bg-amber-100 dark:bg-amber-900/40 p-3 text-amber-600 dark:text-amber-400">
                                    <span className="material-symbols-outlined text-3xl">lightbulb</span>
                                </div>
                                <div className="flex flex-col gap-3 flex-1">
                                    <h4 className="font-bold text-amber-900 dark:text-amber-200 text-sm uppercase tracking-wide flex items-center gap-2">
                                        Não sabe o que dizer? Use nosso roteiro:
                                    </h4>
                                    <p className="text-slate-800 dark:text-slate-200 text-lg ">
                                        "Olá, sou [Nome]. Sou instrutor há X anos. Meu carro tem ar condicionado e direção elétrica. Tenho muita paciência para ensinar baliza..."
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-col items-center gap-6 w-full pt-4">
                                <button
                                    onClick={handleContinue}
                                    disabled={loading}
                                    className="w-full sm:w-auto min-w-[240px] px-8 py-4 rounded-xl bg-[#137fec] text-white font-bold text-lg hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-200 flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-70"
                                >
                                    {loading ? "Salvando..." : "Continuar"}
                                    {!loading && <span className="material-symbols-outlined">arrow_forward</span>}
                                </button>
                                <button
                                    onClick={handleContinue}
                                    className="text-sm font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors underline decoration-transparent hover:decoration-slate-400 underline-offset-4"
                                >
                                    Pular esta etapa (Não recomendado)
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Camera View */}
                    {showCamera && (
                        <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <div className="relative w-full max-w-2xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                                <Webcam
                                    audio={true}
                                    ref={webcamRef}
                                    className="w-full h-full object-cover"
                                    mirrored={true}
                                    onUserMedia={() => console.log("Webcam iniciada")}
                                    onUserMediaError={(err) => alert("Não foi possível acessar a câmera. Verifique as permissões do navegador. Erro: " + err)}
                                />
                                {capturing && (
                                    <div className="absolute top-4 right-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                                        <div className="size-2 bg-white rounded-full"></div>
                                        GRAVANDO
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-4">
                                {!capturing ? (
                                    <>
                                        <button
                                            onClick={() => setShowCamera(false)}
                                            className="px-6 py-3 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white font-bold hover:bg-slate-300 transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            onClick={handleStartCaptureClick}
                                            className="px-8 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-500/30 transition-all flex items-center gap-2"
                                        >
                                            <div className="size-3 bg-white rounded-full"></div>
                                            Iniciar Gravação
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={handleStopCaptureClick}
                                        className="px-8 py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold shadow-lg transition-all flex items-center gap-2"
                                    >
                                        <div className="size-3 bg-red-500 rounded-sm"></div>
                                        Parar Gravação
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Video Preview */}
                    {videoPreviewUrl && (
                        <div className="flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                            <h2 className="text-xl font-bold text-[#0d141b] dark:text-white">Ficou bom?</h2>

                            <div className="relative w-full max-w-2xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
                                <video
                                    src={videoPreviewUrl}
                                    controls
                                    className="w-full h-full"
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                                <button
                                    onClick={handleRetake}
                                    className="px-6 py-3 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                                >
                                    Gravar Novamente
                                </button>
                                <button
                                    onClick={handleContinue}
                                    disabled={loading}
                                    className="px-8 py-3 rounded-xl bg-[#137fec] text-white font-bold hover:bg-blue-600 shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 min-w-[200px]"
                                >
                                    {loading ? (
                                        <>
                                            <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>
                                            Enviando...
                                        </>
                                    ) : (
                                        <>
                                            Salvar e Continuar
                                            <span className="material-symbols-outlined">arrow_forward</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
