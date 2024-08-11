import React, { useEffect, useState } from 'react'
import type { FormProps } from 'antd';
import { Button, Form, Input , Row , Col, DatePicker, Select, Upload } from 'antd';
import Icon from '@ant-design/icons/lib/components/Icon';
import './DocumentForm.css'

type FieldType = {
  email: string , 
  user_id : string 
};


const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

function getBase64(img:any, callback:any) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

const DocumentForm = () => {


  const user_id:any = 1 ;
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    values = {...values , user_id} ;
    console.log(values);
  };
  const [state , setState] = useState({loading:false});

  const uploadButton = (
    <div>
      <Icon type={state.loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  const handleChange = (info:any) => {
    if (info.file.status === 'uploading') {
      setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl:any) =>{
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
        
        <Col span={12} offset={9}>
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
          <Form.Item name="email" label="Email"
                rules={[{ required: true, message: 'Please Enter your email' }]}
              >
                <Input type='email' />
          </Form.Item>
          <Col offset={6}  >
            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                // style={{width}}
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                // beforeUpload={}
                action={`${import.meta.env.BACKEND_URL}/document`}
                data={{user_id }}
                onChange={handleChange}
            >
              { uploadButton}
            </Upload>
          <Form.Item
            name="user_id"
            hidden={true}
            
          >
            <Input value={user_id} defaultValue={user_id} hidden={true} type='text' ></Input>

          </Form.Item>
          </Col>
          {/* <Col> </Col> */}
          <Form.Item >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> 
      </Form>
      </Col>
      
    </Row>
  </div>
    </>
  )
}

export default DocumentForm; 