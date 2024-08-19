import { UploadOutlined } from '@ant-design/icons';
import { Button, Form, GetProp, Upload, UploadProps, message } from 'antd'
import React, { useState } from 'react'
import './styles.scss'
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

// const beforeUpload = (file: FileType) => {
//     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//     if (!isJpgOrPng) {
//       message.error('You can only upload JPG/PNG file!');
//     }
//     const isLt2M = file.size / 1024 / 1024 < 2;
//     if (!isLt2M) {
//       message.error('Image must smaller than 2MB!');
//     }
//     return isJpgOrPng && isLt2M;
// };
type Parms = {
}
function CustomUpload({ name, customValidatoin = null, isPdfFile,form }: any) {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const [fileName, setFileName] = useState<string>(name)
  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'uploading') {
      // setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      setFileName('File Uploaded')
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const handleChangePdf=(info)=>{
    if(info.file.status==='done'){
      message.success(`${info.file.name} file uploaded successfuly`)
    } else if (info.file.status==='error'){
      message.error(`${info.file.name} file upload failed`)
    } 
    if(info.fileList?.length===0){
      form.setFieldsValue({
        contract:null
      })

    }
  }
  return (
    <div className='custom-upload'>

      <Form.Item
        name={name}
        rules={[{ required: true, message: customValidatoin ?? `Please upload your ${name} ID image` }]}
      >
        {
          isPdfFile ?
            <Upload
              onChange={handleChangePdf}
              showUploadList={true}

              maxCount={1}
              accept='.pdf'
              name='file'
              customRequest={async (options: any) => {
                const { onSucess, onProgress, file, } = options

                onProgress({ percent: 100 })
                onSucess(file)
                message.success('file uploaded')
                return
              }}
            >
              <Button icon={<UploadOutlined />} >Clic to Upload</Button>

            </Upload>

            : <Upload
              listType="picture-card"
              className="avatar-uploader-2"
              showUploadList={false}
              customRequest={(info: any) => {
                console.log(info)
                setFileName('File Uploaded Successfuly')
                message.success('file uploaded')

              }}
              // beforeUpload={beforeUpload}
              onChange={handleChange}

            >

              <>{fileName}</>
            </Upload>

        }

      </Form.Item>
    </div>

  )
}

export default CustomUpload