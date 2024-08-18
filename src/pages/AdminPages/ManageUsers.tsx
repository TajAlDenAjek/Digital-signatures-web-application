import React from 'react'
import AdminTable from '../../components/CustomAdminTable/AdminTable'
import { usersColumn } from '../../constants/columns'
import { useGetUsersQuery } from '../../features/users/usersApiSlice'
import type { TableProps } from 'antd';
import { Space, Table, Tag } from 'antd';
import { Spin, Empty } from 'antd'

const CustomComponent=({
    currentData,
    mode
}:any)=>{
    return (
        <h1>{mode}</h1>
    )
}

const ManageUsers = () => {
    const {
        data,
        currentData,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery({})
    let content = <Empty />
    if (isLoading) {
        content = <AdminTable columns={usersColumn} data={currentData?.data} isLoading={isLoading} tableTitle={"User"} />
    } else if (isSuccess) {
        content = <AdminTable columns={usersColumn} data={currentData?.data} tableTitle={"User"} ModalContent={CustomComponent}/>
    } else if (isError) {
        content = <>{error}</>
    }
    return (
        <>
            {content}
        </>
    )
}

export default ManageUsers