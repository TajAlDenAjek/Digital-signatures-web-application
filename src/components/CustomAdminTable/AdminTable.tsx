import React, { useState } from 'react';
import { Space, Table, Tag, Typography, Tooltip ,Modal} from 'antd';
import { DeleteOutlined, EditOutlined, FolderViewOutlined, FundViewOutlined, EyeOutlined } from "@ant-design/icons";

import type { TableProps } from 'antd';
import './style.scss'

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
    handleEdit,
    customActions,ModalContent
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
                        <EyeOutlined style={{ fontSize: '150%' }} onClick={() => {
                            setCurrentData(record)
                            setIsModalOpen(true)
                            setMode('View')
                        }} />
                    </Tooltip>
                }
                {
                    actions.includes('edit') &&
                    <Tooltip title='Edit Record' >
                        <EditOutlined style={{ fontSize: '150%', color: 'green' }} onClick={() => {
                            setCurrentData(record)
                            setIsModalOpen(true)
                            setMode('Edit')
                            // handleEdit()
                        }} />
                    </Tooltip>
                }
                {
                    actions.includes('delete') &&
                    <Tooltip title='Delete record'>
                        <DeleteOutlined style={{ fontSize: '150%', color: 'red' }} onClick={() => {
                            // setMode('delete')
                            handleDelete(record.id);
                        }} />
                    </Tooltip>
                }
                {customActions && customActions(record)}
            </Space >
        ),
    }
    return (
        <>
            <div className="table-container">
                <h3>{`${tableTitle}s Table`}</h3>
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
                    {<ModalContent currentData={currentData} mode={mode}/>}
                </Modal>
            </div>
        </>
    )
}

export default AdminTable