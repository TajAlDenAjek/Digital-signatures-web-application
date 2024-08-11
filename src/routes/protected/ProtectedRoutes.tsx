import Home from "../../pages/home/Home";
import type { RouteObject } from "react-router-dom";
import Profile from "../../pages/profile/Profile";
import Document from "../../pages/document/Document";
import Users from "../../pages/users/Users";
import DocumentForm from "../../components/DocumentForm/DocumentForm";
import ViewGovermentOfficiers from "../../pages/goverment-officiers/ViewGovermentOfficiers";
import DigitalIdentity from "../../pages/digital-identity/DigitalIdentity";
import ElectronicSignature from "../../pages/electronic-signature/ElectronicSignature";
import Stripe from "../../pages/payment/Stripe";
import Payment from "../../pages/payment/Payment";

export const adminRoutes:RouteObject[] = [
    {
        path:'/admin/document',
        element:<Document></Document>
    },
    {
        path:'/admin/document/:id',
        element:<h1>not implemneted - T1 </h1>
    },
    {
        path:'/admin/users',
        element:<Users type={'user'} ></Users>
    },
    {
        path:'/admin/users/:id',
        element:<h1>not implemneted - T3 </h1> 
    },
    {
        path:'/admin/users/:id/edit',
        element:<h1>not implemented - T4 </h1>
    },
    {
        path:'/admin/goverment-officiers',
        element:<Users type={'goverment-officier'} ></Users>
    },
    {
        path:'/admin/goverment-officiers/create',
        element: <h1> not implemented - T5 </h1>
    },
    {
        path:'/admin/goverment-officiers/:id',
        element:<ViewGovermentOfficiers  />
    },
    {
        path:'/admin/goverment-officiers/:id/edit',
        element:<ViewGovermentOfficiers  /> 
    },
    {
        path: '/',
        element: <Home/>
    },
    
];


export const governmentOfficerRoutes:RouteObject[] = [
    {
        path:'/gov/users',
        element:<Users type={'user'} ></Users>
    },
    {
        path:'/gov/users/:id',
        element:<h1>not implmented - T3 </h1>
    },
    {
        path:'/gov/users/:id/edit',
        element:<h1> not implemented - T4 </h1>
    },
    {
        path:'/gov/document',
        element: <Document />
    },
    {
        path:'/gov/document/:id',
        element: <h1>not implemented - T1 </h1>
    },
    {
        path:'/gov/document/:id/edit',
        element: <h1> not implemented - T2 </h1>
    },
    {
        path: '/',
        element: <Home/>
    },
  
];


export const userRoutes:RouteObject[] = [
    {
        path:'/profile',
        element:<Profile></Profile>
    },
    {
        path:'/document',
        element:<Document></Document>
    },
    {
        path:'/document/:id',
        element:<h1>not implemented - T1 </h1>
    },
    {
        path:'/document/:id/edit',
        element:<h1>not implemented - T2 </h1>
    },
    {
        path:'/document/create',
        element:<DocumentForm></DocumentForm>
    },
    {
        path:'/document/:id/payment',
        element:<Payment></Payment>
    },
    {
        path:'/document/sign',
        element:<h1>not implemneted - T7 </h1>
    },
    {
        path:'/digital-identity/generate',
        element:<DigitalIdentity/>
    },
    {
        path:'/electronic-signature',
        element:<ElectronicSignature></ElectronicSignature>
    },
    {
        path: '/',
        element: <Home/>
    },
];