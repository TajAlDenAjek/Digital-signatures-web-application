import { Tag,Tooltip } from "antd";
import { render } from "react-dom";
import { ArrowDownOutlined } from '@ant-design/icons'
let SERVER_SIDE = import.meta.env.VITE_REACT_API_KEY 


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

export const ContractsColumn : any[] = [
    {
        title:'Contract Name',
        dataIndex:'contractName',
        key:'contractName'
      },
      {
        title:'Description',
        dataIndex:'description',
        key:'description'
      },
      {
        title:'Contract file',
        dataIndex:'contract',
        key:'contract',
        render: (_: any, record: any)=>{
            return <Tooltip title={"Download file"}>
                <ArrowDownOutlined style={{fontSize:'110%',color:'purple'}} onClick={()=>{
                    window.open(`${SERVER_SIDE}/${record.contract}`)
                }}/>
            </Tooltip>
        }
      },

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