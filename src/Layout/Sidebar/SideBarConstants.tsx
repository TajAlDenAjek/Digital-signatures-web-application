import { 
    UserAddOutlined, 
    FormOutlined, 
    PicCenterOutlined,
    PaperClipOutlined,
     UserOutlined, 
     TeamOutlined, 
     DollarOutlined, 
     FileTextOutlined ,
     SafetyCertificateFilled,
     SignatureOutlined,
     SecurityScanOutlined,
     GroupOutlined,
     
} from '@ant-design/icons';
import React, { Children } from 'react'

interface SideBarPage {
    key: any,
    icon: any,
    label: any,
    url: any
}

export const adminPages: SideBarPage[] = [
    {
        key: '1',
        icon: React.createElement(PaperClipOutlined),
        label: `Manage Documents`,
        url: '/admin/document'
    },
    {
        key: '2',
        icon: React.createElement(UserAddOutlined),
        label: `Manage Users`,
        url: '/admin/users'
    },
    {
        key: '3',
        icon: React.createElement(GroupOutlined),
        label: `Manage Goverment Officiers`,
        url: '/admin/goverment-officiers'
    }
]

export const governmentOfficerPages: SideBarPage[] = [
    {
        key: '1',
        icon: React.createElement(PaperClipOutlined),
        label: `Manage Documents`,
        url: '/gov/document'
    },
    {
        key: '2',
        icon: React.createElement(UserAddOutlined),
        label: `Manage Users`,
        url: '/gov/users'
    }
]

export const userPages: SideBarPage[]|any = [
    {
        key: '1',
        icon: React.createElement(UserOutlined),
        label: `Profile`,
        url: '/profile'
    },
    
    {
        key: '2',
        icon: React.createElement(PaperClipOutlined),
        label: `Manage Documents`,
        url: '/document'
    },
    {
        key: '3',
        icon: React.createElement(SafetyCertificateFilled),
        label: `Digital identity`,
        url: '/digital-identity/generate'
    }, 
    {
        key: '4',
        icon: React.createElement(SignatureOutlined),
        label: `Electonic Signature`,
        url: '/electronic-signature'
    },
    {
        key: '5',
        icon: React.createElement(SecurityScanOutlined),
        label: `Fingerprint`,
        url: '/fingerprint'
    },  
]
