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

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/admin/:id',
    element: <Admin />,
    children: [
      {
        index: true,
        element: <DemoCrud />,
      },
    ],
  },
]);

router.subscribe((state) => {
  console.log(state);
});
export default router;
