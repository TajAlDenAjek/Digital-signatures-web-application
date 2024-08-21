import React from 'react'
import { Layout, Menu, theme } from 'antd'
const { Sider } = Layout
import { useSelector } from "react-redux"
import { Permissions, selectCurrentCert } from '../../features/auth/authSlice';
import { selectCurrentPermission } from '../../features/auth/authSlice';
import { adminPages, governmentOfficerPages,userPages, userPagesOne , userPagesZero} from './SideBarConstants';
import { useNavigate } from 'react-router';
import './style.scss'
const Sidebar = () => {
    const navigate = useNavigate()
    const permission: Permissions | null = useSelector(selectCurrentPermission)
    const cert = useSelector(selectCurrentCert);

    let items = permission === 'admin' ? adminPages : permission === "governmentOfficial" ? governmentOfficerPages :( cert == 2 ? userPages: (cert == 1? userPagesOne : userPagesZero ))
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    return (
        <Sider  

            breakpoint="lg"
            collapsedWidth="0"
            width={320}
            onBreakpoint={(broken) => {
            }}
            onCollapse={(collapsed, type) => {
            }}
            className='side-bar-container'
        >
            <div className="demo-logo-vertical" >Digital Signature</div>
            <Menu
                // selectedKeys={}
                defaultOpenKeys={['0','1','2','3','4']}
                style={{fontWeight:'bold'}}
                theme="dark"
                mode="inline"
                items={items}
                onClick={(e) => {
                    navigate(items[Number(e.key) - 1]?.url)
                }}
            />
        </Sider>
    )
}

export default Sidebar