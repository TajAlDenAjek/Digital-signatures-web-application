import React from 'react'
import AdminTable from '../../components/CustomAdminTable/AdminTable'
import { portalsColumns } from '../../constants/columns.tsx'
import { useGetDocumentsQuery } from '../../features/documents/documentsApiSlice.tsx'
import type { TableProps } from 'antd';
import { Space, Table, Tag } from 'antd';
import { useGetAdminPortalsQuery ,useDeletePortalMutation, useGetUserPortalsQuery, useCreatePortalMutation} from '../../features/realEstatePortals/realEstatPortalsApiSlice.tsx';
import { Spin, Empty, Button } from 'antd'
import {
    Form, message,
    Typography,
    Input,
    Tooltip,
    Image

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
                <Form.Item label='Tabo Image' name={'taboImage'} rules={[{ required: mode == 'Edit' }]}>
                    {
                        <Image src={currentData?.image_frontSide as string} />
                    }
                </Form.Item>
                <Form.Item label='Request Name' name={'reqName'} rules={[{ required: mode == 'Edit' }]}>
                    {
                        mode === 'Edit' ?
                            <Input type='text' />
                            : <Typography.Text>{currentData.reqName}</Typography.Text>
                    }
                </Form.Item>
                <Form.Item label='Message' name={'message'} rules={[{ required: mode == 'Edit' }]}>
                    {
                        mode === 'Edit' ?
                            <Input type='text' />
                            : <Typography.Text>{currentData.message}</Typography.Text>
                    }
                </Form.Item>
                <Form.Item label='Request Status' name={'reqStatus'} rules={[{ required: mode == 'Edit' }]}>
                    {
                        mode === 'Edit' ?
                            <Input type='text' />
                            : <Typography.Text>{currentData.reqStatus}</Typography.Text>
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

const RealEstatePortal = () => {
    const {
        data,
        currentData,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUserPortalsQuery({})
    const [deleteUser, { }] = useDeletePortalMutation()
    const [createPortal , {isCreating} ] = useCreatePortalMutation() ;
    
    const handleDelete = async (id: any) => {
        try {
            await deleteUser(id).unwrap()
            message.success('Portal Request Deleted ')
        } catch (error: any) {
            message.error('Something went wrong')
        }
    }
    let content = <Empty />
    if (isLoading) {
        content = <AdminTable columns={portalsColumns} data={currentData?.data} isLoading={isLoading} tableTitle={"Portal Request"} />
    } else if (isSuccess) {
        content = <AdminTable columns={portalsColumns} data={currentData?.data} tableTitle={"Portal Request"} ModalContent={CustomComponent} actions={['view','delete']} handleDelete={handleDelete} />
    } else if (isError) {
        content = <>{error}</>
    }
    return (
        <>  
            {content}
        </>
    )
}

export default RealEstatePortal