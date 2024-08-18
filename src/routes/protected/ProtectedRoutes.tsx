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
import Fingerprint from "../../pages/fingerprint/Fingerprint";
import GovermentOfficiers from "../../pages/goverment-officiers/GovermentOfficiers";
import MyDocuments from "../../pages/document/MyDocuments";
import SingleDocument from "../../pages/document/SingleDocument";
import ManageUsers from "../../pages/AdminPages/ManageUsers";
import ManageAdmins from "../../pages/AdminPages/ManageAdmins";
export const adminRoutes: RouteObject[] = [
    {
        path: '/admin/users',
        element: <ManageUsers />
    },
    {
        path: '/admin/admins',
        element: <ManageAdmins />
    },
    {
        path: '/admin/contracts',
        element: <Document></Document>
    },
    {
        path: '/admin/documents',
        element: <Document></Document>
    },
    {
        path: '/admin/digital-certifcates-requests',
        element: <Document></Document>
    },
    {
        path: '/admin/portals',
        element: <Document></Document>
    },
    {
        path: '/',
        element: <Home />
    },
];


export const governmentOfficerRoutes: RouteObject[] = [
    {
        path: '/gov/users',
        element: <Users type={'user'} ></Users>
    },
    {
        path: '/gov/users/:id',
        element: <h1>not implmented - T3 </h1>
    },
    {
        path: '/gov/users/:id/edit',
        element: <h1> not implemented - T4 </h1>
    },
    {
        path: '/gov/document',
        element: <Document />
    },
    {
        path: '/gov/document/:id',
        element: <h1>not implemented - T1 </h1>
    },
    {
        path: '/gov/document/:id/edit',
        element: <h1> not implemented - T2 </h1>
    },
    {
        path: '/',
        element: <Home />
    },

];


export const userRoutes: RouteObject[] = [
    {
        path: '/profile',
        element: <Profile></Profile>
    },
    {
        path:'/document',
        element:<MyDocuments></MyDocuments>
    },
    {
        path:'/document/:id',
        element:<SingleDocument></SingleDocument>
    },
    {
        path: '/document/:id/edit',
        element: <h1>not implemented - T2 </h1>
    },
    {
        path: '/document/create',
        element: <DocumentForm></DocumentForm>
    },
    {
        path: '/document/:id/payment',
        element: <Payment></Payment>
    },
    {
        path: '/document/sign',
        element: <h1>not implemneted - T7 </h1>
    },
    {
        path: '/digital-identity/generate',
        element: <DigitalIdentity />
    },
    {
        path: '/electronic-signature',
        element: <ElectronicSignature></ElectronicSignature>
    },
    {
        path: '/fingerprint',
        element: <Fingerprint></Fingerprint>
    },
    {
        path: '/',
        element: <Home />
    },
];