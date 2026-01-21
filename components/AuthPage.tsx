"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthPage() {
    const [step, setStep] = useState(1);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']); // Changed to 6 digits
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const supabase = createClient();
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirectTo');

    const handlePhoneSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            // Basic formatting to ensure it includes country code if missing
            let formattedPhone = phoneNumber.replace(/\D/g, '');
            if (!formattedPhone.startsWith('55')) {
                formattedPhone = '55' + formattedPhone;
            }
            formattedPhone = '+' + formattedPhone;

            const { error } = await supabase.auth.signInWithOtp({
                phone: formattedPhone,
                // Default channel is SMS, so we don't need to specify options or can explicitly set 'sms'
            });

            if (error) throw error;
            setStep(2);
        } catch (err: any) {
            console.error('Error sending OTP:', err);
            setError(err.message || 'Erro ao enviar código. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (value.length > 1) return;
        const newOtp = [...otpCode];
        newOtp[index] = value;
        setOtpCode(newOtp);

        // Auto-focus next input
        if (value && index < 5) { // Updated index check for 6 digits
            const nextInput = document.getElementById(`otp-${index + 1}`);
            nextInput?.focus();
        }
    };

    const handleOtpPaste = (e: React.ClipboardEvent) => {
        const pasteData = e.clipboardData.getData('text').slice(0, 6).split(''); // Slice 6 chars
        if (pasteData.length > 0) {
            const newOtp = [...otpCode];
            pasteData.forEach((char, index) => {
                if (index < 6) newOtp[index] = char; // Loop up to 6
            });
            setOtpCode(newOtp);
        }
    };

    const handleOtpSubmit = async () => {
        setLoading(true);
        setError(null);
        try {
            let formattedPhone = phoneNumber.replace(/\D/g, '');
            if (!formattedPhone.startsWith('55')) {
                formattedPhone = '55' + formattedPhone;
            }
            formattedPhone = '+' + formattedPhone;

            const token = otpCode.join('');
            const { error } = await supabase.auth.verifyOtp({
                phone: formattedPhone,
                token: token,
                type: 'sms',
            });

            if (error) throw error;

            // Successful login
            if (redirectTo) {
                router.push(decodeURIComponent(redirectTo));
            } else {
                router.push('/');
            }
            router.refresh();
        } catch (err: any) {
            console.error('Error verifying OTP:', err);
            setError(err.message || 'Código inválido. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#111921] text-[#0e141b] dark:text-gray-100 font-sans transition-colors duration-200 overflow-hidden h-screen w-screen relative">
            <div className="absolute inset-0 flex flex-col pointer-events-none select-none opacity-40 grayscale-[0.5] scale-[0.98] origin-top">
                <header className="h-16 border-b border-gray-200 dark:border-gray-800 flex items-center px-6 justify-between bg-white dark:bg-[#1a2633]">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    </div>
                    <div className="flex gap-3">
                        <div className="h-8 w-8 rounded bg-gray-100 dark:bg-gray-800"></div>
                        <div className="h-8 w-8 rounded bg-gray-100 dark:bg-gray-800"></div>
                    </div>
                </header>
                <div className="flex flex-1 overflow-hidden">
                    <div className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1a2633] hidden md:block p-6">
                        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
                        <div className="space-y-4">
                            <div className="h-3 w-full bg-gray-100 dark:bg-gray-800 rounded"></div>
                            <div className="h-3 w-3/4 bg-gray-100 dark:bg-gray-800 rounded"></div>
                            <div className="h-3 w-5/6 bg-gray-100 dark:bg-gray-800 rounded"></div>
                        </div>
                    </div>
                    <div className="flex-1 bg-[#f8fafb] dark:bg-[#111921] p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            <div className="bg-white dark:bg-[#1a2633] p-4 rounded-xl border border-gray-100 dark:border-gray-800 h-32"></div>
                            <div className="bg-white dark:bg-[#1a2633] p-4 rounded-xl border border-gray-100 dark:border-gray-800 h-32"></div>
                            <div className="bg-white dark:bg-[#1a2633] p-4 rounded-xl border border-[#207fdf]/40 ring-2 ring-[#207fdf] h-32 flex flex-col justify-between relative overflow-hidden">
                                <div className="absolute inset-0 bg-[#207fdf]/5"></div>
                                <div className="relative z-10 flex justify-between items-start">
                                    <span className="font-bold text-[#207fdf]">09:00</span>
                                    <span className="bg-[#207fdf] text-white text-xs px-2 py-0.5 rounded-full">Selecionado</span>
                                </div>
                                <div className="relative z-10 h-2 w-20 bg-[#207fdf]/20 rounded"></div>
                            </div>
                            <div className="bg-white dark:bg-[#1a2633] p-4 rounded-xl border border-gray-100 dark:border-gray-800 h-32"></div>
                            <div className="bg-white dark:bg-[#1a2633] p-4 rounded-xl border border-gray-100 dark:border-gray-800 h-32"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm dark:bg-black/70 transition-opacity"></div>
                <div className="modal-content relative w-full max-w-[480px] bg-white dark:bg-[#1a232e] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-auto min-h-[580px] border border-gray-100 dark:border-gray-800">
                    <Link href="/" className="absolute top-4 right-4 z-20 p-2 text-slate-500 hover:text-slate-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-white/5">
                        <span className="material-symbols-outlined text-2xl">close</span>
                    </Link>

                    {/* Step 1 */}
                    {step === 1 && (
                        <div className="step-1 w-full h-full p-8 md:p-10 bg-white dark:bg-[#1a232e] flex flex-col justify-center">
                            <div className="text-center mb-8 mt-2 w-full max-w-sm mx-auto">
                                <div className="mx-auto w-12 h-12 bg-[#207fdf]/10 rounded-full flex items-center justify-center mb-4 text-[#207fdf]">
                                    <span className="material-symbols-outlined text-2xl">sms</span>
                                </div>
                                <h2 className="text-[#0e141b] dark:text-white tracking-tight text-[26px] font-bold leading-tight px-2 pb-2">
                                    Vamos reservar este horário?
                                </h2>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed px-4">
                                    Insira seu celular para garantir a reserva enquanto você paga.
                                </p>
                            </div>
                            <div className="flex flex-col gap-4 mb-6 w-full max-w-sm mx-auto">
                                <label className="block">
                                    <span className="sr-only">Celular</span>
                                    <div className="relative group">
                                        <div className="flex items-center w-full rounded-xl border border-[#d1dbe6] dark:border-gray-600 bg-[#f6f7f8] dark:bg-[#111921] focus-within:ring-2 focus-within:ring-[#207fdf] focus-within:border-[#207fdf] transition-all overflow-hidden h-14">
                                            <div className="flex items-center gap-2 pl-4 pr-3 border-r border-[#d1dbe6] dark:border-gray-600 bg-white dark:bg-[#1a232e] h-full select-none">
                                                <span aria-label="Brazil Flag" className="text-xl leading-none" role="img">🇧🇷</span>
                                                <span className="text-[#0e141b] dark:text-gray-200 font-medium text-base">+55</span>
                                            </div>
                                            <input
                                                autoComplete="tel"
                                                className="w-full h-full bg-transparent border-none text-[#0e141b] dark:text-white placeholder:text-[#90a0b0] focus:ring-0 px-4 text-lg font-medium tracking-wide"
                                                placeholder="(11) 99999-9999"
                                                type="tel"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </label>
                                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                            </div>
                            <div className="mb-6 w-full max-w-sm mx-auto">
                                <button
                                    onClick={handlePhoneSubmit}
                                    disabled={loading}
                                    className="flex w-full cursor-pointer items-center justify-center rounded-xl h-12 px-5 bg-[#207fdf] hover:bg-blue-600 active:scale-[0.98] transition-all text-[#f8fafb] text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-[#207fdf]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                    ) : (
                                        <>
                                            <span className="mr-2">Receber código por SMS</span>
                                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                                        </>
                                    )}
                                </button>
                                <div className="mt-3 flex items-center justify-center gap-1 text-xs text-slate-400 dark:text-slate-500">
                                    <span className="material-symbols-outlined text-[14px]">lock</span>
                                    <span>Seus dados estão protegidos</span>
                                </div>
                            </div>
                            <div className="relative flex items-center justify-center py-2 mb-6 w-full max-w-sm mx-auto">
                                <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                                <span className="flex-shrink-0 mx-4 text-slate-400 dark:text-slate-500 text-sm">ou continue com</span>
                                <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 w-full max-w-sm mx-auto">
                                <button className="flex items-center justify-center gap-2 h-12 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-slate-700 dark:text-gray-200 font-medium text-sm">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4"></path>
                                        <path d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3275 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z" fill="#34A853"></path>
                                        <path d="M5.50253 14.3003C5.00236 12.8099 5.00236 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z" fill="#FBBC05"></path>
                                        <path d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z" fill="#EA4335"></path>
                                    </svg>
                                    Google
                                </button>
                                <button className="flex items-center justify-center gap-2 h-12 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-slate-700 dark:text-gray-200 font-medium text-sm">
                                    <svg className="w-5 h-5 dark:fill-white fill-slate-900" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M17.4727 13.911C17.4727 11.464 19.5053 10.151 19.5843 10.106C18.4907 8.544 16.7915 8.354 16.1965 8.334C14.7523 8.188 13.3551 9.176 12.6393 9.176C11.9073 9.176 10.7485 8.356 9.57193 8.376C8.04945 8.396 6.64937 9.25 5.86909 10.601C4.26925 13.366 5.46733 17.436 7.02553 19.684C7.79153 20.781 8.68881 21.986 9.90793 21.946C11.071 21.905 11.5192 21.196 12.9151 21.196C14.311 21.196 14.7266 21.946 15.9529 21.926C17.2183 21.905 18.0483 20.78 18.7963 19.685C19.349 18.859 19.7828 17.844 19.9928 17.412C19.9463 17.391 17.4727 16.444 17.4727 13.911Z"></path>
                                        <path d="M15.4851 6.579C16.1368 5.791 16.5746 4.696 16.4566 3.61C15.5451 3.647 14.4442 4.215 13.7915 4.991C13.2016 5.688 12.6749 6.804 12.8053 7.87C13.8239 7.949 14.9084 7.324 15.4851 6.579Z"></path>
                                    </svg>
                                    Apple
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 2 */}
                    {step === 2 && (
                        <div className="step-2 w-full h-full p-8 md:p-10 bg-white dark:bg-[#1a232e] flex flex-col justify-center">
                            <div className="flex-1 flex flex-col justify-center">
                                <button
                                    onClick={() => setStep(1)}
                                    className="self-start cursor-pointer text-slate-400 hover:text-[#207fdf] transition-colors mb-6 absolute top-10 left-10"
                                >
                                    <span className="material-symbols-outlined">arrow_back</span>
                                </button>
                                <div className="text-center mb-8">
                                    <div className="mx-auto w-12 h-12 bg-green-500/10 rounded-full flex items-center justify-center mb-4 text-green-500">
                                        <span className="material-symbols-outlined text-2xl">sms</span>
                                    </div>
                                    <h2 className="text-[#0e141b] dark:text-white tracking-tight text-[24px] font-bold leading-tight px-2 pb-2">
                                        Confirme seu número
                                    </h2>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-relaxed">
                                        Digite o código de 6 dígitos enviado para <br />
                                        <span className="font-medium text-[#0e141b] dark:text-white">+55 {phoneNumber}</span>
                                    </p>
                                </div>
                                <div
                                    className="flex justify-center gap-2 mb-8"
                                    onPaste={handleOtpPaste}
                                >
                                    {[0, 1, 2, 3, 4, 5].map((i) => (
                                        <input
                                            key={i}
                                            id={`otp-${i}`}
                                            autoFocus={i === 0}
                                            className="w-12 h-14 rounded-lg border border-gray-300 dark:border-gray-600 bg-[#f6f7f8] dark:bg-[#111921] text-center text-xl font-bold focus:ring-2 focus:ring-[#207fdf] focus:border-[#207fdf] text-[#0e141b] dark:text-white transition-all caret-[#207fdf]"
                                            maxLength={1}
                                            type="text"
                                            value={otpCode[i]}
                                            onChange={(e) => handleOtpChange(i, e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Backspace' && !otpCode[i] && i > 0) {
                                                    const prevInput = document.getElementById(`otp-${i - 1}`);
                                                    prevInput?.focus();
                                                }
                                            }}
                                        />
                                    ))}
                                </div>
                                {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
                                <div className="text-center mb-8">
                                    <p className="text-sm text-slate-500 dark:text-slate-400">
                                        Não recebeu o código?
                                        <button
                                            onClick={handlePhoneSubmit}
                                            className="font-bold text-[#207fdf] hover:underline ml-1"
                                        >
                                            Reenviar
                                        </button>
                                    </p>
                                </div>
                                <button
                                    onClick={handleOtpSubmit}
                                    disabled={loading}
                                    className="w-full cursor-pointer flex items-center justify-center rounded-xl h-12 px-5 bg-[#207fdf] hover:bg-blue-600 active:scale-[0.98] transition-all text-[#f8fafb] text-base font-bold leading-normal tracking-[0.015em] shadow-lg shadow-[#207fdf]/20 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                    ) : (
                                        "Confirmar e Reservar"
                                    )}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
