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
  reset: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      data: {} as LoginUserInfo,
      setData: (data) => set(() => ({ data })),
      isLogin: () => !!get().data.token,
      getToken: () => {
        return get().data.token;
      },
      getName: () => {
        return get().data.username;
      },
      reset: () => set(() => ({ data: {} as LoginUserInfo })),
    }),
    {
      name: 'user-store',
    },
  ),
);
