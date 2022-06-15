
import React from 'react';
import { Table, Button, Row } from 'antd';
import {get, isEmpty} from 'lodash';
import { useNavigate  } from "react-router-dom";
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectServices , selectLoadingServices} from '../app/redux/redux';



type Props = {
  status?: string;
};

const ServicesListPage = (props: Props) => {
  

  const services =useAppSelector(selectServices);
  const isLoadingServices =useAppSelector(selectLoadingServices);

  console.log('services', services);

  let navigate = useNavigate ();

  const  renderFields = (fields:any) => {
    if(!isEmpty(fields)){
      return <>
      {fields.map((e: Object)=> <Row>{get(e,'label')}</Row>)}
      </>

    }
  }

  const  renderSteps = (fields:any) => {
    if(!isEmpty(fields)){
      return <>
      {fields.map((e: Object)=> <Row>{get(e,'title')}</Row>)}
      </>

    }
  }

  const renderViewService = (id:string) => {
    return  (<Button type="link" onClick={()=> navigate({pathname: `/admin/services/${id}`})}>
        View Service
      </Button>)
    }

    const columns:any = [

    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
    },
    {
      title: 'FormFields',
      dataIndex: 'rfqBasicFormDetails',
      width: '40%',
      render: renderFields
    },
    {
      title: 'Steps',
      dataIndex: 'rfqSteps',
      render: renderSteps
    },
    {
      dataIndex: 'id',
      render: renderViewService
    },
  ];


  return (
    <div>
      <Row justify='end' align='top' style={{marginBottom :'20px'}}>
         <Button type="primary" onClick={(e:any)=> navigate(`/admin/services/${"New"}`)}>
           Create New Service
         </Button> 
       </Row>
     <Table columns={columns} dataSource={services||[]} loading={isLoadingServices} />
    </div>
  );
}

export default ServicesListPage;
