import { Tag } from "antd";

export const testColumns : any[] = [
    {
        title:'name',
        dataIndex:'name',
        key:'name'
      },
      {
        title:'email',
        dataIndex:'email',
        key:'email'
      }
];


export const usersColumn : any[] = [
    {
        title:'First Name',
        dataIndex:'firstName',
        key:'firstName',
        filterSearch: true,
    },
    {
        title:'Last Name',
        dataIndex:'lastName',
        key:'lastName',
        filterSearch: true,
    },
    {
        title:'Email',
        dataIndex:'email',
        key:'email',
        filterSearch: true,
    },
    {
        title:'Status',
        dataIndex:'blocked',
        key:'blocked',
        filterSearch: true,
        render: (_: any, record: any)=>{
            return <Tag color={record?.blocked ? 'red' : 'green'}>{record?.blocked ? 'Blocked' : 'UnBlocked'}</Tag>
        }
    },
];


export const adminsColumns : any[] = [
    {
        title:'First Name',
        dataIndex:'firstName',
        key:'firstName',
        filterSearch: true,
    },
    {
        title:'Last Name',
        dataIndex:'lastName',
        key:'lastName',
        filterSearch: true,
        
    },
    {
        title:'Role',
        dataIndex:'role',
        key:'role',
        filterSearch: true,
        render: (_: any, record: any)=>{
            return <Tag color={record?.role==='admin' ? 'orange' : 'green'}>{record?.role==='admin' ? 'Admin' : 'Government Official'}</Tag>
        }
    },
    {
        title:'Email',
        dataIndex:'email',
        key:'email',
        filterSearch: true,
    }
];


export const documentColumns : any[]= [
    {
        title:'Document Name',
        dataIndex:'documentName',
        key:'documentName'
    },
    {
        title:'Document Status',
        dataIndex:'documentStatus',
        key:'documentStatus'
    },
    {
        title:'Counter',
        dataIndex:'counter',
        key:'counter'
    },
];

export const myDocumentsColumn = [
    {
        title:'Document Name',
        dataIndex:'documentName',
        key:'documentName'
    },
    {
        title:'Document Status',
        dataIndex:'documentStatus',
        key:'documentStatus'
    },
    {
        title:'Counter',
        dataIndex:'counter',
        key:'counter'
    },
    {
        title:'Signed',
        render : item  => String(item?.VariousParties.isSigned)
    }
]