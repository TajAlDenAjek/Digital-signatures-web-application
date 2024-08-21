import React, { useState } from 'react'
import { useGetDocumentByIdQuery, useSignDocumentMutation } from '../../features/documents/documentsApiSlice'
import { useLocation, useParams } from 'react-router-dom';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Row, Tag, Typography } from 'antd';
import CrudTable from '../../components/CrudTable';
import { variousPartiesColumns } from '../../constants/columns';
import { useSelector } from 'react-redux';
import { selectCurrentId } from '../../features/auth/authSlice';
import { getBase64, getPrivateKey, showErrors, sign } from '../../constants/helpers';
import CustomUpload from '../../components/customUpload/CustomUpload';
function SingleDocument() {

  const { id } = useParams();
  const { data, isLoading } = useGetDocumentByIdQuery({ id });
  const [signDocument, { }] = useSignDocumentMutation();
  const [privateKey, setPrivateKey] = useState<any>()

  const document = data?.document;
  const variousParties = data?.variousParties;
  const userId = useSelector(selectCurrentId);
  let amISigned: number = 0;
  console.log(userId);

  variousParties?.map((party: any) => {
    console.log('party', party.User.id, userId, (party.User.id == userId && party.isSigned));
    if (party.User.id == userId && party.isSigned == true) {
      amISigned = 1;
    }
  })
  let path = document?.document.split('public/')[1];
  const handleSigningDocument = async (key) => {

    console.log(path)
    const res: any = await fetch(import.meta.env.VITE_REACT_API_KEY + '/' + path, {
      method: 'GET',
      headers: {
        'Content-Type': 'multipart/form-data, */*',
        'Accept': '*/*'
      }
    });
    
    const file: any = await res.blob();
    let base64: any = await getBase64(file)
    base64 = base64.split(',')[1];
    const signature = await sign(base64, key);
    const data = { signature, document_id: id };
    try {
      console.log('in');
      let res = await signDocument(data).unwrap();
      console.log('out');
      console.log(res);
    }
    catch (err) {
      showErrors(err);
    }
  }

  if (isLoading) {
    return <Loading3QuartersOutlined></Loading3QuartersOutlined>
  }
  const onFinish = async (values: any) => {
    setPrivateKey(values?.private_key)
    console.log(values)
    handleSigningDocument(values?.private_key)
    return
  }
  return (
    <>
      <a href={`${import.meta.env.VITE_REACT_API_KEY}/${path}`} > Document </a>
      <Row>
        <Col span={12}>
          <Typography>
            Document name :{document?.documentName}
          </Typography>
          <Typography>

            Document status: <Tag>
              {document?.documentStatus}
            </Tag>

          </Typography>
          <Typography>
            Remaning parties: {document?.counter}
          </Typography>
        </Col>
        <Col span={12}>
          <Row justify={'end'} align={'top'}>
            {
              amISigned ?
                <> You Signed this document </> :
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                  <Form
                    onFinish={onFinish}
                    initialValues={{}}
                  >
                    <Form.Item name='private_key'>
                    <Input type='text'/>

                    </Form.Item>
                    <Button htmlType='submit'
                    >
                      Sign this document
                    </Button>

                  </Form>
                </div>

            }
          </Row>
        </Col>
      </Row>




      <CrudTable
        columns={variousPartiesColumns}
        dataSource={variousParties}
      />

    </>
  )
}

export default SingleDocument