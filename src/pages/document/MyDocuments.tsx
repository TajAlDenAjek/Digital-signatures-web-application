import React from 'react'
import CrudTable from '../../components/CrudTable'
import { useGetMyDocumentsQuery } from '../../features/documents/documentsApiSlice';
import { myDocumentsColumn } from '../../constants/columns';
import { Button, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

const MyDocuments = ()=> {
  const {data: documents  } = useGetMyDocumentsQuery({});
  const navigate = useNavigate();
  return (
    <>
    <Row justify={'end'}>
        <Button
           onClick={()=>{
              navigate('/document/create')
           }}
           style={{backgroundColor:'#00A9FF', margin:'1rem'}}
        >
          Upload & Sign a Document
        </Button>
    </Row>
        
        <CrudTable
            columns={myDocumentsColumn}
            dataSource={documents}
            route={"/document"}
            actions={[]}
            defaultActions={['view','edit','delete']}
        />

    </>
  )
}

export default MyDocuments