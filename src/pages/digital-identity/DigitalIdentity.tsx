import Icon from '@ant-design/icons/lib/components/Icon';
import { Col, Form, Row, Upload } from 'antd'
import React, { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";



function DigitalIdentity() {
  const [state , setState ] = useState({loading:false}) ;
  const [captchaPassed , setCaptchaPassed] = useState(0) ;
  
  const uploadButton = (
    <div>
      <Icon type={state.loading ? 'loading' : 'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
  function onChange(value:any) {
    setCaptchaPassed(1);
  }
  const onFileChange = (type:any)=>{
    // if(type == 1 ) {
      
    // }
    // else{

    // }
  }
  return (
    <>
      <Row>
        
        <Col span={12} offset={9}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
        //   onFinish={onFinish}
        //   onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout='vertical'
        >
          <Row>
            <Col span={12} >
              <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  // style={{width}}
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  // beforeUpload={}
                  action={`${import.meta.env.BACKEND_URL}/document`}
                  // data={{user_id }}
                  // onChange={handleChange}
                  >
              { uploadButton}
              </Upload>
              <label  > Front </label>              
            </Col>
            <Col span={12}>
              <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  // style={{width}}
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  // beforeUpload={}
                  action={`${import.meta.env.BACKEND_URL}/document`}
                  // data={{user_id }}
                  // onChange={handleChange}
              >
                { uploadButton}
              </Upload>
              <label  > Back </label>
            </Col>
          </Row>
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={onChange}
          />
          
      </Form>
      </Col>
      
      
    </Row>
    </>
  )
}

export default DigitalIdentity  