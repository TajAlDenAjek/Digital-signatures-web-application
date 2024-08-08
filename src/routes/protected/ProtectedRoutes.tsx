import Home from "../../pages/home/Home";
import type { RouteObject } from "react-router-dom";
import Profile from "../../pages/profile/Profile";

export const adminRoutes:RouteObject[] = [

    {
        path: '/',
        element: <Home/>
    },
    {
        path:'/goverment-officiers',
        children:[
            {
                path:'/',
                element:<></>
            },
            {
                path:'/:id',
                element:<></>
            }
        ]

    }

];


export const governmentOfficerRoutes:RouteObject[] = [

    {
        path: '/',
        element: <Home/>
    },
    {
        path:'/admin',
        children:[
            {
                path:'/document',
                children:[
                    {
                        path:'/',
                        element:<></>
                    },
                    {
                        path:'/:id',
                        element:<></>
                    },
                    {
                        path:'/payment',
                        element:<></>
                    }
                ]
            },            
        ]
    },
    {
        path:'/users',
        children:[
            {
                path:'/',
                element:<></>
            },
            {
                path:'/:id',
                element:<></>
            }
        ]
    }
];


export const userRoutes:RouteObject[] = [
    {
        path: '/',
        element: <Home/>
    },
    {
        path:'/profile',
        element:<Profile></Profile>
    },
    {
        path:'/document',
        children:[
            {
                path:'/',
                element:<></>
            },
            {
                path:'/:id',
                element:<></>
            },
            {
                path:'/payment',
                element:<></>
            },
            {
                path:'/sign',
                element:<></>
            }
        ]
    },
    {
        path:'/digital-identity/generate',
        element:<></>
    },
];