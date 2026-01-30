
import { getAllUsers } from "@/utils/admin/user-metrics";
import { UsersTable } from "@/components/admin/users/UsersTable";

export default async function AdminUsersPage() {
    const users = await getAllUsers();

    return (
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#f6f7f8] dark:bg-[#101922] p-6">
            <div className="max-w-[1600px] mx-auto w-full flex flex-col gap-6">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white font-display">
                            Usuários
                        </h1>
                        <p className="text-[#92adc9] text-sm">
                            Gerencie todos os usuários registrados na plataforma.
                        </p>
                    </div>
                </div>

                {/* Content */}
                <UsersTable users={users} />
            </div>
        </div>
    );
}
