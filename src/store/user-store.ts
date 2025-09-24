/**
 * @name: 名称
 * @description: TODO
 * @author: mayn
 * @date: 2025/9/24 09:15
 */
import {create} from "zustand/react";
import {persist} from "zustand/middleware";

interface UserStore {
    name: string,
    setName: (name: string) => void
}

export const useUserStore = create<UserStore>()(
    persist((set) => ({
        name: '',
        setName: (name) => set(() => ({name})),
    }), {
        name: "user-store",
    })
)