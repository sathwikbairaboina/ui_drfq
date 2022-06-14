/* @flow */
import React,{useEffect} from 'react';
import {Modal, Row, Form ,Button, Input ,Col,notification} from 'antd';
import {get, isEmpty} from 'lodash';

const {TextArea } = Input ;



type Props = {
  isVisible: boolean,
  onCancel: any,
  onSubmit: Function,
  editObj: any,
  isLoading: boolean,
  getAllRows: any,
};

const AddOrUpdateCC = ({
  isVisible,
  onCancel,
  onSubmit,
  editObj,
  isLoading,
  getAllRows,
}: Props) => {
  console.log('sdsd',editObj);
const [form] = Form.useForm();

  const isEdit = !isEmpty(editObj);
  useEffect(()=>{form.setFieldsValue({title:get(editObj,'title'),
  description:get(editObj,'description')})},
  [editObj])


  const dataTitles = !isEdit
    ? getAllRows
    : getAllRows.filter((element:any) => element.description !== editObj.description);

  const title = 'Rfq Process Step';
  const handleSubmit = (e:any) => {

       form.validateFields()
        .then(values => {
            let duplicate = handleDuplicates(get(values, 'title'), get(values, 'description'));
            if(!duplicate){
            onSubmit({...values, isEdit});
            }else{
              notification.error({
                message: 'Step Already Exists',
                description: 'Title or Description can not be repeated',
              });
            }          
            form.resetFields();         
        })
        .catch(errorInfo => {
              console.log('errorInfo',errorInfo);
        });



  };

  // const handleSetError = (key:any) => {
  //   let error:any = new Error('Already Exists');
  //   if (key) {
  //     form.setFields({
  //       [key]: {
  //         errors: [error],
  //       },
  //     }, );
  //   }
  // };

  const handleDuplicates = (title:string, description:string) => {
    let temp = [...dataTitles];
    let dTitle = temp.some(
      element => element.title.toUpperCase() === title.toUpperCase(),
    );
    let dDescription = temp.some(
      element => element.description.toUpperCase() === description.toUpperCase(),
    );

    // handleSetError(dTitle && 'title');
    // handleSetError(dDescription && 'description');

    return dTitle || dDescription;
  };

  return (
    <Modal
      visible={isVisible}
      width={600}
      title={isEdit ? 'Update ' + title : 'Add New ' + title}
      centered
      destroyOnClose={true}
      bodyStyle={{padding: '1rem'}}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          loading={isLoading}
        >
          {isEdit ? 'Update' : 'Add'}
        </Button>,
      ]}
      onCancel={onCancel}
    >
        <Form  layout='vertical' form={form} name="control-hooks" onFinish={handleSubmit}>
          
          <Row gutter={30}  justify="center">
            <Col span={8}>
            <Form.Item name="title" label="Title" rules={[{ required: true }]} initialValue={get(editObj,'title')}>
              <Input
                required
                placeholder="Please enter Title"
              />
            </Form.Item>  
            </Col>
            <Col span={11}>
            <Form.Item name="description" label="Description" rules={[{ required: true }]} initialValue={get(editObj,'description')}>
              <TextArea rows={4} placeholder="Please describe your service" maxLength={6} />
           </Form.Item>   
           </Col> 
          </Row>
        </Form>
    </Modal>
  );
};

export default AddOrUpdateCC;
