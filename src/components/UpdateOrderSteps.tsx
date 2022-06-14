/* @flow */
import React,{useEffect} from 'react';
import {Modal,Steps ,Card } from 'antd';
import {get} from 'lodash';
import {ExclamationCircleOutlined} from '@ant-design/icons';

const {Step}=Steps;
const { confirm } = Modal;

// const getAllSteps = [
//     {
//         title: 'Order Confirmed',
//         description:' Order Confirmed text will be applied here',
//     },
//         {
//         title: 'Order Dispatched',
//         description:' Order Confirmed text will be applied here',
//     },

//         {
//         title: 'Out For Delivery',
//         description:' Order Confirmed text will be applied here',
//     },

//         {
//         title: 'Payment received',
//         description:' Order Confirmed text will be applied here',
//     },

//         {
//         title: 'Delivered',
//         description:' Order Confirmed text will be applied here',
//     },


// ]



type Props = {
    setCurrentStep: any,
    currentStep: any,
    getAllSteps:any,
    userPage?: boolean,
};

const UpdateOrderSteps
 = ({
    setCurrentStep,
    currentStep,
    getAllSteps,
    userPage,
}: Props) => {

  const handleStepChange = (current:any)=>{
  confirm({
    title: 'Do you Want to update Order Status?',
    icon: <ExclamationCircleOutlined />,
    content: `you are updating order status to ${get(getAllSteps,`[${current}].title`)}`,
    onOk(){
      setCurrentStep(current) ;
    },
  });
  }

console.log('getAllSteps',getAllSteps)

  return (
    <Card title='Order Tracking'>
         <p>With Realtime Order Tracking, customers will have live arrival times at their fingertips. The feature is simple to set up and use. 
           It’s customizable and completely integrated within Dynamic Order Steps on a service 
           planning process, plus it makes a customer’s shopping experience that much better.</p>
      <Steps direction="vertical" current={currentStep || 1} onChange={current=>{handleStepChange(current)}}>
          { getAllSteps.map((e:any)=>
            <Step key={get(e,'title')} title={get(e,'title')} description={get(e,'description')} disabled={userPage}/>       
          )}
      </Steps>
    </Card>    
  );
};

export default UpdateOrderSteps
;
