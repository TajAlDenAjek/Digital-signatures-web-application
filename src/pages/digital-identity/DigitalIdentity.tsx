import Icon from '@ant-design/icons/lib/components/Icon';
import { Col, Form, Row, Select, Tag, Upload } from 'antd'
import React, { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";



function DigitalIdentity() {
  const [state , setState ] = useState({loading:false}) ;
  const [captchaPassed , setCaptchaPassed] = useState(0) ;
  const [options , setOptions ] = useState()
  const options = [
    { value: 'gold' },
    { value: 'lime' },
    { value: 'green' },
    { value: 'cyan' },
  ];

  function onChange(value:any) {
    setCaptchaPassed(1);
  }
  const onFileChange = (event: any , type:any)=>{
    // handleChange = info => {
    if (info.file.status === 'uploading') {
        this.setState({ loading: true });
        return;
    }
    if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl =>
          this.setState({
            imageUrl,
            loading: false,
          }),
        );
    }
    // };
  }
  const tagRender = (props:any) => {
    const { label, value, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        color={value}
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        style={{ marginInlineEnd: 4 }}
      >
        
        {label}
      </Tag>
    );
  };
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
                  onChange={(event:any)=>onFileChange(event, 1 )}
                  >
              <div>
                <Icon type={state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Front </div>
              </div>
              </Upload>
              
                           

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
                  onChange={(event)=>onFileChange(event , 2 )}
              >
              <div>
                <Icon type={state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Back</div>
              </div>
              </Upload>
              
            </Col>
          </Row>
          <Select
            mode="multiple"
            tagRender={tagRender}
            defaultValue={['gold', 'cyan']}
            style={{ width: '100%' }}
            options={options}
          />
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