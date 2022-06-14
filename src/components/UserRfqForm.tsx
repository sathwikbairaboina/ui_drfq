/* @flow */
import React,{useEffect,useState} from 'react';
import {notification,Row ,Card, Input, Select, DatePicker, InputNumber, Col ,Form , Button, Steps} from 'antd';
import {get} from 'lodash';
import { createOrUpdateRfq} from '../graphQl/queries'
import { useNavigate  } from "react-router-dom";
import moment from 'moment';


const {TextArea}=Input;





type Props = {
  getAllFields: any,
  serviceData:any,
  user:any,
};

const UserRfqForm = ({
  getAllFields,
  serviceData,
  user,
}: Props) => {

  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [form] = Form.useForm();
  const {setFieldsValue}= form;
  const [dateInputs, setDateInputs] =useState<any>({});

    let navigate = useNavigate ();

console.log('getAllFields',getAllFields)

const RenderFormFields = (item:any ,index:any)=>{
  const {label} = item;

     switch (get(item,'type')) {
        case 'Input':
            return <Form.Item label={get(item,'label')} name={get(item,'label')}  fieldKey={[index, get(item,'label')]} rules={[{ required: true}]}>
               <Input id={`label`} style={{width:'100%'}} placeholder={`Please enter ${label}`}/></Form.Item>;
        case 'PriceInput':
            return <Form.Item label={label} name={label} fieldKey={[index, index]} rules={[{ required: true}]}> 
            <InputNumber style={{width:'100%'}} prefix={'$'} placeholder={`Please enter ${label}`} /></Form.Item>;          
        case 'NumberInput':
            return <Form.Item label={label} name={label}  fieldKey={[index, get(item,'label')]} rules={[{ required: true}]}>
                 <InputNumber  min={get(item,'label')} max={get(item,'max')} style={{width:'100%'}} prefix={''} placeholder={`Please enter ${label}`} /></Form.Item>;
        case 'Select':
            return <Form.Item label={label} name={label } fieldKey={[index, get(item,'label')]}> <Select style={{width:'100%'}} placeholder={`Please select ${label}`}/> </Form.Item>; 
        case 'DatePicker':
           return <Form.Item label={label} name={label} fieldKey={[index, index]} rules={[{ required: true}]}> 
            <DatePicker onChange={(d,date)=> {

              setDateInputs({...dateInputs, [label]: date });
              console.log('dsdsd',date)            
            }} /></Form.Item>; 
        case 'TextAreaInput':
            return <Form.Item label={label} name={label} fieldKey={[index, index]} rules={[{ required: true}]}> 
            <TextArea/></Form.Item>;      
          default:
            return <Col/>;
    }

}


  const onFinish = async (values: any) => {
    setIsUpdateLoading(true);

    const {nameForm , descriptionForm} =values;
   
 const formDetails = Object.keys(values).map(key=>{
   return {
     label: key,
     value: dateInputs[key] || values[key] || ''
   }
 })

  const steps = (get(serviceData,'rfqSteps')||[]).map((element:any)=>{
   return {
     title: get(element,'title')||'',
     description: get(element,'description')||'',
   }
 })

    const payload= {
          userName : get(user ,'username'),
          userId:get(user ,'username'),
          service:{
            name:get(serviceData,'label'),
            description:get(serviceData,'description'),
            id:get(serviceData,'id'),
            rfqSteps: steps,
          },
          basicFormDetails: formDetails,
        }
                console.log('values', values, payload);

          await createOrUpdateRfq(payload)
          .then(res=>{notification.success({message:'Successfully created Order' , description:'You can track your order on your orders '});
            navigate({pathname: `/services/${get(res,'id')}`});
      })
          .catch(err=>{notification.error({message:'Error creating Order' , description:err})})
          .finally(()=>{
            setIsUpdateLoading(false);
          });
  };


  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (

    <Card>
        <Form layout='vertical' form={form} name="preview"
            //  initialValues={{ nameForm:get(serviceData,'name') ,descriptionForm:get(serviceData,'description') }}
             onFinish={onFinish}
             onFinishFailed={onFinishFailed}
             autoComplete="off"
        >
            <Row gutter={20}>
        {getAllFields.map((item:any,index:any)=><Col span={11} key={get(item,'label')}>
            {RenderFormFields(item,index)}</Col>)}
           </Row>    
            <Row justify='end' align='top'>
`            <Button type="primary" htmlType="submit"  loading={isUpdateLoading}>
              {'Place Order'}
            </Button> `
           </Row>   
        </Form>
        
    </Card>    
  );
};

export default UserRfqForm;
