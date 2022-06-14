/* @flow */
import React,{useEffect} from 'react';
import {Modal,Steps ,Card } from 'antd';
import {get} from 'lodash';

const {Step}=Steps;



type Props = {
  isVisible: boolean,
  onCancel: any,
  getAllSteps: any,
};

const RfqProcessSteps = ({
  isVisible,
  onCancel,
  getAllSteps,
  
}: Props) => {

console.log('getAllSteps', getAllSteps)

  return (
    <Modal
      visible={isVisible}
      width={600}
      title={"Preview Rfq Process Steps"}
      centered
      destroyOnClose={true}
      bodyStyle={{padding: '1rem'}}
      onCancel={onCancel}
      footer={[]}
    >
    <Card>
      <Steps direction="vertical" current={1} >
          { getAllSteps.map((e:any)=>
            <Step key={get(e,'title')} title={get(e,'title')} description={get(e,'description')} />       
          )}
      </Steps>
    </Card>    
    </Modal>
  );
};

export default RfqProcessSteps;
