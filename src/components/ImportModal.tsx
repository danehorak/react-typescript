import { Modal, Upload, UploadFile, UploadProps, message } from 'antd'
import { useState } from 'react';
import { useCreateCharacter } from '../queries';
import { InboxOutlined } from '@ant-design/icons';


export default function ImportModal( props: { isVisible: boolean, setVisible: (v: boolean) => void }) {

  const { Dragger } = Upload;

  const { isVisible, setVisible } = props;

  const { mutate: createCharacter } = useCreateCharacter();

  const [isLoading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<UploadFile | undefined>(undefined);

  const handleImport = () => {
    setLoading(true)
    if (file?.response) {
      createCharacter(file.response, {
        onSuccess: () => {
          setFile(undefined);
          setVisible(false);
          setLoading(false);
          message.success('Success: Character imported');
        },
        onError: () => {
          setLoading(false);
          message.error('Character import failed!');
        }
      })
    } else {
      setLoading(false);
      message.error('Unable to upload file');
    }
  }

  const draggerProps: UploadProps = {
    name: 'file',
    fileList: file ? [file] : [],
    action: 'http://localhost:8080',
    onChange: (info) => {
      if (info.file.error) {
        setFile(undefined)
        message.error(`Invalid File: ${info.file.response}`)
      } else {
        setFile(info.file)
      }
    }
  }
  
  return (
    <Modal
      title="Import Character"
      open={isVisible}
      onOk={handleImport}
      confirmLoading={isLoading}
      onCancel={() => {setVisible(false)}}
      okButtonProps={{ disabled: file === undefined }}
    >
      <Dragger {...draggerProps}>
        <p className="ant-upload-drag-icon"><InboxOutlined /></p>
        <p className="ant-upload-text">Click or drag a file to this area to upload</p>
        <p className="ant-upload-hint">
          The content of your uploaded file should contain a single JSON encoded Character.
        </p>
      </Dragger>
    </Modal>
  );
}