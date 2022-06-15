
import React, {useEffect, useState} from 'react';
import { Tabs , Row , Form , Input, Col, Spin ,Button , notification} from 'antd';
import history from '../helpers/history';
import ServicesFormFieldTable from '../components/ServiceFormFieldTable';
import ServiceStepsTable from '../components/ServiceStepsTable'
import {getServiceById , createOrUpdateService} from '../graphQl/queries'
import {get , isEmpty} from 'lodash';
const { TabPane } = Tabs;
const {TextArea}=Input;




type Props = {
  status?: string;
};

const ServiceDetailPage = (props: Props) => {
    const [form] = Form.useForm();
    const idUrl = window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1);
    const [serviceData, setServiceData] = useState<any>({});
    const [isLoading, setIsLoading] = useState(true);
    const [updatedSteps, setUpdatedSteps] = useState<any>([]);
    const [updatedFormFields, setUpdatedFormFields] = useState<any>([]);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);





    useEffect(()=>{
      console.log(idUrl,"idUrl")
      if(idUrl!=='services'){
      getServiceById(idUrl)
      .then((res)=>{setServiceData(res); 
        form.setFieldsValue({
          name: get(serviceData,'name'),
          description: get(serviceData,'description'),
          })
      
      })
      .finally(()=>setIsLoading(false));
      }
    },[idUrl])

    useEffect(()=>{
     setUpdatedFormFields(get(serviceData, 'rfqBasicFormDetails'));
     setUpdatedSteps(get(serviceData, 'rfqSteps'));
    },[serviceData])




     console.log('serviceData',serviceData);

  const onFinish = async (values: any) => {
    setIsUpdateLoading(true);
        console.log('values', values)
    const {nameForm , descriptionForm} =values;
    
    const map1= updatedFormFields.map((val:any) => ({
            label: val.label,
            type: val.type,
            id: val.label
          }));

         const map2= updatedSteps.map((val:any) => ({
            title: val.title,
            description: val.description,
            id: val.title
          }));     


    const payload= {id:get(serviceData,'id',undefined),
          name : nameForm,
          description:descriptionForm,
          rfqBasicFormDetails:map1,
          rfqSteps:map2
        }

          await createOrUpdateService(payload)
          .then(res=>{console.log('updateRes',res);
            notification.success({message:`Successfully ${get(serviceData,'id',undefined)?'updated':'created'} Service`}); 
        })
          .catch((err)=>notification.error({message:'Error' , description:err.toString()}))
          .finally(()=>setIsUpdateLoading(false));
  };


  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };


    const ServiceDetails = ()=> <>
                                    <Row>
                                      <Col span={11}>
                                       <Form.Item label='Name' 
                                       name="nameForm" rules={[{ required: true, message: 'Please input your name!' }]}
                                       >
                                          <Input style={{width:'100%'}} placeholder='Please enter service name'/>
                                       </Form.Item>
                                       </Col>
                                    </Row>
                                    <Row>
                                      <Col span={11}>
                                       <Form.Item label='Description' 
                                       name="descriptionForm" rules={[{ required: true, message: 'Please input your name!' }]}
                                       >
                                          <TextArea  rows={8} style={{width:'100%'}} placeholder='Please enter service name'/>
                                       </Form.Item>
                                       </Col>
                                    </Row>                                  
                                </>


  return (<div>

            {!isLoading ?
                    <Form layout='vertical' 
                      form={form} name="service_details"
                                   initialValues={{ nameForm:get(serviceData,'name') ,descriptionForm:get(serviceData,'description') }}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    autoComplete="off"
                                    >      

                <Tabs defaultActiveKey="1" tabPosition='left'>
                  <TabPane tab="Service Details" key="1">
                    {ServiceDetails()}
                  </TabPane>
                  <TabPane tab="Dynamic RFQ FORM"  key="2">
                    <ServicesFormFieldTable rfqBasicFormDetails={get(serviceData,'rfqBasicFormDetails')} setUpdatedFormFields={setUpdatedFormFields}/>
                  </TabPane>
                  <TabPane tab="Dynamic RFQ STEPS" key="3">
                    <ServiceStepsTable rfqSteps={get(serviceData,'rfqSteps')} setUpdatedSteps={setUpdatedSteps}/>
                  </TabPane>
                  </Tabs>
                  <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                  <Button style={{float:'right'}} type="primary" htmlType="submit" loading={isUpdateLoading}>
                    Submit
                  </Button>
                </Form.Item>
                  </Form>
              :<Spin />}

    </div>
  );
}


export default ServiceDetailPage;
