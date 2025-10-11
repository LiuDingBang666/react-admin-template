/**
 * @name: 名称
 * @description: TODO
 * @author: mayn
 * @date: 2025/9/24 09:22
 */
import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';

const Login = lazy(() => import('@/pages/Login.tsx'));
const Admin = lazy(() => import('@/pages/Admin.tsx'));
const DemoCrud = lazy(() => import('@/pages/system/login-log/SysLoginLog.tsx'));
// 新增静态页面路由
const PersonalInfo = lazy(() => import('@/pages/profile/PersonalInfo.tsx'));
const SystemSettings = lazy(() => import('@/pages/settings/SystemSettings.tsx'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <Admin />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/admin',
    element: <Admin />,
    children: [
      {
        index: true,
        element: <DemoCrud />,
      },
      // 个人信息静态路由
      {
        path: 'profile',
        element: <PersonalInfo />,
      },
      // 系统设置静态路由
      {
        path: 'settings',
        element: <SystemSettings />,
      },
    ],
  },
]);
router.subscribe((state) => {
  console.log(state);
});
export default router;
