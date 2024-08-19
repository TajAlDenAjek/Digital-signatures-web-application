import React,{useState} from 'react'
import AdminTable from '../../components/CustomAdminTable/AdminTable'
import { portalsColumns } from '../../constants/columns.tsx'
import { useGetDocumentsQuery } from '../../features/documents/documentsApiSlice.tsx'
import type { TableProps } from 'antd';
import { Space, Table, Tag } from 'antd';
import { useGetAdminPortalsQuery ,useDeletePortalMutation,useAdminUpdatePortaMutation} from '../../features/realEstatePortals/realEstatPortalsApiSlice.tsx';
import { Spin, Empty, Button } from 'antd'
import {
    Form, message,
    Typography,
    Input,
    Tooltip,
    Image

} from 'antd'
import { useUpdateStatusMutation } from '../../features/digitalIdentity/digitalIdentityApiSlice.tsx';
let SERVER_SIDE = import.meta.env.VITE_REACT_API_KEY

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
                // 'reqName', data?.reqName)
                // BodyFormData.append('message'
                id: currentData?.id, data: {
                    reqStatus:currentData?.reqStatus,
                    message:values?.message
                }
            }).unwrap()
            message.success('Update Successful')
        } catch (error: any) {
            // message.error('Something went wrong')
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
                <Form.Item label='Tabo Image' name={'taboImage'} rules={[{ required: false}]}>
                    {
                        <Image src={`${SERVER_SIDE}/${currentData?.taboImage}` as string} width={'400px'} />
                    }
                </Form.Item>
                <Form.Item label='Request Name' name={'reqName'} rules={[{ required: false}]}>
                    {
                        // mode === 'Edit' ?
                        //     <Input type='text' />
                         <Typography.Text>{currentData.reqName}</Typography.Text>
                    }
                </Form.Item>
                <Form.Item label='Message' name={'message'} rules={[{ required: mode == 'Edit' }]}>
                    {
                        mode === 'Edit' ?
                            <Input type='text' />
                            : <Typography.Text>{currentData.message}</Typography.Text>
                    }
                </Form.Item>
                <Form.Item label='Request Status' name={'reqStatus'} rules={[{ required: false}]}>
                    {
                      
                    <Typography.Text>{currentData.reqStatus}</Typography.Text>
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

const ManagePortals = () => {
    const {
        data,
        currentData,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetAdminPortalsQuery({})
    const [deleteUser, { }] = useDeletePortalMutation()
    const [updatePortal, { isLoading: isUpdating }] = useAdminUpdatePortaMutation()
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
    const handleUpdate = async (data: any) => {
        try {
            await updatePortal(data).unwrap()
            message.success('Portal Request Updated ')
        } catch (error: any) {
            message.error('Something went wrong')
        }
    }
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
        content = <AdminTable columns={portalsColumns} data={currentData?.data} tableTitle={"Portal Request"} ModalContent={CustomComponent} actions={['view','delete','edit']} handleDelete={handleDelete} handleUpdate={handleUpdate} isUpdating={isUpdating}/>
    } else if (isError) {
        content = <>{error}</>
    }
    return (
        <>  
            {content}
        </>
    )
}

export default ManagePortals