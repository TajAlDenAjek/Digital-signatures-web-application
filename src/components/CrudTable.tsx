/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined, FolderViewOutlined, FundViewOutlined, EyeOutlined } from "@ant-design/icons";
import { Popconfirm, Table, Tooltip } from "antd";
import { Link, useNavigate } from "react-router-dom";
import './styles.scss'
interface params {
    dataSource: any[]
    actions?: any[]
    columns: any[]
    endpoint?: string
    route?: string
    mutations?: any
    defaultActions?: any[]
}


function CrudTable({ 
    dataSource, 
    columns, 
    endpoint, 
    route, 
    mutations ,
    defaultActions = [], 
    actions = []  }: params) {
    
    const navigate = useNavigate();
    [
          
            {
                title:'view',
                icon:
                    <Tooltip title='View Record'>
                        <EyeOutlined style={{ fontSize: '150%' }}></EyeOutlined>
                    </Tooltip>
                ,
                handler(record: any) {
                    navigate(`${route}/${record.id}`)
                },
            },
            {
                title:'delete',
                icon: <Tooltip title='Delete record'>
                    <DeleteOutlined style={{ fontSize: '150%', color: 'red' }} />
                </Tooltip>,
                handler(record: any) {
                    console.log(record);
                    const url = `${endpoint}/${record.id}`;
                    mutations?.delete(record.id);

                },
                render(record: any) {

                    return <Popconfirm
                        title="Delete"
                        description="Are you sure to delete this task?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => this.handler(record)}
                    >
                        <Tooltip title='Delete Record'>
                            <DeleteOutlined style={{ fontSize: '150%', color: 'red' }} />
                        </Tooltip>
                    </Popconfirm >

                }
            },
            {
                title:'edit',
                icon:
                    <Tooltip title='Edit Record'>
                        <EditOutlined style={{ fontSize: '150%', color: 'green' }} />
                    </Tooltip>,
                handler(record: any) {
                    navigate(`${route}/${record.id}/edit`)
                },
            },

            
    ].map((action:any)=>{
        let override = 0;
        actions?.map((overrideAction:any)=>{
            if(overrideAction?.title == action?.title ) {
                override = 1;
            }
        })
        // console.log(action.title , override);
        if(override){
            return ;
        }
        let showDefaultAction = 0 ; 
        defaultActions?.map((defaultAction:any)=>{
            if(defaultAction == action?.title ){
                showDefaultAction= 1;
            }
        })
        if(showDefaultAction){
            actions = [...actions , action] ;
        }
  
    }) 

    


    const actionsColumn: any[] = [

        {
            title: 'Actions',
            fixed: 'right',
            width: 200,
            key: 'action',
            render: (_: any, record: any) => {

                return <div className="table-actions">
                    {
                        actions?.map((action: any) => {
                            if (action?.render) {
                                return action.render(record);
                            }
                            else {

                                return <a onClick={() => action?.handler(record)} > {action?.icon} </a>
                            }
                        })
                    }


                </div>
            }
        }

    ]

    columns = [...columns, ...actionsColumn]

    return <>
        <div className="crud-table">
            <Table
                dataSource={dataSource}
                columns={columns}
            >

            </Table>
        </div>
    </>
}


export default CrudTable;