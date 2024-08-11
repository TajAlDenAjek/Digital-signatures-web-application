import React, { useEffect, useState } from 'react'
import type { FormProps } from 'antd';
import { Button, Form, Input , Row , Col, DatePicker, Select, Upload } from 'antd';
import Icon from '@ant-design/icons/lib/components/Icon';
import { useLocation } from 'react-router-dom';

type FieldType = {
    email: string ;
    password : string;
};
const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

type params =  {
    disabled: boolean 
};

const ViewGovermentOfficiers = () => {
  
  
//  console.log(disabled);
  const location = useLocation();
  const disabled: any  = !location.pathname.includes('edit') ;
 
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
          disabled={disabled}
        >
          <Form.Item name="email" label="Email"
                rules={[{ required: true, message: 'Please Enter your email' }]}
                
              >
                <Input type='email' />
          </Form.Item>
          <Form.Item name="password" label="password"
                rules={[{ required: true, message: 'Please Enter a Password' }]}
              >
                <Input type='password' />
          </Form.Item>
          {
            !disabled ? 
            <Form.Item >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            </Form.Item> 
          :<></>
          }
          
      </Form>
      </Col>
      
    </Row>
  </div>
    </>
  )
}

export default ViewGovermentOfficiers; 