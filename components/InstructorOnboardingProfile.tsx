"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function InstructorOnboardingProfile() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<any>(null);

    // Profile Data
    const [bio, setBio] = useState("");
    const [selectedSuperpowers, setSelectedSuperpowers] = useState<string[]>([]);
    const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);

    // Vehicle Data
    const [vehicle, setVehicle] = useState({
        model: "",
        year: "",
        plate: "",
        color: "",
    });
    const [vehicleFeatures, setVehicleFeatures] = useState<string[]>([]);

    // Multiple Vehicle Photos State
    const [vehiclePhotos, setVehiclePhotos] = useState<File[]>([]);
    const [vehiclePhotoPreviews, setVehiclePhotoPreviews] = useState<string[]>([]);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getUser().then(({ data }) => {
            if (data.user) {
                setUser(data.user);
            } else {
                router.push("/");
            }
        });
    }, [router]);

    // Handlers
    const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setProfilePhoto(file);
            setPhotoPreview(URL.createObjectURL(file));
        }
    };

    // Handle Multiple Vehicle Photos
    const handleVehiclePhotosChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newFiles = Array.from(e.target.files);
            const totalFiles = vehiclePhotos.length + newFiles.length;

            if (totalFiles > 5) {
                alert("Você pode enviar no máximo 5 fotos.");
                return;
            }

            setVehiclePhotos([...vehiclePhotos, ...newFiles]);

            const newPreviews = newFiles.map(file => URL.createObjectURL(file));
            setVehiclePhotoPreviews([...vehiclePhotoPreviews, ...newPreviews]);
        }
    };

    const removeVehiclePhoto = (index: number) => {
        const newPhotos = [...vehiclePhotos];
        newPhotos.splice(index, 1);
        setVehiclePhotos(newPhotos);

        const newPreviews = [...vehiclePhotoPreviews];
        newPreviews.splice(index, 1);
        setVehiclePhotoPreviews(newPreviews);
    };

    const handleSuperpowerToggle = (power: string) => {
        if (selectedSuperpowers.includes(power)) {
            setSelectedSuperpowers(selectedSuperpowers.filter((p) => p !== power));
        } else {
            if (selectedSuperpowers.length < 3) {
                setSelectedSuperpowers([...selectedSuperpowers, power]);
            }
        }
    };

    const handleVehicleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVehicle({ ...vehicle, [e.target.id]: e.target.value });
    };

    const handleFeatureToggle = (feature: string) => {
        if (vehicleFeatures.includes(feature)) {
            setVehicleFeatures(vehicleFeatures.filter((f) => f !== feature));
        } else {
            setVehicleFeatures([...vehicleFeatures, feature]);
        }
    };

    const uploadImage = async (file: File, bucket: string, path: string) => {
        const supabase = createClient();
        const { error, data } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
        if (error) throw error;
        const { data: publicUrlData } = supabase.storage.from(bucket).getPublicUrl(path);
        return publicUrlData.publicUrl;
    };

    const handleSave = async () => {
        if (!user) return;
        setLoading(true);

        try {
            const supabase = createClient();

            // 1. Upload Profile Photo
            let profilePhotoUrl = null;
            if (profilePhoto) {
                const path = `${user.id}/avatar_${Date.now()}.jpg`;
                profilePhotoUrl = await uploadImage(profilePhoto, 'avatars', path);
            }

            // 2. Upload Vehicle Photos (Multiple)
            const uploadedVehiclePhotoUrls: string[] = [];
            if (vehiclePhotos.length > 0) {
                const uploadPromises = vehiclePhotos.map(async (file, index) => {
                    const path = `${user.id}/vehicle_${Date.now()}_${index}.jpg`;
                    return uploadImage(file, 'vehicles', path);
                });
                const urls = await Promise.all(uploadPromises);
                uploadedVehiclePhotoUrls.push(...urls);
            }

            // 3. Update Instructor Profile (Bio, Superpowers, Avatar)
            const { error: instructorError } = await supabase.from('instructors').update({
                bio: bio,
                superpowers: selectedSuperpowers,
                current_onboarding_step: 5
            }).eq('id', user.id);

            if (instructorError) throw instructorError;

            // 4. Update Profile (Avatar)
            if (profilePhotoUrl) {
                await supabase.from('profiles').update({ avatar_url: profilePhotoUrl }).eq('id', user.id);
            }

            // 5. Create/Update Vehicle
            // Using upsert with onConflict 'plate'
            const { error: vehicleError } = await supabase.from('vehicles').upsert({
                instructor_id: user.id,
                model: vehicle.model,
                brand: 'Unknown',
                year: parseInt(vehicle.year) || 2024,
                plate: vehicle.plate,
                color: vehicle.color || 'Unknown',
                features: vehicleFeatures, // Added features
                photo_url: uploadedVehiclePhotoUrls[0] || null, // Keeping main photo as first one for backward compatibility
                photo_urls: uploadedVehiclePhotoUrls, // New array column
                is_active: true
            }, { onConflict: 'plate' });

            if (vehicleError) throw vehicleError;

            router.push("/instructor/onboarding/video"); // Step 4

        } catch (error: any) {
            console.error("Error saving profile:", error);
            alert("Erro ao salvar perfil: " + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f6f7f8] dark:bg-[#101922] text-[#0d141b] dark:text-gray-100 font-display transition-colors duration-200">
            <div className="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden">
                {/* Header */}
                <header className="sticky top-0 z-50 flex items-center justify-between border-b border-[#e7edf3] dark:border-[#2d3b4a] bg-white dark:bg-[#1e2936] px-6 py-3 lg:px-10">
                    <div className="flex items-center gap-4">
                        <div className="flex size-8 items-center justify-center text-[#137fec]">
                            <span className="material-symbols-outlined text-3xl">directions_car</span>
                        </div>
                        <h2 className="text-[#0d141b] dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                            Instrutor Pro
                        </h2>
                    </div>
                </header>

                <div className="layout-container flex h-full grow flex-col">
                    <div className="flex flex-1 justify-center px-4 py-8 md:px-10 lg:px-40">
                        <div className="layout-content-container flex max-w-[1100px] flex-1 flex-col gap-8">
                            {/* Progress */}
                            <div className="flex flex-col gap-3">
                                <div className="flex items-end justify-between gap-6">
                                    <p className="text-[#0d141b] dark:text-white text-base font-medium leading-normal">
                                        Etapa 4 de 8: Perfil e Veículo
                                    </p>
                                    <p className="text-[#137fec] text-sm font-bold leading-normal">
                                        50%
                                    </p>
                                </div>
                                <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                                    <div
                                        className="h-full rounded-full bg-[#137fec] transition-all duration-500 ease-out"
                                        style={{ width: "50%" }}
                                    ></div>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <h1 className="text-[#0d141b] dark:text-white text-3xl font-black leading-tight tracking-[-0.033em] md:text-4xl">
                                    Destaque seu Perfil
                                </h1>
                                <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
                                    Conte suas experiências e mostre ao aluno o conforto do seu veículo.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                                <div className="flex flex-col gap-6 lg:col-span-2">
                                    {/* Bio Section */}
                                    <div className="flex flex-col gap-4 rounded-xl border border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-[#1e2936] p-6 shadow-sm">
                                        <div className="mb-2 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#137fec]">person</span>
                                            <h3 className="text-[#0d141b] dark:text-white text-lg font-bold">Sobre mim</h3>
                                        </div>
                                        <div className="flex flex-col gap-6 md:flex-row">
                                            <div className="flex min-w-[120px] flex-col items-center gap-3">
                                                <div className="group relative flex size-28 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800/80">
                                                    {photoPreview ? (
                                                        <img src={photoPreview} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <>
                                                            <input
                                                                accept="image/*"
                                                                aria-label="Upload de foto de perfil"
                                                                className="absolute inset-0 cursor-pointer opacity-0"
                                                                type="file"
                                                                onChange={handleProfilePhotoChange}
                                                            />
                                                            <div className="dark:group-hover:text-[#137fec] flex flex-col items-center text-slate-400 transition-colors group-hover:text-[#137fec]">
                                                                <span className="material-symbols-outlined text-3xl">add_a_photo</span>
                                                                <span className="mt-1 text-[10px] font-bold uppercase">Foto</span>
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                                <label className="cursor-pointer text-xs font-bold text-[#137fec] hover:text-blue-600 hover:underline">
                                                    Alterar foto
                                                    <input
                                                        accept="image/*"
                                                        className="hidden"
                                                        type="file"
                                                        onChange={handleProfilePhotoChange}
                                                    />
                                                </label>
                                            </div>
                                            <div className="w-full flex-1">
                                                <label className="sr-only" htmlFor="bio">
                                                    Biografia
                                                </label>
                                                <textarea
                                                    className="text-[#0d141b] dark:text-white block h-full min-h-[120px] w-full rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-3 text-sm placeholder:text-slate-400 shadow-sm focus:border-[#137fec] focus:ring-[#137fec]"
                                                    id="bio"
                                                    placeholder="Olá! Sou instrutor há 5 anos, focado em direção defensiva. Gosto de ensinar com paciência..."
                                                    rows={4}
                                                    value={bio}
                                                    onChange={(e) => setBio(e.target.value)}
                                                ></textarea>
                                                <p className="text-slate-500 dark:text-slate-400 mt-2 text-right text-xs">
                                                    {bio.length}/500 caracteres
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Superpowers */}
                                    <div className="flex flex-col gap-4 rounded-xl border border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-[#1e2936] p-6 shadow-sm">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#137fec]">stars</span>
                                            <h3 className="text-lg font-bold text-[#0d141b] dark:text-white">Seus Superpoderes <span className="text-sm font-normal text-slate-500 ml-1">(Selecione até 3)</span></h3>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {['🛡️ Paciente', '🎯 Rei da Baliza', '🧠 Psicólogo', '🛣️ Rodovia', '⚡ Intensivão'].map(power => (
                                                <div
                                                    key={power}
                                                    onClick={() => handleSuperpowerToggle(power)}
                                                    className={`px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer select-none
                                    ${selectedSuperpowers.includes(power)
                                                            ? 'border-[#137fec] bg-[#137fec]/10 text-[#137fec]'
                                                            : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:border-[#137fec]/50'
                                                        }
                                `}
                                                >
                                                    {power}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Vehicle Data */}
                                    <div className="flex flex-col gap-6 rounded-xl border border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-[#1e2936] p-6 shadow-sm">
                                        <div className="mb-2 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[#137fec]">directions_car</span>
                                            <h3 className="text-[#0d141b] dark:text-white text-lg font-bold">Dados do Veículo</h3>
                                        </div>
                                        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-slate-700 dark:text-slate-300 text-sm font-medium" htmlFor="model">
                                                    Modelo
                                                </label>
                                                <input
                                                    className="text-[#0d141b] dark:text-white rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm shadow-sm focus:border-[#137fec] focus:ring-[#137fec]"
                                                    id="model"
                                                    placeholder="Ex: HB20"
                                                    type="text"
                                                    value={vehicle.model}
                                                    onChange={handleVehicleChange}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-slate-700 dark:text-slate-300 text-sm font-medium" htmlFor="year">
                                                    Ano
                                                </label>
                                                <input
                                                    className="text-[#0d141b] dark:text-white rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm shadow-sm focus:border-[#137fec] focus:ring-[#137fec]"
                                                    id="year"
                                                    placeholder="Ex: 2021"
                                                    type="text"
                                                    value={vehicle.year}
                                                    onChange={handleVehicleChange}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1.5">
                                                <label className="text-slate-700 dark:text-slate-300 text-sm font-medium" htmlFor="plate">
                                                    Placa
                                                </label>
                                                <input
                                                    className="text-[#0d141b] dark:text-white rounded-lg border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm shadow-sm focus:border-[#137fec] focus:ring-[#137fec]"
                                                    id="plate"
                                                    placeholder="Ex: ABC-1234"
                                                    type="text"
                                                    value={vehicle.plate}
                                                    onChange={handleVehicleChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-4">
                                            <p className="text-sm text-slate-700 dark:text-slate-300 font-medium">Equipamentos e Conforto:</p>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                {['❄️ Ar Condicionado', '💪 Direção Elétrica', '🛑 Freio Duplo', '📹 Câmera de Ré', '⚙️ Câmbio Automático'].map(feature => (
                                                    <label key={feature} className="flex items-center gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors">
                                                        <input
                                                            type="checkbox"
                                                            checked={vehicleFeatures.includes(feature)}
                                                            onChange={() => handleFeatureToggle(feature)}
                                                            className="h-5 w-5 rounded border-slate-300 text-[#137fec] focus:ring-[#137fec] dark:bg-slate-800 dark:border-slate-600"
                                                        />
                                                        <span className="text-sm text-slate-700 dark:text-slate-300">{feature}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>


                                        <div className="mt-2 border-t border-slate-200 dark:border-slate-700 pt-6">
                                            <label className="text-[#0d141b] dark:text-white mb-2 block text-sm font-medium">
                                                Fotos do Veículo (Interior e Exterior) <span className="text-red-500">*</span>
                                            </label>

                                            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
                                                {/* Previews */}
                                                {vehiclePhotoPreviews.map((preview, index) => (
                                                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 group">
                                                        <img src={preview} className="w-full h-full object-cover" />
                                                        <button
                                                            onClick={() => removeVehiclePhoto(index)}
                                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <span className="material-symbols-outlined text-sm">close</span>
                                                        </button>
                                                    </div>
                                                ))}

                                                {/* Add Button */}
                                                {vehiclePhotos.length < 5 && (
                                                    <div className="aspect-square">
                                                        <div className="relative w-full h-full cursor-pointer flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                                                            <input
                                                                accept="image/*"
                                                                multiple
                                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                                type="file"
                                                                onChange={handleVehiclePhotosChange}
                                                            />
                                                            <span className="material-symbols-outlined text-2xl text-slate-400">add_a_photo</span>
                                                            <span className="text-[10px] text-slate-500 mt-1">Adicionar</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <p className="text-slate-500 dark:text-slate-500 text-xs">
                                                Adicione até 5 fotos mostrando detalhes do interior e exterior do veículo.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-6">
                                    {/* Actions and Preview */}
                                    <div className="flex flex-col gap-4 p-4 sticky top-24">
                                        <button
                                            onClick={handleSave}
                                            disabled={loading}
                                            className="w-full rounded-lg bg-[#137fec] px-8 py-4 text-lg font-bold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-[#0f65bd] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                        >
                                            {loading ? (
                                                <>
                                                    <span className="material-symbols-outlined animate-spin">progress_activity</span>
                                                    Salvando...
                                                </>
                                            ) : (
                                                <>
                                                    Salvar e Continuar
                                                    <span className="material-symbols-outlined">arrow_forward</span>
                                                </>
                                            )}
                                        </button>
                                        <button className="w-full px-6 py-3 rounded-lg text-[#0d141b] dark:text-white font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 border border-transparent hover:border-slate-200">
                                            <span className="material-symbols-outlined text-lg">arrow_back</span>
                                            Voltar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
