"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

interface Address {
    name: string;
    zip_code?: string;
    street?: string;
    number?: string;
    complement?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    address?: string; // Legacy/Display
    type: 'home' | 'work' | 'school' | 'other';
}

interface AddressListProps {
    addresses: Address[] | null;
    profileId: string;
}

export function AddressList({ addresses = [], profileId }: AddressListProps) {
    const [savedAddresses, setSavedAddresses] = useState<Address[]>(addresses || []);
    const [isAdding, setIsAdding] = useState(false);
    const [loadingCep, setLoadingCep] = useState(false);
    const supabase = createClient();

    const [form, setForm] = useState<Address>({
        name: '',
        zip_code: '',
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        type: 'home'
    });

    const handleCepChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        let cep = e.target.value.replace(/\D/g, '');
        if (cep.length > 8) cep = cep.substring(0, 8);

        // Format as 00000-000
        let formattedCep = cep;
        if (cep.length > 5) {
            formattedCep = `${cep.substring(0, 5)}-${cep.substring(5)}`;
        }

        setForm(prev => ({ ...prev, zip_code: formattedCep }));

        if (cep.length === 8) {
            setLoadingCep(true);
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();

                if (!data.erro) {
                    setForm(prev => ({
                        ...prev,
                        zip_code: formattedCep, // Keep formatted
                        street: data.logradouro,
                        neighborhood: data.bairro,
                        city: data.localidade,
                        state: data.uf
                    }));
                }
            } catch (err) {
                console.error("Erro ao buscar CEP:", err);
            } finally {
                setLoadingCep(false);
            }
        }
    };

    const handleSaveAddress = async () => {
        if (!form.name || !form.street || !form.number) {
            alert("Preencha os campos obrigatórios (Nome, Rua, Número)");
            return;
        }

        const fullAddress = `${form.street}, ${form.number}${form.complement ? ' - ' + form.complement : ''} - ${form.neighborhood}, ${form.city} - ${form.state}`;
        const newAddress: Address = { ...form, address: fullAddress };

        const newList = [...savedAddresses, newAddress];
        setSavedAddresses(newList);
        setIsAdding(false);
        setForm({ name: '', zip_code: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '', type: 'home' });

        try {
            await supabase.from('profiles').update({ saved_addresses: newList }).eq('id', profileId);
        } catch (err) {
            console.error("Error saving address:", err);
            alert("Erro ao salvar endereço. Tente novamente.");
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'home': return 'home';
            case 'work': return 'work';
            case 'school': return 'school';
            default: return 'location_on';
        }
    };

    const getDisplayAddress = (addr: Address) => {
        if (addr.address) return addr.address;
        if (addr.street) return `${addr.street}, ${addr.number} - ${addr.city}`;
        return "Endereço desconhecido";
    };

    return (
        <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-100 dark:border-slate-700 h-full">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                        Endereços Favoritos
                    </h2>
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="text-student-primary hover:bg-student-primary/10 p-2 rounded-full transition-colors cursor-pointer"
                    >
                        <span className="material-symbols-outlined">{isAdding ? 'close' : 'add'}</span>
                    </button>
                </div>

                {isAdding && (
                    <div className="mb-4 bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-slate-200 dark:border-slate-700 animate-fade-in flex flex-col gap-3">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase">Apelido do Local</label>
                            <input
                                placeholder="Ex: Casa, Trabalho"
                                className="w-full p-2 rounded border border-slate-300 dark:border-slate-600 dark:bg-slate-800 text-sm"
                                value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">CEP</label>
                                <div className="relative">
                                    <input
                                        placeholder="00000-000"
                                        className="w-full p-2 rounded border border-slate-300 dark:border-slate-600 dark:bg-slate-800 text-sm"
                                        value={form.zip_code}
                                        onChange={handleCepChange}
                                        maxLength={9}
                                    />
                                    {loadingCep && (
                                        <div className="absolute right-2 top-2 animate-spin h-4 w-4 border-2 border-student-primary border-t-transparent rounded-full"></div>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Tipo</label>
                                <select
                                    className="w-full p-2 rounded border border-slate-300 dark:border-slate-600 dark:bg-slate-800 text-sm"
                                    value={form.type}
                                    onChange={e => setForm({ ...form, type: e.target.value as any })}
                                >
                                    <option value="home">Casa</option>
                                    <option value="work">Trabalho</option>
                                    <option value="school">Escola</option>
                                    <option value="other">Outro</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Rua</label>
                                <input
                                    placeholder="Rua..."
                                    className="w-full p-2 rounded border border-slate-300 dark:border-slate-600 dark:bg-slate-800 text-sm bg-gray-50"
                                    value={form.street}
                                    onChange={e => setForm({ ...form, street: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Número</label>
                                <input
                                    placeholder="Nº"
                                    className="w-full p-2 rounded border border-slate-300 dark:border-slate-600 dark:bg-slate-800 text-sm"
                                    value={form.number}
                                    onChange={e => setForm({ ...form, number: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Bairro</label>
                                <input
                                    placeholder="Bairro"
                                    className="w-full p-2 rounded border border-slate-300 dark:border-slate-600 dark:bg-slate-800 text-sm bg-gray-50"
                                    value={form.neighborhood}
                                    onChange={e => setForm({ ...form, neighborhood: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Complemento</label>
                                <input
                                    placeholder="Apto, Bloco..."
                                    className="w-full p-2 rounded border border-slate-300 dark:border-slate-600 dark:bg-slate-800 text-sm"
                                    value={form.complement}
                                    onChange={e => setForm({ ...form, complement: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                            <div className="col-span-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">Cidade</label>
                                <input
                                    placeholder="Cidade"
                                    className="w-full p-2 rounded border border-slate-300 dark:border-slate-600 dark:bg-slate-800 text-sm bg-gray-50"
                                    value={form.city}
                                    readOnly
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">UF</label>
                                <input
                                    placeholder="UF"
                                    className="w-full p-2 rounded border border-slate-300 dark:border-slate-600 dark:bg-slate-800 text-sm bg-gray-50"
                                    value={form.state}
                                    readOnly
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleSaveAddress}
                            className="w-full bg-student-primary text-white p-3 rounded-lg text-sm font-bold hover:bg-blue-600 transition shadow-md mt-2"
                        >
                            Salvar Endereço
                        </button>
                    </div>
                )}

                <div className="flex flex-col gap-4">
                    {savedAddresses.length > 0 ? savedAddresses.map((addr, idx) => (
                        <div key={idx} className="group flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-transparent hover:border-student-primary/30 transition-all cursor-pointer">
                            <div className="flex items-center gap-3">
                                <div className="bg-white dark:bg-slate-700 p-2 rounded-full text-student-primary shadow-sm">
                                    <span className="material-symbols-outlined text-[20px]">
                                        {getIcon(addr.type)}
                                    </span>
                                </div>
                                <div className="overflow-hidden">
                                    <p className="font-medium text-slate-900 dark:text-white text-sm truncate">
                                        {addr.name}
                                    </p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-[150px]" title={getDisplayAddress(addr)}>
                                        {getDisplayAddress(addr)}
                                    </p>
                                </div>
                            </div>
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                <button className="text-slate-500 hover:text-student-primary p-1 cursor-pointer">
                                    <span className="material-symbols-outlined text-[18px]">
                                        edit
                                    </span>
                                </button>
                                <button
                                    className="text-slate-500 hover:text-red-500 p-1 cursor-pointer"
                                    onClick={async (e) => {
                                        e.stopPropagation();
                                        if (confirm("Remover este endereço?")) {
                                            const newList = savedAddresses.filter((_, i) => i !== idx);
                                            setSavedAddresses(newList);
                                            await supabase.from('profiles').update({ saved_addresses: newList }).eq('id', profileId);
                                        }
                                    }}
                                >
                                    <span className="material-symbols-outlined text-[18px]">
                                        delete
                                    </span>
                                </button>
                            </div>
                        </div>
                    )) : (
                        !isAdding && <p className="text-sm text-slate-400 text-center py-4">Nenhum endereço salvo.</p>
                    )}

                    {!isAdding && (
                        <button
                            onClick={() => setIsAdding(true)}
                            className="mt-2 w-full py-2 border border-dashed border-student-primary/40 text-student-primary text-sm font-medium rounded-lg hover:bg-student-primary/5 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                add_location_alt
                            </span>
                            Adicionar novo endereço
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
