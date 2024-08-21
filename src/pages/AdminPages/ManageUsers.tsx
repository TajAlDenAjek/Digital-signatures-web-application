import React from 'react'
import AdminTable from '../../components/CustomAdminTable/AdminTable'
import { usersColumn } from '../../constants/columns.tsx'
import { useGetUsersQuery, useDeleteUserMutation,useBlockUserMutation } from '../../features/users/usersApiSlice'
import { XFilled, CloseCircleFilled ,PlayCircleFilled} from '@ant-design/icons'
import type { TableProps } from 'antd';
import { Space, Table, Tag } from 'antd';
import { Spin, Empty, Button } from 'antd'
import {
    Form, message,
    Typography,
    Input,
    Tooltip,

} from 'antd'
const CustomComponent = ({
    currentData,
    mode,
    handleUpdate,
    isUpdating
}: any) => {
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try {
            const data = await handleUpdate({
                id: currentData?.id, data: {
                    ...values,
                }
            }).unwrap()
            message.success('Update Successful')
        } catch (error: any) {
            message.error('Something went wrong')
        }
    }
    return (
        <>
            <Form
                form={form}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                autoComplete='off'
                onFinish={onFinish}
                initialValues={currentData}
                onKeyDown={(e) => e.key == "Enter" ? e.preventDefault() : ''}

            >
                <Form.Item label='First Name' name={'firstName'} rules={[{ required: mode == 'Edit' }]}>
                    {
                        mode === 'Edit' ?
                            <Input type='text' />
                            : <Typography.Text>{currentData.firstName}</Typography.Text>
                    }
                </Form.Item>
                <Form.Item label='Middle Name' name={'middleName'} rules={[{ required: mode == 'Edit' }]}>
                    {
                        mode === 'Edit' ?
                            <Input type='text' />
                            : <Typography.Text>{currentData.middleName}</Typography.Text>
                    }
                </Form.Item>
                <Form.Item label='Last Name' name={'lastName'} rules={[{ required: mode == 'Edit' }]}>
                    {
                        mode === 'Edit' ?
                            <Input type='text' />
                            : <Typography.Text>{currentData.lastName}</Typography.Text>
                    }
                </Form.Item>
                <Form.Item label='Email' name={'email'} rules={[{ required: mode == 'Edit' }]}>
                    {
                        mode === 'Edit' ?
                            <Input type='text' />
                            : <Typography.Text>{currentData.email}</Typography.Text>
                    }
                </Form.Item>
                {
                    mode === 'Edit' &&
                    <Button type='primary' htmlType='submit' disabled={isUpdating}>{isUpdating ? "Updating..." : "Update"}</Button>
                }
            </Form>
        </>
    )
}

const ManageUsers = () => {
    const [deleteUser, { }] = useDeleteUserMutation()
    const [blockUser,{}]=useBlockUserMutation()
    const handleDelete = async (id: any) => {
        try {
            await deleteUser(id).unwrap()
            message.success('User Deleted Successful')
        } catch (error: any) {
            message.error('Something went wrong')
        }
    }
    const handleBlockRecord = async (record: any) => {
        try {
            await blockUser({
                id:record?.id,
                data:{
                    blocked:!record?.blocked
                }
            }).unwrap()
            message.success('User status updated Successfuly')
        } catch (error: any) {
            message.error('Something went wrong')
        }
    }
    const {
        data,
        currentData,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery({})

    const customActions = (record: any) => {
        return (
            <>
                <Tooltip title={`${!record?.blocked ? 'Block' : 'Unblock'} User`}>
                    {
                        !record?.blocked ?
                            <CloseCircleFilled style={{ fontSize: '110%', color: 'red' }} onClick={() => { handleBlockRecord(record) }} />
                            :
                            <PlayCircleFilled style={{ fontSize: '110%', color: 'green' }} onClick={() => { handleBlockRecord(record) }}/>
                        
                    }

                </Tooltip >
            </>
        )
    }

    let content = <Empty />
    if (isLoading) {
        content = <AdminTable columns={usersColumn} data={currentData?.data} isLoading={isLoading} tableTitle={"User"} />
    } else if (isSuccess) {
        content = <AdminTable customActions={customActions} columns={usersColumn} data={currentData?.data} tableTitle={"User"} ModalContent={CustomComponent} actions={['view', 'delete']} isUpdating={true} handleDelete={handleDelete} />
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