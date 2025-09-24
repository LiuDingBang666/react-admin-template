/**
 * @name: 名称
 * @description: TODO
 * @author: mayn
 * @date: 2025/9/24 09:22
 */
import {createBrowserRouter} from "react-router-dom";
import {lazy} from "react";

const Login = lazy(() => import("@/pages/login.tsx"));
const Admin = lazy(() => import("@/pages/admin.tsx"));
const DemoCrud = lazy(() => import("@/pages/system/demo-crud.tsx"))


export const router = createBrowserRouter([
    {
        path: '/',
        element:<Login/>,
    },
    {
        path: '/admin',
        element: <Admin/>,
        children: [
            {
                index: true,
                element:<DemoCrud/>,
            },
        ],
    }
])