import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.less';
import {Row , Button} from 'antd';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";

import AdminLayout from '../src/layoutAdmin/AdminLayout';
import UserLayout from '../src/layOutUser/userLayout';
import HomeScreenPage from '../src/views/HomeScreen';
import ServicesListPage from './views/ServicesListPage';
import RfqListPage from './views/RfqsListPage';
import ServiceDetailPage from './views/ServiceDetailPage';
import UserDetailsPage from './views/UserDetailsPage'
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import {reduxGetAllServices , reduxGetAllRfqs ,reduxGetAllUserRfqs} from './app/redux/redux'
import RfqDetailPage from './views/RfqDetailsPage'
import { useAppSelector, useAppDispatch } from './app/hooks';

import Amplify from 'aws-amplify';
import awsConfig from './aws-exports';

Amplify.configure(awsConfig);


function App() {
    const dispatch = useAppDispatch();
    dispatch(reduxGetAllServices());
    dispatch(reduxGetAllRfqs());
    
  return (

  <Authenticator socialProviders={['google']} signUpAttributes={['email']}>
      {({ signOut, user }:any) => (
        <main>
        <Row justify='end' gutter={8} >
         <Button type="link" onClick={signOut} size='large' style={{color:'green' , padding:'20px'}}>
           Sign Out
         </Button> 
       </Row>

     <Router>
      <div>
        <Switch>
          <Route path="/admin" element={<AdminLayout Component={HomeScreenPage} HeaderElement={'Home Screen'}/> }  />
          <Route path="admin/services" element={<AdminLayout Component={ServicesListPage} HeaderElement={'Services List Page'}/> }  />
          <Route path="admin/orders" element={<AdminLayout Component={RfqListPage} HeaderElement={'Order List Page'}/> }  />
          <Route path="admin/services/:id" element={<AdminLayout Component={ServiceDetailPage} HeaderElement={'Service Detail Page'}/> }  />
          <Route path="/" element={<UserLayout user={user}/>} />
          <Route path='/service/new' element={<UserDetailsPage user={user}/>} />
          <Route path='/services/:id' element={<Row justify='start' style={{paddingLeft:'100px'}}><RfqDetailPage user={user} userPage={true}/></Row>} />
          <Route path='admin/rfq/:id' element={<AdminLayout Component={RfqDetailPage} HeaderElement={'Order Detail Page'}/> }/>
        </Switch>
      </div>
    </Router>
        </main>
      )}
    
 </Authenticator>

  );
}

export default App;
