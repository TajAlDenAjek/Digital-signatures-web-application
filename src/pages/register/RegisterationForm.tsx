import React from 'react'
import type { FormProps, TabsProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, Checkbox } from 'antd'
import { useRegisterMutation } from '../../features/auth/authApiSlice'
import { message } from 'antd'

type RegisterFieldType = {
    firstName?: string
    middleName?:string
    lastName?: string
    organization?:string
    email?: string,
    password?: string,
    confirmPassword?:string
}
const RegisterationForm = () => {
    const [register, { isLoading }] = useRegisterMutation()
    const navigate = useNavigate()
    const [form] = Form.useForm();

    const onFinish: FormProps<RegisterFieldType>['onFinish'] = async (values) => {
        try {
            if(values?.confirmPassword!==values?.password){
                message.error('you have entered different passwords !')
                return
            }
            const userData = await register({ 
                ...values,
                "confirm password":values.confirmPassword
            }).unwrap()
            form.resetFields()
            message.success('Registration Successful')
            navigate('/login')
        } catch (error: any) {
            form.setFields([{
                name: 'email',
                errors: [error?.data?.error?.email]
            }])
        }
    }

    return (
        <Form
            form={form}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            autoComplete='off'
            onFinish={onFinish}
        >
            <div className="form-elements-register">
                <Form.Item<RegisterFieldType> name="firstName" label="First Name"
                    rules={[{ required: true, message: 'Please Enter your First name' }]}
                >
                    <Input type='text' />
                </Form.Item>
                <Form.Item<RegisterFieldType> name="middleName" label="Middle Name"
                    rules={[{ required: true, message: 'Please Enter your Middle name' }]}
                >
                    <Input type='text' />
                </Form.Item>
                <Form.Item<RegisterFieldType> name="lastName" label="Last Name"
                    rules={[{ required: true, message: 'Please Enter your Last name' }]}
                >
                    <Input type='text' />
                </Form.Item>
                {/* <Form.Item<RegisterFieldType> name="organization" label="Organization"
                    rules={[{ required: true, message: 'Please Enter your organization' }]}
                >
                    <Input type='text' />
                </Form.Item> */}
                <Form.Item<RegisterFieldType> name="email" label="Email"
                    rules={[{ required: true, message: 'Please Enter your email' }]}
                >
                    <Input type='email'/>
                </Form.Item>
                <Form.Item<RegisterFieldType> name="password" label="Password"

                    rules={[{ required: true, message: 'Password should be 8-20 chars ', min: 8, max: 20 }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item<RegisterFieldType> name="confirmPassword" label="Confirm password"

                    rules={[{ required: true, message: 'Password should be 8-20 chars ', min: 8, max: 20 }]}
                >
                    <Input.Password />
                </Form.Item>
            </div>
           
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type='primary' htmlType='submit' disabled={isLoading}>{isLoading ? "Signing up..." : "Sign up"}</Button>
            </Form.Item>
        </Form>
    )
}

export default RegisterationForm