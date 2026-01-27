"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HeroSection() {
    const router = useRouter();
    const [locationInput, setLocationInput] = useState("");
    const [isLoadingLocation, setIsLoadingLocation] = useState(false);
    const [locationError, setLocationError] = useState("");

    const getLocation = () => {
        if ("geolocation" in navigator) {
            setIsLoadingLocation(true);
            navigator.geolocation.getCurrentPosition(async (position: GeolocationPosition) => {
                try {
                    const { latitude, longitude } = position.coords;
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
                    const data = await response.json();
                    if (data.address) {
                        const city = data.address.city || data.address.town || data.address.village || "";
                        const state = data.address.state || "";
                        const formattedParams = city;
                        setLocationInput(formattedParams);
                    }
                } catch (error) {
                    console.error("Error fetching location", error);
                } finally {
                    setIsLoadingLocation(false);
                }
            }, (error: GeolocationPositionError) => {
                console.warn("Geolocation access failed or was blocked:", error);
                setLocationError("Não foi possível detectar sua localização.");
                setIsLoadingLocation(false);
            });
        }
    };

    const handleSearch = () => {
        if (locationInput.trim()) {
            router.push(`/search?q=${encodeURIComponent(locationInput)}`);
        } else {
            const input = document.querySelector('input[type="text"]') as HTMLInputElement;
            if (input) input.focus();
        }
    };

    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden pt-20">
            {/* Background Effects (Subtle, Dark) */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-instructor-primary/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8 animate-fade-in-up">
                    <span className="w-2 h-2 bg-instructor-primary rounded-full animate-pulse"></span>
                    <span className="text-gray-300 text-xs font-bold uppercase tracking-widest">O Metódo Anti-Reprovação</span>
                </div>

                {/* Massive Typography */}
                <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-8 max-w-5xl mx-auto uppercase">
                    <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400">Não aceite</span>
                    <span className="block text-brand-cta">menos que a</span>
                    <span className="block">Aprovação.</span>
                </h1>

                {/* Subheadline */}
                <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
                    Esqueça a autoescola tradicional. Encontre um <span className="text-white font-bold">Instrutor de Elite</span> focado na sua dificuldade e tire sua CNH em tempo recorde.
                </p>

                {/* Interaction Area (Search) */}
                <div className="w-full max-w-2xl bg-white/5 backdrop-blur-md border border-white/10 p-2 rounded-2xl flex flex-col md:flex-row gap-2 shadow-2xl shadow-instructor-primary/10 transition-all hover:shadow-instructor-primary/20 hover:border-instructor-primary/30">
                    <div className="flex-1 relative group">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-hover:text-instructor-primary transition-colors">location_on</span>
                        <input
                            type="text"
                            placeholder={isLoadingLocation ? "Detectando..." : "Onde você quer ter aula?"}
                            value={locationInput}
                            onChange={(e) => setLocationInput(e.target.value)}
                            onFocus={() => !locationInput && getLocation()}
                            className="w-full h-14 pl-12 pr-4 bg-transparent text-white placeholder:text-gray-600 outline-none font-medium rounded-xl focus:bg-white/5 transition-all text-lg"
                        />
                        {isLoadingLocation && (
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 border-2 border-instructor-primary border-t-transparent rounded-full animate-spin"></div>
                        )}
                    </div>
                    <button
                        onClick={handleSearch}
                        className="h-14 px-8 bg-instructor-primary hover:bg-instructor-primary-hover text-instructor-bg-dark font-black text-lg rounded-xl transition-all flex items-center justify-center gap-2 group whitespace-nowrap active:scale-[0.98]"
                    >
                        BUSCAR INSTRUTOR
                        <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </button>
                </div>

                {/* Social Proof / Stats */}
                <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 text-center">
                    <div>
                        <p className="text-3xl font-black text-white mb-1">98%</p>
                        <p className="text-gray-500 text-xs uppercase tracking-wider font-bold">Taxa de Aprovação</p>
                    </div>
                    <div>
                        <p className="text-3xl font-black text-white mb-1">5.000+</p>
                        <p className="text-gray-500 text-xs uppercase tracking-wider font-bold">Aulas Realizadas</p>
                    </div>
                    <div>
                        <p className="text-3xl font-black text-white mb-1">Zero</p>
                        <p className="text-gray-500 text-xs uppercase tracking-wider font-bold">Risco (Garantia Total)</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
