import Home from "../../pages/home/Home";
import type { RouteObject } from "react-router-dom";
import Profile from "../../pages/profile/Profile";
import Document from "../../pages/document/Document";
import GovermentOfficiers from "../../pages/goverment-officiers/GovermentOfficiers";
import Users from "../../pages/users/Users";
import DocumentForm from "../../components/DocumentForm/DocumentForm";
import ViewGovermentOfficiers from "../../pages/goverment-officiers/ViewGovermentOfficiers";

export const adminRoutes:RouteObject[] = [

    {
        path: '/',
        element: <Home/>
    },
    {
        path:'/admin/document',
        element:<Document></Document>
    },
    {
        path:'/admin/document/:id',
        element:<></>
    },
    {
        path:'/admin/document/payment',
        element:<></>
    },
    {
        path:'/admin/users',
        element:<Users></Users>
    },
    {
        path:'/admin/users/:id',
        element:<></>
    },
    
];


export const governmentOfficerRoutes:RouteObject[] = [

    {
        path: '/',
        element: <Home/>
    },
    {
        path:'/goverment-officiers',
        element:<GovermentOfficiers></GovermentOfficiers>
    },
    {
        path:'/goverment-officiers/:id',
        element:<ViewGovermentOfficiers disabled={1} ></ViewGovermentOfficiers >
    },
    {
        path:'/goverment-officiers/:id/edit',
        element:<ViewGovermentOfficiers disabled={0} /> 
    },
    {
        path:'/goverment-officiers/users',
        element:<Users></Users>
    },
    {
        path:'/goverment-officiers/users/:id',
        element:<></>
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
        element:<Document></Document>
    },
    {
        path:'/document/create',
        element:<DocumentForm></DocumentForm>
    },
    // {
    //     path:'/document/:id',
    //     element:<></>
    // },
    {
        path:'/document/payment',
        element:<></>
    },
    {
        path:'/document/sign',
        element:<></>
    },
    {
        path:'/digital-identity/generate',
        element:<></>
    },
];