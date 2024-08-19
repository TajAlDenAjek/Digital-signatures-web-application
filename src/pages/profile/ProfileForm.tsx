import React, { useEffect } from 'react'
import type { FormProps } from 'antd';
import { Button, Form, Input , Row , Col, DatePicker, Dropdown, Select, message } from 'antd';
import './styles.css';
import CustomUpload from '../../components/customUpload/CustomUpload';
import { useUploadUserDataMutation } from '../../features/documents/documentsApiSlice';

type FieldType = {
  id?: string,
  firstName?: string ,
  lastName?:string,
  fatherName?:string,
  address?:string ,
  gender?:string ,
  dateOfBirth?:string,
  

};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const ProfileForm = () => {
  const [uploadUserData , {isLoading} ] = useUploadUserDataMutation();
  
  useEffect(() => {
    
  }, [])

  const onFinish: FormProps['onFinish'] =async (values) => {
    try{
      let res = await uploadUserData(values).unwrap();
      message.success('uploaded succesfully');
    }
    catch(err){
      console.log(err);
      message.error(err?.data?.message)
    }
  };
  
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
          
          <Form.Item name='fullName' label='Full Name'
            rules={[{required:true}]}
          >
            
            <Input type='text'

            />
          </Form.Item>

          <Form.Item name='nationalNumber' label='National Num' 
            rules={[{
              required: true,            
              pattern: new RegExp(/^\d{10}$/),
              message: "Natinoal number is required and must have 10 digits"
            }]}
          >
            <Input type='text'
              name='nationalNumber'
            />
          </Form.Item>
          <Row>
          <Col span={10} >
            <CustomUpload
                name={'front'}
              />
          </Col>
          <Col span={10}>
            <CustomUpload
              name={'back'}
            />
          </Col>
          
          </Row>
        <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
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

export default ProfileForm;