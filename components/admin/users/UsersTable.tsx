"use client";

import { useMemo, useState } from "react";
import { UserProfile } from "@/utils/admin/user-metrics";

interface UsersTableProps {
    users: UserProfile[];
}

export function UsersTable({ users = [] }: UsersTableProps) {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("all");

    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            const matchesSearch = (user.full_name || "")
                .toLowerCase()
                .includes(search.toLowerCase()) ||
                (user.email || "")
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesRole = roleFilter === "all" || user.role === roleFilter;

            return matchesSearch && matchesRole;
        });
    }, [users, search, roleFilter]);

    const formatDate = (dateStr: string) => {
        if (!dateStr) return "-";
        return new Date(dateStr).toLocaleDateString('pt-BR');
    };

    return (
        <div className="flex-1 w-full bg-[#111a22] rounded-xl border border-[#324d67] flex flex-col">
            {/* Toolbar */}
            <div className="p-4 border-b border-[#324d67] flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="flex items-center gap-4 w-full sm:max-w-2xl">
                    {/* Search */}
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <span className="material-symbols-outlined text-[#92adc9]">search</span>
                        </div>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2.5 bg-[#233648] border-none rounded-lg text-white placeholder-[#92adc9] focus:ring-2 focus:ring-[#137fec] text-sm"
                            placeholder="Buscar por nome ou email..."
                            type="text"
                        />
                    </div>
                    {/* Filter */}
                    <select
                        value={roleFilter}
                        onChange={(e) => setRoleFilter(e.target.value)}
                        className="bg-[#233648] border-none rounded-lg text-white text-sm py-2.5 pl-3 pr-8 focus:ring-2 focus:ring-[#137fec] cursor-pointer"
                    >
                        <option value="all">Todos os Tipos</option>
                        <option value="student">Alunos</option>
                        <option value="instructor">Instrutores</option>
                        <option value="admin">Admins</option>
                    </select>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-[#324d67] bg-[#1a2632]">
                            <th className="p-4 text-xs font-semibold text-[#92adc9] uppercase tracking-wider">Usuário</th>
                            <th className="p-4 text-xs font-semibold text-[#92adc9] uppercase tracking-wider">Email</th>
                            <th className="p-4 text-xs font-semibold text-[#92adc9] uppercase tracking-wider">Função</th>
                            <th className="p-4 text-xs font-semibold text-[#92adc9] uppercase tracking-wider">Cadastro</th>
                            <th className="p-4 text-xs font-semibold text-[#92adc9] uppercase tracking-wider text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#324d67]">
                        {filteredUsers.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-[#92adc9]">
                                    Nenhum usuário encontrado.
                                </td>
                            </tr>
                        ) : filteredUsers.map((user) => (
                            <tr key={user.id} className="group hover:bg-[#1a2632] transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="size-9 rounded-full bg-cover bg-center bg-[#233648]"
                                            style={{ backgroundImage: `url("${user.avatar_url || 'https://via.placeholder.com/150'}")` }}
                                        />
                                        <p className="text-white text-sm font-medium">
                                            {user.full_name || "Sem Nome"}
                                        </p>
                                    </div>
                                </td>
                                <td className="p-4 text-[#92adc9] text-sm">{user.email}</td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border
                                        ${user.role === 'admin' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' :
                                            user.role === 'instructor' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                                                'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                                        {user.role === 'admin' ? 'Admin' :
                                            user.role === 'instructor' ? 'Instrutor' : 'Aluno'}
                                    </span>
                                    {user.role === 'instructor' && (
                                        <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border
                                            ${user.status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                                user.status === 'pending_docs' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                                    'bg-slate-500/10 text-slate-400 border-slate-500/20'}`}>
                                            {user.status === 'active' ? 'Aprovado' :
                                                user.status === 'pending_docs' ? 'Pendente' : user.status}
                                        </span>
                                    )}
                                </td>
                                <td className="p-4 text-[#92adc9] text-sm">{formatDate(user.created_at)}</td>
                                <td className="p-4 text-right">
                                    <button className="text-[#92adc9] hover:text-white transition-colors">
                                        <span className="material-symbols-outlined">more_vert</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#324d67] flex justify-between items-center text-sm text-[#92adc9]">
                <span>Total: {filteredUsers.length} usuários</span>
            </div>
        </div>
    );
}
