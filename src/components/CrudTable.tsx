/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined, FolderViewOutlined, FundViewOutlined, EyeOutlined } from "@ant-design/icons";
import { Popconfirm, Table, Tooltip } from "antd";
import { Link, useNavigate } from "react-router-dom";
import './styles.scss'
interface params {
    dataSource: any[]
    columns: any[]
    endpoint: string
    route: string,
    actions?: any[]
    defaultActions?: boolean
}


function CrudTable({ dataSource, columns, endpoint, route, actions, defaultActions }: params) {
    const navigate = useNavigate();
    if (!actions || (actions && defaultActions)) {
        if (!actions) {
            actions = [];
        }
        actions = [
            ...actions,
            {
                title:
                    <Tooltip title='view'>
                        <EyeOutlined style={{ fontSize: '150%' }}></EyeOutlined>
                    </Tooltip>
                ,
                handler(record: any) {
                    navigate(`${route}/${record.id}`)
                },
            },
            {
                title: "Delete",
                handler(record: any) {
                    console.log(record);
                    const url = `${endpoint}/${record.id}`;


                },
                render(record: any) {

                    return <Popconfirm
                        title="Delete"
                        description="Are you sure to delete this task?"
                        okText="Yes"
                        cancelText="No"
                        onConfirm={() => this.handler(record)}
                    >
                        <a>
                            <DeleteOutlined></DeleteOutlined>
                        </a>
                    </Popconfirm>

                }
            },
            {
                title: <EditOutlined></EditOutlined>,
                handler(record: any) {
                    navigate(`${route}/${record.id}/edit`)
                },
            },
        ]

    }


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

                                return <a onClick={() => action.handler(record)} > {action.title} </a>
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