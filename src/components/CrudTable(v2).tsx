/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined, FolderViewOutlined, FundViewOutlined } from "@ant-design/icons";
import { Popconfirm, Table } from "antd";
import { Link, useNavigate } from "react-router-dom";
interface params {
    dataSource: any[]
    columns: any[]
    actions?: any[]
    endpoint?: string
    route?: string
    mutations?: any
    defaultActions?: any[]

}

/*
    mutations 
    ['delete' , 'view' , 'update'  ]

*/



function CrudTable({ 
    dataSource, 
    columns, 
    endpoint, 
    route, 
    mutations ,
    defaultActions = [], 
    actions = []  }: params) {


    const navigate = useNavigate() ;
    [
        {
            title:'view',
            icon: <FolderViewOutlined></FolderViewOutlined> ,
            handler(record:any) {
                navigate(`${route}/${record.id}`)
            },
        },
        {
            title:'delete',
            icon :  <DeleteOutlined></DeleteOutlined> ,
            handler (record:any)  {        
                console.log('rec',record);
                mutations.delete(record.id);
            },
            render(record:any){
                console.log('render');
                return <Popconfirm
                        title="Delete"
                        description="Are you sure to delete this exercise?"
                        okText="Yes"
                        cancelText="No"
                        onCancel={()=>{console.log('no')}}
                        onConfirm={()=>{
                            console.log('in')
                            this.handler(record)
                        }}
                    >
                        <a>
                            <DeleteOutlined></DeleteOutlined>
                        </a>
                    </Popconfirm>
            }
        },
        {
            title:'update',
            icon: <EditOutlined></EditOutlined> ,
            handler(record:any) {
                console.log('no',record);
                // navigate(`${route}/${record.id}/edit`)
            },
        },
    ].map((action:any)=>{
        let override = 0;
        actions?.map((overrideAction:any)=>{
            if(overrideAction.title == action.title ) {
                override = 1;
            }
        })
        if(override){
            return ;
        }
        let showDefaultAction = 0 ; 
        defaultActions?.map((defaultAction:any)=>{
            if(defaultAction == action.title ){
                showDefaultAction= 1;
            }
        })
        if(showDefaultAction)
            actions = [...actions , action] ;
  
    }) 


    const actionsColumn: any[] = [

        {
            title: 'Actions',
            fixed: 'right',
            width: 200,
            key: 'action',
            render: ( _: any, record : any ) => {

                return <>
                    {
                        actions?.map((action: any) => {                            
                            if (action?.render) {
                                return action.render(record);
                            }
                            else {
                                
                                return <a onClick={() => action.handler(record)} > {action.icon} </a>
                            }
                        })
                    }


                </>
            }
        }

    ]












    columns = [...columns, ...actionsColumn]


















    return <>
        <div>
            <Table
                dataSource={dataSource}
                columns={columns}
            >

            </Table>
        </div>
    </>
}


export default CrudTable;


/*
     const actions = [
    {
      title:'start',
      icon:<PlayCircleFilled> </PlayCircleFilled>,
      async handler(record:any){
        // send request (update)
        let data = {course_id: record.id} ; 
        data = convertToFormData(data) ;
        let res = await updateProfile(data).unwrap() ;
        navigate(`${route}/${record.id}/days`)
      }
    },
    {
      title:'view',
      icon:<FolderViewOutlined></FolderViewOutlined>,
      handler(record:any){
        navigate(`${route}/${record.id}/days`)
      }
    },
    {
      title:'update',
      icon:<EditOutlined></EditOutlined>,
      handler(record:any){
        setOpenModal(1);
        setModalAction('edit')
        form.setFieldsValue(record)
        setNewModalData(record);
      }
    }
  ];

    
    let mutations  = {
      delete:async (id:string)=>{
        try{
          let res = await deleteCourse(id).unwrap() ; 
        }
        catch(err){
          showErrors(err);
        }
        
      },
      update: async (data:any)=>{
        try{
          let auth = JSON.parse(localStorage.getItem('auth'));
          console.log(newModalData);
          auth = `Bearer ` + auth?.access_token ;
          let res = await fetch(getBackURL()+'/website/courses/'+newModalData.id, {
            method:'PUT',
            body:data ,
            headers:{
              'Authorization':auth 
            }
          })
          dispatch(apiSlice.util.resetApiState());
        }
        catch(err){
          showErrors(err);
        }
      },
      create: async (data:any)=>{
        let auth = JSON.parse(localStorage.getItem('auth'));
        auth =`Bearer `+ auth?.access_token ;
        let res = await fetch(getBackURL()+ '/website/courses', {
          method:'POST',
          body:data ,
          headers:{
            'Authorization':auth 
          }
        })
        dispatch(apiSlice.util.resetApiState());
      }
    }
    <CrudTable
        columns={coursesColumns}
        dataSource={courses}
        route={route}
        actions={actions}
        defaultActions={['delete','update','view']}
        mutations={mutations}
      ></CrudTable>



*/