import { Tag, Tooltip } from "antd";
import { render } from "react-dom";
import { ArrowDownOutlined } from '@ant-design/icons'
let SERVER_SIDE = import.meta.env.VITE_REACT_API_KEY


export const testColumns: any[] = [
    {
        title: 'name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'email',
        dataIndex: 'email',
        key: 'email'
    }
];
export const portalsColumns: any[] = [
    {
        title: 'Request Name',
        dataIndex: 'reqName',
        key: 'reqName'
    },
    {
        title: 'Message',
        dataIndex: 'message',
        key: 'message'
    },
    {
        title: 'Request Status',
        dataIndex: 'reqStatus',
        key: 'reqStatus',
        render: (_: any, record: any) => {
            return <Tag color={
                record?.reqStatus==='approved' ?
                 'green' 
                 :
                 record?.reqStatus==='rejected' ?
                 'red'
                 : 
                 record?.reqStatus==='pending' ?'volcano':'cyan'
            }>
                {record?.reqStatus}</Tag>
        }
    },
];
export const digitalCertificatesOrdersColumns: any[] = [
    {
        title: 'Full Name',
        dataIndex: 'fullName',
        key: 'fullName'
    },
    {
        title: 'National Number',
        dataIndex: 'nationalNumber',
        key: 'nationalNumber'
    },
    {
        title: 'Request Status',
        dataIndex: 'reqStatus',
        key: 'reqStatus',
        render: (_: any, record: any) => {
            return <Tag color={
                record?.reqStatus==='approved' ?
                 'green' 
                 :
                 record?.reqStatus==='rejected' ?
                 'red'
                 : 
                 record?.reqStatus==='pending' ?'volcano':'cyan'
            }>
                {record?.reqStatus}</Tag>
        }
    },
];


export const ContractsColumn: any[] = [
    {
        title: 'Contract Name',
        dataIndex: 'contractName',
        key: 'contractName'
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description'
    },
    {
        title: 'Contract file',
        dataIndex: 'contract',
        key: 'contract',
        render: (_: any, record: any) => {
            return <Tooltip title={"Download file"}>
                <ArrowDownOutlined style={{ fontSize: '110%', color: 'purple' }} onClick={() => {
                    window.open(`${SERVER_SIDE}/${record.contract}`)
                }} />
            </Tooltip>
        }
    },

];

export const usersColumn: any[] = [
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
        filterSearch: true,
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
        filterSearch: true,
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        filterSearch: true,
    },
    {
        title: 'Status',
        dataIndex: 'blocked',
        key: 'blocked',
        filterSearch: true,
        render: (_: any, record: any) => {
            return <Tag color={record?.blocked ? 'red' : 'green'}>{record?.blocked ? 'Blocked' : 'UnBlocked'}</Tag>
        }
    },
];


export const adminsColumns: any[] = [
    {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName',
        filterSearch: true,
    },
    {
        title: 'Last Name',
        dataIndex: 'lastName',
        key: 'lastName',
        filterSearch: true,

    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        filterSearch: true,
        render: (_: any, record: any) => {
            return <Tag color={record?.role === 'admin' ? 'orange' : 'green'}>{record?.role === 'admin' ? 'Admin' : 'Government Official'}</Tag>
        }
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        filterSearch: true,
    }
];


export const documentColumns: any[] = [
    {
        title: 'Document Name',
        dataIndex: 'documentName',
        key: 'documentName'
    },
    {
        title: 'Document Status',
        dataIndex: 'documentStatus',
        key: 'documentStatus',
        render: (_: any, record: any) => {
            return <Tag color={record?.documentStatus === 'processing' ? 'orange' : (record?.documentStatus === 'rejected' ? 'red' : 'green')}>{record?.documentStatus}</Tag>
        }
    },
    {
        title: 'Counter',
        dataIndex: 'counter',
        key: 'counter'
    },
    {
        title: 'Document file',
        dataIndex: 'document',
        key: 'document',
        render: (_: any, record: any) => {
            return <Tooltip title={"Download file"}>
                <ArrowDownOutlined style={{ fontSize: '110%', color: 'purple' }} onClick={() => {
                    window.open(`${SERVER_SIDE}/${record.document}`)
                }} />
            </Tooltip>
        }
    },

];

export const myDocumentsColumn = [
    {
        title: 'Document Name',
        dataIndex: 'documentName',
        key: 'documentName'
    },
    {
        title: 'Document Status',
        dataIndex: 'documentStatus',
        key: 'documentStatus'
    },
    {
        title: 'Counter',
        dataIndex: 'counter',
        key: 'counter'
    },
    {
        title: 'Signed',
        render: item => String(item?.VariousParties.isSigned)
    }
]

export const variousPartiesColumns = [
    {
        title:'Title',
        render: item=>  item?.User?.email 
    },
    {
        title:'Signed',
        render: item => String(item?.isSigned)
    }
]