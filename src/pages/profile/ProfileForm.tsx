import React, { useEffect } from 'react'
import type { FormProps } from 'antd';
import { Button, Form, Input , Row , Col, DatePicker, Dropdown, Select } from 'antd';
import './styles.css';

type FieldType = {
  id?: string,
  firstName?: string ,
  lastName?:string,
  fatherName?:string,
  address?:string ,
  gender?:string ,
  dateOfBirth?:string,
  

};
const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const ProfileForm = () => {
  
  
  useEffect(() => {
    
  }, [])

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
        <Form.Item<FieldType>
          label="id"
          name="id"
          rules={[{ required: true, message: 'Please input your id!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="first name"
          name="firstName"
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="last name"
          name="lastName"
          rules={[{ required: true, message: 'Please input your last name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="father name"
          name="fatherName"
          rules={[{ required: true, message: 'Please input your father`s name!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="address"
          name="address"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input/>
        </Form.Item>
        <Form.Item<FieldType>
          label="date of birth"
          name="dateOfBirth"
          rules={[{ required: true, message: 'Please input your date of birth!' }]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item<FieldType>
          label="gender"
          name="gender"
          rules={[{ required: true, message: 'Please input your gender!' }]}
        >
          <Select
            placeholder="gender"
            options={[
              {value:'male' ,label:'male'},
              {value:'female' ,label:'female'}
            ]}
          >
            
          </Select>
            
          
        </Form.Item>
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