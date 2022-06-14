
import React from 'react';
import {Card, Row ,Steps} from 'antd';
const {Step}= Steps;



type Props = {
  status?: string;
};

const HomeScreenPage = (props: Props) => {


  return (
    <Card title="Welcome to Dynamic Orders">
        <h2>Services Screen</h2>
        <Row style={{paddingLeft:'100px'}}>

          <h3>We allow user to place orders using dynamically designed services , you can manage your services here</h3>
              <Steps direction="vertical" current={3} >
               <Step  title='Service Details' description={'Name and describe your service here'} />       
               
               <Step  title='Dynamic Form Fields' description={'Define a customized Dynamic form using JSON data , to receive details from customer before placing order.Note : Supported Form Fields are "Input","PriceInput","NumberInput","Select","DatePicker","TextAreaInput".'} />    
               
               <Step  title='Dynamic Order Tracking' description={'Add List of steps to allow your customer to track your order'} />    
          
             </Steps>
        </Row>
        <h2>Orders Screen</h2>
        <Row style={{paddingLeft:'100px'}}>

          <h3>You can manage your orders here</h3>
              <Steps direction="vertical" current={3} >
               <Step  title='List Page' description={'You can view all orders received here'} />       
               <Step  title='Details Page' description={'You can view and update customer order status here'} />    
             </Steps>
        </Row>
    </Card>
  );
}

export default HomeScreenPage;
