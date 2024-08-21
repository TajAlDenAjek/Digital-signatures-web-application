import type { RouteObject } from "react-router-dom";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import NotFound404Page from "../../pages/systemPages/NotFound404/NotFound404Page";
import DigitalSignature from '../../pages/maindegital/MainDegital.tsx'

export const publicPages:RouteObject[] = [
    {
        path:'/home',
        element:<DigitalSignature/>
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path:'/email',
        children:[
            {
                path:'/verify',
                element:<></>
            },
            {
                path:'/forget-password',
                element:<></>
            }
        ]
    },
];
export const appPages:RouteObject[] = [
    {
        path:'*',
        element:<NotFound404Page/>
    }
]