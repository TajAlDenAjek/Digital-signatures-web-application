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
import ManageContracts from "../../pages/AdminPages/ManageContracts";
import ManageDocuments from "../../pages/AdminPages/MangeDocuments";
import ManageDigitalCertficatesRequests from "../../pages/AdminPages/ManageDigitalCertficateRequests";
import ManagePortals from "../../pages/AdminPages/ManagePortals";
import GovernmentManagePortals from "../../pages/GovernmenetPages/GovernmentManagePortals";
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
        element: <ManageContracts/>
    },
    {
        path: '/admin/documents',
        element: <ManageDocuments/>
    },
    {
        path: '/admin/digital-certifcates-requests',
        element: <ManageDigitalCertficatesRequests/>
    },
    {
        path: '/admin/portals',
        element: <ManagePortals/>
    },
    {
        path: '/',
        element: <Home />
    },
];


export const governmentOfficerRoutes: RouteObject[] = [
    {
        path: '/gov/portals',
        element: <GovernmentManagePortals/>
    },
    {
        path: '/gov/digital-certificate orderds',
        element: <GovernmentManagePortals/>
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