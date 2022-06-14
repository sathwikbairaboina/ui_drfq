
import React,{useState} from 'react';
import { Col, Row, Card, Select , Tabs, Form , Button ,Modal} from 'antd';
import {get, isEmpty} from 'lodash';
import UserRfqForm from '../../src/components/UserRfqForm'
// import TrackRfq from '../components/TrackRfq';
import { selectServices } from '../app/redux/redux';
import {useAppSelector} from '../app/hooks';
import {ExclamationCircleOutlined} from '@ant-design/icons';
const { TabPane } = Tabs;
const { confirm , error } = Modal;

type Props = {
  // status?: string;
  user:any;
};



const UserServiceDetailsPage = ({user}: Props) => {
  const services =useAppSelector(selectServices);
  const [currentService, setCurrentService] = useState<any>(null);
  const[current,setCurrent]= useState<any>('1');
  const [form] = Form.useForm();

  const suggestions = (services||[]).map((val:any) => {return {
  label: get(val,'name'),
  value: get(val,'name'),
  description: get(val,'description'),
  id: get(val,'id'),
  rfqBasicFormDetails:get(val,'rfqBasicFormDetails'),
  rfqSteps:get(val,'rfqSteps')
}});
    const handleConfirm = ():any=> {
    if(!isEmpty(currentService)){
    confirm({
    title: 'Confirm to proceed',
    content:'After this step you will be directed to order form , provided by service provider you wont be able to come back until you fill the form details',
    icon: <ExclamationCircleOutlined />,
    onOk(){
      setCurrent('2');
    },
    
  });}else{
      error({
        title: 'Please Select Service',
        content:'You should select a service to place order'
      })
  }
}

console.log('current service' , currentService , suggestions)

  const renderSelectService = () => {
    return     <Form  layout='vertical' form={form} name="control-hooks" onFinish={()=>{}}>
                  <Form.Item name="title" label="Search and select service" rules={[{ required: true }]} initialValue={''}>
                    <Select defaultValue="lucy"  showSearch style={{ width: 200 }} onSelect={(e:any)=>{
                      const temp = suggestions.find(({value}:any)=>value===e);
                      setCurrentService(temp);
                      }} options={suggestions||[]}/>
                  </Form.Item>

                  {currentService&&<>
                    <Row> <Col span={4}><h4>Title :</h4>  </Col> <Col span={12}> {get(currentService,'label')}</Col></Row>

                  <Row> <Col span={4}> <h4> Description:</h4></Col> <Col span={12}> {get(currentService,'description')}</Col></Row>
                  </>}   

              <Button type="primary" onClick={handleConfirm}>
                    {"Next"}
                  </Button>              
              </Form>
  }
  



  return (
    <Card title='Place your orders and track them in real time using a 
    customized flow specified by the administrator.' style ={{padding:'40px',}}>
      <Tabs defaultActiveKey="1"  activeKey={current} tabPosition='left'>
        <TabPane tab="Select Service" key="1">
         {renderSelectService()}      
         </TabPane>
        <TabPane tab="Fill Order Details"  disabled key="2">
           {<UserRfqForm  getAllFields={get(currentService,'rfqBasicFormDetails')} serviceData={currentService} user={user}/>}
        </TabPane>
        {/* <TabPane tab="Track your Service" disabled key="3">
          < TrackRfq/>
        </TabPane> */}
      </Tabs>
    </Card>
  );
}

export default UserServiceDetailsPage;
