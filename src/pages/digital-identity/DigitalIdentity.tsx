import Icon from '@ant-design/icons/lib/components/Icon';
import { Button, Col, Form, Input, Row, Select, Tag, Upload, message } from 'antd'
import React, { useState } from 'react'
import ReCAPTCHA from "react-google-recaptcha";
import { generatePrivateAndPublicKey, showErrors } from '../../constants/helpers';
import { useCreateDigitalCertificateMutation } from '../../features/digitalIdentity/digitalIdentityApiSlice';

{
  /* 
    <ReCAPTCHA
      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
      onChange={onChange}
    /> 
  */
}


function DigitalIdentity() {
  const [captchaPassed , setCaptchaPassed] = useState(0) ;
  const [createDigitalCertificate , {} ] = useCreateDigitalCertificateMutation();

  const handleGenerateIdentity = async  ()=>{
    let keys =  await generatePrivateAndPublicKey();
    try{
      let res = await createDigitalCertificate({publicKey: keys.publicKey}).unwrap() ;
      localStorage.setItem('privateKey' , keys.privateKey);
    }
    catch(err){
      showErrors(err);
    }
  }

  return (
    <>
      <Row justify={'center'}>
        
        <Col span={12} offset={9}>

          
  
      
        <Button
          onClick={handleGenerateIdentity}
        >
          Generate Identity
        </Button>
      </Col>
      
      
    </Row>
    </>
  )
}

export default DigitalIdentity  