
import React from 'react';
import { Table, Button, Row } from 'antd';
import {get, isEmpty} from 'lodash';
import { useNavigate  } from "react-router-dom";
import { selectRfqs } from '../app/redux/redux';
import { useAppSelector, useAppDispatch } from '../app/hooks';



type Props = {
  status?: string;
};

const RfqListPage = (props: Props) => {
  const rfqs = useAppSelector(selectRfqs);
  console.log('hey', rfqs);
  

  let navigate = useNavigate ();




  const  renderFields = (fields:any) => {
    if(!isEmpty(fields)){
      return <>
      {(fields || []).map((element: Object)=> <Row>{get(element,'label')} : {get(element,'value')} </Row>)}
      </>

    }
  }



  const renderViewOrder = (id:string) => {

    return  (<Button type="link" onClick={()=> navigate({pathname: `/admin/rfq/${id}`})}>
        View Order
      </Button>)
    }

    const columns:any = [

    {
      title: 'User',
      dataIndex: 'userName',
      key: 'name',
      width: '30%',
    },
    {
      title: 'FormFields',
      dataIndex: 'basicFormDetails',
      width: '40%',
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
    <div>
     <Table columns={columns} dataSource={rfqs || []} />
    </div>
  );
}

export default RfqListPage;
