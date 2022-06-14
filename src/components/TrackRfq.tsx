/* @flow */
import React,{useEffect} from 'react';
import {Modal,Steps ,Card } from 'antd';
import {get} from 'lodash';

const {Step}=Steps;

const getAllSteps = [
    {
        title: 'Order Confirmed',
        description:' Order Confirmed text will be applied here',
    },
        {
        title: 'Order Dispatched',
        description:' Order Confirmed text will be applied here',
    },

        {
        title: 'Out For Delivery',
        description:' Order Confirmed text will be applied here',
    },

        {
        title: 'Payment received',
        description:' Order Confirmed text will be applied here',
    },

        {
        title: 'Delivered',
        description:' Order Confirmed text will be applied here',
    },


]



type Props = {
//   isVisible: boolean,
//   onCancel: any,
//   getAllSteps: any,
};

const TrackRfq = ({
//   isVisible,
//   onCancel,
//   getAllSteps,
}: Props) => {

console.log('getAllSteps',getAllSteps)

  return (
    <Card >
      <Steps direction="vertical" current={1}>
          { getAllSteps.map((e:any)=>
            <Step key={get(e,'title')} title={get(e,'title')} description={get(e,'description')} />       
          )}
      </Steps>
    </Card>    
  );
};

export default TrackRfq;
