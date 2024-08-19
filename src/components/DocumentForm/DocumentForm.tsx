import React, { useEffect, useState } from 'react'
import type { FormProps } from 'antd';
import { Button, Form, Input, Row, Col, DatePicker, Select, Upload, message, Tag } from 'antd';
import Icon from '@ant-design/icons/lib/components/Icon';
import './DocumentForm.css'
import CustomUpload from '../customUpload/CustomUpload';
import { useStoreDocumentMutation } from '../../features/documents/documentsApiSlice';
import { showErrors, sign } from '../../constants/helpers';

type FieldType = {
  email: string,
  user_id: string
};


const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function getBase64(img: any, callback: any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const DocumentForm = () => {


  const user_id: any = 1;

  const [state, setState] = useState({ loading: false });
  const [emails, setEmails] = useState([]);
  const [email, setEmail] = useState('');
  const [storeDocument , {} ] = useStoreDocumentMutation() ;
  function getBase64(file:any ) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader?.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  const onFinish: FormProps<FieldType>['onFinish'] =async  (values) => {
    if(emails?.length == 0){
      message.error('input at least one party to sign the document with') ;
      return ;
    }
    let file = getBase64(values?.document?.file.originFileObj)?.split(',')[1];
    const signature =  await sign( file , localStorage.getItem('privateKey')) ;

    const data = { ...values, emails , signature , base64file: file   };
     try{
      let res = await storeDocument(data).unwrap();

     }
     catch(err){
      showErrors(err);
     }
    // console.log(values);
    
    
  };
  const uploadButton = (
    <div>
      <Icon type={state.loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  const handleChange = (info: any) => {
    if (info.file.status === 'uploading') {
      setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl: any) => {
        // console.log(imageUrl);
        setState({
          imageUrl,
          loading: false,
        })
      }
      );
    }
  };






  useEffect(() => {

  }, [])
  // console.log(import.meta.env.BACKEND_URL)

  return (
    <>
      <div >
        <Row>

          <Col span={12} offset={7}>
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout='vertical'
            >
              <Row justify={'center'} >
                <CustomUpload name='document' />
              </Row>

              <Row >


                <Input onChange={(e) => { setEmail(e.target.value) }}
                  value={email}
                  size={'middle'}
                />
                <Button
                  onClick={()=>{
                    if (email.match(/(?:[a-z0-9+!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i)){
                      setEmails([...emails, email])
                      setEmail('');
                    }
                    else {
                      message.error('not a valid email address')
                    }
                  }}
                > Add to the list </Button>
              </Row>
              <Row justify={'center'}>
                {
                  emails?.map((email) => {
                    return <>
                      <div>
                        <Tag
                          closable
                          key={email}
                          onClose={(e) => {
                          }}
                        >
                          {email}
                        </Tag>

                      </div>
                    </>
                  })
                }
              </Row>

              <Row justify={'center'} style={{ margin: '1rem' }}>

                <Form.Item >
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Row>

            </Form>
          </Col>

        </Row>
      </div>
    </>
  )
}

export default DocumentForm; 