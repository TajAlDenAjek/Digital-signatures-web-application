import React from 'react'
import AdminTable from '../../components/CustomAdminTable/AdminTable'
import { documentColumns } from '../../constants/columns.tsx'
import { useGetDocumentsQuery } from '../../features/documents/documentsApiSlice.tsx'
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
                <Form.Item label='Document Name' name={'documentName'} rules={[{ required: mode == 'Edit' }]}>
                    {
                        mode === 'Edit' ?
                            <Input type='text' />
                            : <Typography.Text>{currentData.documentName}</Typography.Text>
                    }
                </Form.Item>
                <Form.Item label='Document Status' name={'documentStatus'} rules={[{ required: mode == 'Edit' }]}>
                    {
                        mode === 'Edit' ?
                            <Input type='text' />
                            : <Typography.Text>{currentData.documentStatus}</Typography.Text>
                    }
                </Form.Item>
                <Form.Item label='Remaining Parties' name={'counter'} rules={[{ required: mode == 'Edit' }]}>
                    {
                        mode === 'Edit' ?
                            <Input type='text' />
                            : <Typography.Text>{currentData.counter}</Typography.Text>
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

const ManageDocuments = () => {
    const {
        data,
        currentData,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetDocumentsQuery({})

    let content = <Empty />
    if (isLoading) {
        content = <AdminTable columns={documentColumns} data={currentData} isLoading={isLoading} tableTitle={"Document"} />
    } else if (isSuccess) {
        content = <AdminTable  columns={documentColumns} data={currentData} tableTitle={"Document"} ModalContent={CustomComponent} actions={['view']} />
    } else if (isError) {
        content = <>{error}</>
    }
    return (
        <>
            {content}
        </>
    )
}

export default ManageDocuments