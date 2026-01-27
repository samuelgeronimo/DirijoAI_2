"use client";

import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { VEHICLE_FEATURES_STANDARD } from "@/utils/vehicleFeatures";

interface VehicleFormProps {
    initialData?: {
        id?: string;
        brand?: string;
        model?: string;
        year?: string;
        plate?: string;
        color?: string;
        transmission?: string;
        features?: string[];
        photo_urls?: string[];
    };
    instructorId: string;
}

export function VehicleForm({ initialData, instructorId }: VehicleFormProps) {
    const supabase = createClient();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const [formData, setFormData] = useState({
        brand: initialData?.brand || "",
        model: initialData?.model || "",
        year: initialData?.year || "",
        plate: initialData?.plate || "",
        color: initialData?.color || "",
        transmission: initialData?.transmission || "manual",
        features: initialData?.features || [],
        photo_urls: initialData?.photo_urls || [],
    });
    const [uploading, setUploading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFeaturesChange = (feature: string) => {
        setFormData((prev) => {
            const features = prev.features.includes(feature)
                ? prev.features.filter((f: string) => f !== feature)
                : [...prev.features, feature];
            return { ...prev, features };
        });
    };

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const files = Array.from(e.target.files);
        const newPhotoUrls: string[] = [];

        try {
            for (const file of files) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${instructorId}/${Math.random().toString(36).substring(2)}.${fileExt}`;

                const { error: uploadError } = await supabase.storage
                    .from('vehicle-photos')
                    .upload(fileName, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('vehicle-photos')
                    .getPublicUrl(fileName);

                newPhotoUrls.push(publicUrl);
            }

            setFormData(prev => ({
                ...prev,
                photo_urls: [...(prev.photo_urls || []), ...newPhotoUrls]
            }));

            setMessage({ type: 'success', text: 'Fotos convertidas e carregadas. Lembre-se de salvar.' });
        } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            setMessage({ type: 'error', text: 'Erro ao fazer upload das fotos: ' + errorMessage });
        } finally {
            setUploading(false);
            // Clear input
            e.target.value = '';
        }
    };

    const removePhoto = (indexToRemove: number) => {
        setFormData(prev => ({
            ...prev,
            photo_urls: prev.photo_urls.filter((_: string, index: number) => index !== indexToRemove)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const vehicleData = {
                instructor_id: instructorId,
                ...formData,
                year: Number(formData.year),
                photo_url: formData.photo_urls[0] || null,
                updated_at: new Date().toISOString(),
            };

            // If we have an ID, include it to ensure we update the existing record
            if (initialData?.id) {
                Object.assign(vehicleData, { id: initialData.id });
            }

            const { error } = await supabase
                .from("vehicles")
                .upsert(vehicleData, { onConflict: 'id' });

            if (error) throw error;

            setMessage({ type: 'success', text: 'Veículo salvo com sucesso!' });
            router.refresh();
        } catch (error: any) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            setMessage({ type: 'error', text: errorMessage || 'Erro ao salvar veículo.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
                <div className={`p-4 rounded-xl border ${message.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                    {message.text}
                </div>
            )}

            <div className="flex flex-col gap-4">
                <label className="text-sm font-medium text-gray-400 block">Fotos do Veículo</label>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Photo List */}
                    {formData.photo_urls?.map((url: string, index: number) => (
                        <div key={index} className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group">
                            <Image
                                src={url}
                                alt={`Veículo ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 300px"
                            />
                            <button
                                type="button"
                                onClick={() => removePhoto(index)}
                                className="absolute top-2 right-2 bg-red-500/80 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            >
                                <span className="material-symbols-outlined text-sm">close</span>
                            </button>
                        </div>
                    ))}

                    {/* Upload Button */}
                    <label className="aspect-video rounded-xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-instructor-primary/50 hover:bg-instructor-primary/5 transition-all group">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            disabled={uploading}
                            className="hidden"
                        />
                        {uploading ? (
                            <span className="w-6 h-6 border-2 border-instructor-primary border-t-transparent rounded-full animate-spin"></span>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-gray-400 group-hover:text-instructor-primary transition-colors">add_a_photo</span>
                                <span className="text-xs text-gray-400 group-hover:text-instructor-primary font-medium">Adicionar Fotos</span>
                            </>
                        )}
                    </label>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Marca</label>
                    <input
                        type="text"
                        name="brand"
                        value={formData.brand}
                        onChange={handleChange}
                        className="w-full bg-instructor-bg-dark border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-instructor-primary transition-colors"
                        placeholder="Ex: Fiat"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Modelo</label>
                    <input
                        type="text"
                        name="model"
                        value={formData.model}
                        onChange={handleChange}
                        className="w-full bg-instructor-bg-dark border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-instructor-primary transition-colors"
                        placeholder="Ex: Mobi"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Ano</label>
                    <input
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full bg-instructor-bg-dark border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-instructor-primary transition-colors"
                        placeholder="Ex: 2024"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Placa</label>
                    <input
                        type="text"
                        name="plate"
                        value={formData.plate}
                        onChange={handleChange}
                        className="w-full bg-instructor-bg-dark border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-instructor-primary transition-colors uppercase"
                        placeholder="Ex: ABC-1234"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Cor</label>
                    <input
                        type="text"
                        name="color"
                        value={formData.color}
                        onChange={handleChange}
                        className="w-full bg-instructor-bg-dark border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-instructor-primary transition-colors"
                        placeholder="Ex: Branco"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">Transmissão</label>
                    <div className="flex gap-4">
                        <label className={`flex-1 cursor-pointer p-3 rounded-xl border transition-all ${formData.transmission === 'manual' ? 'bg-instructor-primary/10 border-instructor-primary text-instructor-primary' : 'bg-instructor-bg-dark border-white/10 text-gray-400 hover:border-white/20'}`}>
                            <input
                                type="radio"
                                name="transmission"
                                value="manual"
                                checked={formData.transmission === 'manual'}
                                onChange={handleChange}
                                className="hidden"
                            />
                            <div className="flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">settings</span>
                                <span>Manual</span>
                            </div>
                        </label>
                        <label className={`flex-1 cursor-pointer p-3 rounded-xl border transition-all ${formData.transmission === 'automatic' ? 'bg-instructor-primary/10 border-instructor-primary text-instructor-primary' : 'bg-instructor-bg-dark border-white/10 text-gray-400 hover:border-white/20'}`}>
                            <input
                                type="radio"
                                name="transmission"
                                value="automatic"
                                checked={formData.transmission === 'automatic'}
                                onChange={handleChange}
                                className="hidden"
                            />
                            <div className="flex items-center justify-center gap-2">
                                <span className="material-symbols-outlined">auto_transmission_mode</span>
                                <span>Automático</span>
                            </div>
                        </label>
                    </div>
                </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
                <label className="text-sm font-medium text-gray-400 block mb-4">Itens e Conforto</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {VEHICLE_FEATURES_STANDARD.map((feature) => (
                        <button
                            key={feature}
                            type="button"
                            onClick={() => handleFeaturesChange(feature)}
                            className={`p-3 rounded-xl text-sm font-medium border text-left flex items-center gap-2 transition-all ${formData.features.includes(feature)
                                ? "bg-instructor-primary/10 border-instructor-primary text-instructor-primary"
                                : "bg-instructor-bg-dark border-white/10 text-gray-400 hover:border-white/20 hover:text-white"
                                }`}
                        >
                            <span className="material-symbols-outlined text-lg">
                                {formData.features.includes(feature) ? "check_circle" : "circle"}
                            </span>
                            {feature}
                        </button>
                    ))}
                </div>
            </div>

            <div className="pt-8 flex justify-end">
                <button
                    type="submit"
                    disabled={loading || uploading}
                    className="px-8 py-3 bg-instructor-primary text-instructor-bg-dark font-bold rounded-xl shadow-lg shadow-instructor-primary/20 hover:bg-instructor-primary-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all"
                >
                    {loading ? (
                        <>
                            <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
                            Salvando...
                        </>
                    ) : (
                        <>
                            <span className="material-symbols-outlined">save</span>
                            Salvar Alterações
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
