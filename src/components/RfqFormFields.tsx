/* @flow */
import React,{useEffect} from 'react';
import {Modal,Row ,Card, Input, Select, DatePicker, InputNumber, Col ,Form } from 'antd';
import {get} from 'lodash';

const {TextArea}=Input;





type Props = {
  isVisible: boolean,
  onCancel: any,
  getAllFields: any,
};

const RfqFormFields = ({
  isVisible,
  onCancel,
  getAllFields,
}: Props) => {

    const [form] = Form.useForm();

console.log('getAllFields',getAllFields)

const RenderFormFields = (type:string , label:string , options?:any ,min?:any ,max?:any)=>{

     switch (type) {
        case 'Input':
            return <Form.Item label={label} > <Input style={{width:'100%'}} placeholder={`Please enter ${label}`}/></Form.Item>;
        case 'PriceInput':
            return <Form.Item label={label}  > 
            <InputNumber style={{width:'100%'}} prefix={'$'} placeholder={`Please enter ${label}`} /></Form.Item>;          
        case 'NumberInput':
            return <Form.Item label={label} >
                 <InputNumber style={{width:'100%'}} placeholder={`Please enter ${label}`} min={min} max={max} /> </Form.Item>;
        case 'Select':
            return <Form.Item label={label} > <Select style={{width:'100%'}} placeholder={`Please select ${label}`}/> </Form.Item>; 
        case 'DatePicker':
           return<Form.Item label={label} > <DatePicker style={{width:'100%'}}/> </Form.Item>;
        case 'TextAreaInput':
            return <Form.Item label={label} > <TextArea style={{width:'100%'}} placeholder={`Please enter ${label}`}/> </Form.Item>;         
        default:
            return <Col/>;
    }

}

  return (
    <Modal
      visible={isVisible}
      width={800}
      title={"Preview RFQ Dynamic Form Fields"}
      centered
      destroyOnClose={true}
      bodyStyle={{padding: '1rem'}}
      onCancel={onCancel}
    >
    <Card>
        <Form layout='vertical' form={form} name="preview">
        <Row gutter={20}>
        {getAllFields.map(({type,label,options,min,max}:any)=><Col span={11} key={label}>
            {RenderFormFields(type,label,{label:'1',value:'1'},min,max)}</Col>)}
           </Row>       
        </Form>
        
    </Card>    
    </Modal>
  );
};

export default RfqFormFields;
