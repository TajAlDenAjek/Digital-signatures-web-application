import React from 'react'
import AdminTable from '../../components/CustomAdminTable/AdminTable'
import { adminsColumns } from '../../constants/columns.tsx'
import { useGetAllAdminsQuery } from '../../features/goverment-official/govermentOfficialsApiSlice.tsx'
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

const ManageAdmins = () => {
    const {
        data,
        currentData,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAllAdminsQuery({})

    let content = <Empty />
    if (isLoading) {
        content = <AdminTable columns={adminsColumns} data={currentData?.data} isLoading={isLoading} tableTitle={"Admin"} />
    } else if (isSuccess) {
        content = <AdminTable  columns={adminsColumns} data={currentData?.data} tableTitle={"Admin"} ModalContent={CustomComponent} actions={['view']} />
    } else if (isError) {
        content = <>{error}</>
    }
    return (
        <>
            {content}
        </>
    )
}

export default ManageAdmins