import React from 'react'
import AdminTable from '../../components/CustomAdminTable/AdminTable'
import { digitalCertificatesOrdersColumns } from '../../constants/columns.tsx'
import { useGetDocumentsQuery } from '../../features/documents/documentsApiSlice.tsx'
import type { TableProps } from 'antd';
import { Space, Table, Tag } from 'antd';
import { useGetDigitalCertificatesOrdersQuery, useUpdateStatusMutation } from '../../features/digitalIdentity/digitalIdentityApiSlice.tsx';
import { Spin, Empty, Button } from 'antd'
import {
    Form, message,
    Typography,
    Input,
    Tooltip,
    Image

} from 'antd'

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
                id: currentData?.id, data: {
                    ...values,
                }
            }).unwrap()
            message.success('Update Successful')
        } catch (error: any) {
            message.error('Something went wrong')
        }
    }
    console.log('front image ', `${SERVER_SIDE}/${currentData?.image_frontSide}`)
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
                <Form.Item label='Image FrontSide' name={'image_frontSide'} rules={[{ required: mode == 'Edit' }]}>
                    <Image src={`${SERVER_SIDE}/${currentData?.image_frontSide}`} width={'400px'} />
                </Form.Item>
                <Form.Item label='Image BackSide' name={'image_backSide'} rules={[{ required: mode == 'Edit' }]}>
                    {
                        <Image src={`${SERVER_SIDE}/${currentData?.image_backSide}` as string} width={'400px'} />
                    }
                </Form.Item>
                <Form.Item label='Full Name' name={'fullName'} rules={[{ required: mode == 'Edit' }]}>
                    {
                        mode === 'Edit' ?
                            <Input type='text' />
                            : <Typography.Text>{currentData.fullName}</Typography.Text>
                    }
                </Form.Item>
                <Form.Item label='National Number' name={'nationalNumber'} rules={[{ required: mode == 'Edit' }]}>
                    {
                        mode === 'Edit' ?
                            <Input type='text' />
                            : <Typography.Text>{currentData.documentStatus}</Typography.Text>
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

const ManageDigitalCertficatesRequests = () => {
    const {
        data,
        currentData,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetDigitalCertificatesOrdersQuery({})
    const [updateStatus, { }] = useUpdateStatusMutation({})
    const handleUpdateStatus = async (newStatus: any, record: any) => {
        try {
            const data = await updateStatus({
                id: record?.id, data: {
                    status: newStatus
                }
            }).unwrap()
            message.success('Update Successful')
        } catch (error: any) {
            message.error('Something went wrong')
        }
    }
    const customActions = (record: any) => {
        return (
            <>
                {
                    record?.reqStatus != 'approved' &&
                    <Tooltip title={`Approve`}>

                        <Typography.Text onClick={() => {
                            handleUpdateStatus('approved', record)
                        }}>Approve</Typography.Text>
                    </Tooltip>
                }
                {
                    record?.reqStatus != 'processing' &&

                    <Tooltip title={`Start processing`}>
                        <Typography.Text onClick={() => {
                            handleUpdateStatus('processing', record)
                        }}>Process</Typography.Text>
                    </Tooltip>
                }
                {
                    record?.reqStatus != 'pending' &&
                    <Tooltip title={`Change to pending`}>

                        <Typography.Text onClick={() => {
                            handleUpdateStatus('pending', record)
                        }}>Pending</Typography.Text>
                    </Tooltip>
                }
                {
                    record?.reqStatus != 'rejected' &&
                    <Tooltip title={`Change to rejected`}>

                        <Typography.Text onClick={() => {
                            handleUpdateStatus('rejected', record)
                        }}>Reject</Typography.Text>
                    </Tooltip>
                }
            </>
        )
    }
    let content = <Empty />
    if (isLoading) {
        content = <AdminTable columns={digitalCertificatesOrdersColumns} data={currentData} isLoading={isLoading} tableTitle={"Digital Certificate Request"} />
    } else if (isSuccess) {
        content = <AdminTable customActions={customActions} columns={digitalCertificatesOrdersColumns} data={currentData} tableTitle={"Digital Certificate Request"} ModalContent={CustomComponent} actions={['view']} />
    } else if (isError) {
        content = <>{error}</>
    }
    return (
        <>
            {content}
        </>
    )
}

export default ManageDigitalCertficatesRequests