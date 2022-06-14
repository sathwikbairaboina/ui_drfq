
import React, { useEffect } from 'react';
import { Table, Button, Row, Card, Col } from 'antd';
import {get, isEmpty} from 'lodash';
import { useNavigate  } from "react-router-dom";
import {EyeOutlined} from '@ant-design/icons';
import { useAppSelector ,useAppDispatch } from '../app/hooks';
import { selectUserRfqs ,selectLoadingUserRfqs , reduxGetAllUserRfqs} from '../app/redux/redux';



type Props = {
  // status?: string;
  user:any;
};

const UserLayout = ({user}: Props) => {

  console.log("user", user);
  
   const dispatch = useAppDispatch();
   useEffect(()=>{ 
      dispatch(reduxGetAllUserRfqs(get(user,'username')));
    },[user])
 
  
  let navigate = useNavigate ();
    const rfqs = useAppSelector(selectUserRfqs);
      const isLoadingUserRfqs = useAppSelector(selectLoadingUserRfqs);



  const  renderFields = (fields:any) => {
    if(!isEmpty(fields)){
      return <>
      {(fields || []).map((element: Object)=> <Row>{get(element,'label')} : {get(element,'value')} </Row>)}
      </>

    }
  }

  const renderViewOrder = (id:string) => {
    return  (<Button icon={<EyeOutlined />} style={{color:'green'}} type="link" 
    onClick={()=> navigate({pathname: `/services/${id}`})} >
        View Order
      </Button>)
    }

    const columns:any = [

    {
      title: 'User',
      dataIndex: 'userName',
      key: 'name',
      width: 200,
    },
    {
      title: 'FormFields',
      dataIndex: 'basicFormDetails',
      width: 300,
      render: renderFields
    },
    {
      title: 'status',
      dataIndex: 'status',
    },
    {
      dataIndex: 'id',
      render: renderViewOrder
    },
  ];



  return (
    <Card title='Welcome to Dynamic Orders' style ={{padding:'40px',}} loading={isLoadingUserRfqs}>
        <Row justify='end' align='top'>
            <Button type="primary" onClick={(e:any)=> navigate(`/service/new`)}>
              {"Create New Order"}
            </Button> 
        </Row>

      <p>We enable you to place orders and track them in real time using a customized flow specified by the administrator. </p>

          <Row justify='center' align='bottom' style={{marginBottom : '20px'}}>
            <Col>
            <h4>Your Orders </h4>
            <Table columns={columns} dataSource={rfqs||[]}  style ={{padding:'20px',}}/>
            </Col>
        </Row>
    </Card>
  );
}

export default UserLayout;
