import { UserAddOutlined, FormOutlined, PicCenterOutlined, UserOutlined, TeamOutlined, DollarOutlined, FileTextOutlined } from '@ant-design/icons';
import React from 'react'

interface SideBarPage {
    key: any,
    icon: any,
    label: any,
    url: any
}

export const adminPages: SideBarPage[] = [
    {
        key: '1',
        icon: React.createElement(UserOutlined),
        label: `Manage Documents`,
        url: '/admin/document'
    },
    {
        key: '2',
        icon: React.createElement(UserOutlined),
        label: `Manage Users`,
        url: '/admin/users'
    },
    {
        key: '3',
        icon: React.createElement(UserOutlined),
        label: `Manage Goverment Officiers`,
        url: '/admin/goverment-officiers'
    }
]

export const governmentOfficerPages: SideBarPage[] = [
    {
        key: '1',
        icon: React.createElement(UserOutlined),
        label: `Manage Documents`,
        url: '/admin/document'
    },
    {
        key: '2',
        icon: React.createElement(UserOutlined),
        label: `Manage Users`,
        url: '/admin/users'
    }
]

export const userPages: SideBarPage[] = [
    {
        key: '1',
        icon: React.createElement(PicCenterOutlined),
        label: `Profile`,
        url: '/profile'
    },
    {
        key: '2',
        icon: React.createElement(PicCenterOutlined),
        label: `Manage Documents`,
        url: '/document'
    },
    {
        key: '3',
        icon: React.createElement(PicCenterOutlined),
        label: `Digital identity`,
        url: '/digital-identity/generate'
    }, 
]
