import React, { useState } from 'react'
import AdminTable from '../../components/CustomAdminTable/AdminTable'
import { ContractsColumn } from '../../constants/columns.tsx'
import { useGetContractsQuery, useDeleteContractMutation, useCreateContractMutation } from '../../features/contracts/contractsApiSlice.tsx'
import { XFilled, CloseCircleFilled, PlayCircleFilled } from '@ant-design/icons'
import type { TableProps } from 'antd';
import { Space, Table, Tag, Modal, Upload } from 'antd';
import { Spin, Empty, Button } from 'antd'
import CustomUpload from '../../components/customUpload/CustomUpload.tsx'

// import './styles.scss'
import './styles.scss'
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
                    contract: values?.contract?.file?.originFileObj
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
                <Form.Item label='Contract Name' name={'contractName'} rules={[{ required: mode == 'Edit' }]}>
                    {
                        mode === 'Edit' ?
                            <Input type='text' />
                            : <Typography.Text>{currentData.contractName}</Typography.Text>
                    }
                </Form.Item>
                <Form.Item label='Description' name={'description'} rules={[{ required: mode == 'Edit' }]}>
                    {
                        mode === 'Edit' ?
                            <Input type='text' />
                            : <Typography.Text>{currentData.description}</Typography.Text>
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

const ManageContracts = () => {
    const [deleteContract, { }] = useDeleteContractMutation()
    const [createContract, { isLoading: isCreating }] = useCreateContractMutation()
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false)

    const handleDelete = async (id: any) => {
        try {
            await deleteContract(id).unwrap()
            message.success('Contract Deleted Successful')
        } catch (error: any) {
            message.error('Something went wrong')
        }
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
    const {
        data,
        currentData,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetContractsQuery({})

    let content = <Empty />
    if (isLoading) {
        content = <AdminTable columns={ContractsColumn} data={currentData?.data} isLoading={isLoading} tableTitle={"Contract"} />
    } else if (isSuccess) {
        content = <AdminTable columns={ContractsColumn} data={currentData?.data} tableTitle={"Contract"} ModalContent={CustomComponent} actions={['view', 'delete']} isUpdating={true} handleDelete={handleDelete} />
    } else if (isError) {
        content = <>{error}</>
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
            <h4 className='create-contract-button' onClick={() => setIsCreateModalOpen(true)}>Add Contract</h4>

            <Modal
                width={600}
                title={`Create Contract`}
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
                        <Form.Item label='Contract Name' name={'contractName'} rules={[{ required: true }]}>

                            <Input type='text' />

                        </Form.Item>
                        <Form.Item label='Description' name={'description'} rules={[{ required: true }]}>

                            <Input type='text' />
                        </Form.Item>
                        <CustomUpload form={form1} isPdfFile={true} name={'contract'} customValidatoin={'Please upload your contract'} />
                        <Button type='primary' htmlType='submit' disabled={isCreating}>{isCreating ? "Creating..." : "Create"}</Button>
                    </Form>

                </div>
            </Modal>
        </>
    )
}

export default ManageContracts