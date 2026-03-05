import { create } from "zustand";
import { persist } from "zustand/middleware";
import { IAdminUser, ADMIN_MOCK_USERS } from "@/mocks/adminUsers.mock";

interface AdminUsersState {
    users: IAdminUser[];
    toggleUserStatus: (id: string) => void;
    deleteUser: (id: string) => void;
}

export const useAdminUsersStore = create<AdminUsersState>()(
    persist(
        (set) => ({
            users: ADMIN_MOCK_USERS,

            toggleUserStatus: (id) =>
                set((state) => ({
                    users: state.users.map((user) => {
                        if (user.id === id) {
                            return {
                                ...user,
                                status: user.status === "active" ? "disabled" : "active"
                            };
                        }
                        return user;
                    }),
                })),

            deleteUser: (id) =>
                set((state) => ({
                    users: state.users.filter((user) => user.id !== id),
                })),
        }),
        {
            name: "admin-users-storage",
        }
    )
);
