import React, { useState } from 'react';
import { Space, Table, Tag, Typography,Popconfirm, Tooltip, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, FolderViewOutlined, FundViewOutlined, EyeOutlined } from "@ant-design/icons";

import type { TableProps } from 'antd';
import './styles.scss'

interface AdminTableProps {
    tableTitle?: String
    data?: any
    columns?: any,
    isLoading?: boolean,
    actoins?: Array<string>
}
const AdminTable: React.FC<AdminTableProps | any> = ({
    tableTitle,
    data,
    columns,
    isLoading = false,
    actions = ['view', 'edit', 'delete'],
    handleDelete,
    handleUpdate,
    customActions,
    ModalContent,
    isUpdating
}) => {
    const [currentData, setCurrentData] = useState<any>()
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [mode, setMode] = useState<string>('View')
    const actionsColumn = {
        title: 'Action',
        key: 'action',
        render: (_: any, record: any): any => (
            <Space size="middle">
                {
                    actions.includes('view') &&
                    <Tooltip title='View Record'>
                        <EyeOutlined style={{ fontSize: '110%', color: 'blue' }} onClick={() => {
                            setCurrentData(record)
                            setIsModalOpen(true)
                            setMode('View')
                        }} />
                    </Tooltip>
                }
                {
                    actions.includes('edit') &&
                    <Tooltip title='Edit Record' >
                        <EditOutlined style={{ fontSize: '110%', color: 'green' }} onClick={() => {
                            setCurrentData(record)
                            setIsModalOpen(true)
                            setMode('Edit')
                            // handleEdit()
                        }} />
                    </Tooltip>
                }
                {
                    actions.includes('delete') &&
                    <Popconfirm
                        title="Delete"
                        description="Are you sure to delete this record?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => handleDelete(record.id)}
                    >
                        <Tooltip title='Delete Record'>
                            <DeleteOutlined style={{ fontSize: '110%', color: 'red' }} />
                        </Tooltip>
                    </Popconfirm >
   
                }
                {customActions && customActions(record)}
            </Space >
        ),
    }
    
    return (
        <>
            <div className="crud-table">
                <h2>{`${tableTitle}s Table`}</h2>
                <Table columns={[...columns, actionsColumn]} dataSource={data} loading={isLoading} />
                <Modal
                    width={600}
                    title={`${mode} ${tableTitle}`}
                    open={isModalOpen}
                    destroyOnClose
                    closable={true}
                    onCancel={() => setIsModalOpen(false)}
                    onOk={() => setIsModalOpen(false)}
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
                        {ModalContent && <ModalContent currentData={currentData} mode={mode} handleUpdate={handleUpdate} isUpdating={isUpdating} />}
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default AdminTable