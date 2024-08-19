import React, { useState } from 'react'
import AdminTable from '../../components/CustomAdminTable/AdminTable'
import { portalsColumns } from '../../constants/columns.tsx'
import type { TableProps } from 'antd';
import { Space, Table, Tag } from 'antd';
import { useGetAdminPortalsQuery, useDeletePortalMutation, useGetUserPortalsQuery, useCreatePortalMutation } from '../../features/realEstatePortals/realEstatPortalsApiSlice.tsx';
import { Spin, Empty, Button } from 'antd'
import {
    Form, message,
    Typography,
    Input,
    Tooltip, Modal,
    Image

} from 'antd'
import './styles.scss'
let SERVER_SIDE = import.meta.env.VITE_REACT_API_KEY

import CustomUpload from '../../components/customUpload/CustomUpload.tsx';

const CustomComponent = ({
    currentData,
    mode,
    handleUpdate,
    isUpdating
}: any) => {
    console.log(currentData)
    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        try {
            const data = await handleUpdate({
                 data: {
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
                        <Image src={`${SERVER_SIDE}/${currentData?.taboImage}` as string} width={'400px'} />
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
    const [createContract, { isLoading: isCreating }] = useCreatePortalMutation()
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)
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
        content = <AdminTable columns={portalsColumns} data={currentData?.data} tableTitle={"Portal Request"} ModalContent={CustomComponent} actions={['view']} handleDelete={handleDelete} />
    } else if (isError) {
        content = <>{error}</>
    }
    const handleCreateContract = async (data: any) => {
        try {
            console.log(data)
            await createContract(data).unwrap()
            message.success('Contract status updated Successfuly')
        } catch (error: any) {
            message.error('Something went wrong')
        }
    }
    const [form1] = Form.useForm();

    const onFinish1 = async (values: any) => {
        try {
            await handleCreateContract({
                ...values,
            })
        } catch (error: any) {
            message.error('Something went wrong')
        }
    }
    return (
        <>
            {content}
            <h4 className='create-contract-button' onClick={() => setIsCreateModalOpen(true)}>Create Portal</h4>

            <Modal
                width={600}
                title={`Create portal`}
                open={isCreateModalOpen}
                destroyOnClose
                closable={true}
                onCancel={() => setIsCreateModalOpen(false)}
                onOk={() => setIsCreateModalOpen(false)}
                maskClosable={true}
                footer={
                    <>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                            {/* <Button onClick={handleUpdate} type="primary">Update</Button> */}
                        </div>
                    </>
                }
            >
                <div className='modal-content-container'>
                    <Form
                        form={form1}
                        labelCol={{ span: 24 }}
                        wrapperCol={{ span: 24 }}
                        autoComplete='off'
                        onFinish={onFinish1}
                        onKeyDown={(e) => e.key == "Enter" ? e.preventDefault() : ''}

                    >
                        <Form.Item label='Request Name' name={'reqName'} rules={[{ required: true }]}>
                            <Input type='reqName' />
                        </Form.Item>

                        <CustomUpload form={form1} name={'taboImage'} customValidatoin={'Please upload your property title deed'} />
                        <Button type='primary' htmlType='submit' disabled={isCreating}>{isCreating ? "Creating..." : "Create"}</Button>
                    </Form>

                </div>
            </Modal>
        </>
    )
}

export default RealEstatePortal