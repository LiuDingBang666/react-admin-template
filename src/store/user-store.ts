/**
 * @name: 名称
 * @description: TODO 用户状态管理
 * @author: mayn
 * @date: 2025/9/24 09:15
 */
import { create } from 'zustand/react';
import { persist } from 'zustand/middleware';
import type { LoginUserInfo } from '@/entity/system/login-user-info.ts';

interface UserStore {
  data: LoginUserInfo;
  setData: (data: LoginUserInfo) => void;
  isLogin: () => boolean;
  getToken: () => string | undefined;
  getName: () => string | undefined;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      data: {} as LoginUserInfo,
      setData: (data) => set(() => ({ data })),
      isLogin: () => {
        return useUserStore.getState().data.token;
      },
      getToken: () => {
        return useUserStore.getState().data.token;
      },
      getName: () => {
        return useUserStore.getState().data.username;
      },
    }),
    {
      name: 'user-store',
    },
  ),
);
