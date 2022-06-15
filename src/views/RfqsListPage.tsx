
import React from 'react';
import { Table, Button, Row ,Select , Col} from 'antd';
import {get, isEmpty} from 'lodash';
import { useNavigate  } from "react-router-dom";
import { selectRfqs } from '../app/redux/redux';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectServices , reduxGetRfqByService ,selectLoadingRfqs, reduxGetAllRfqs } from '../app/redux/redux';
import { type } from 'os';



type Props = {
  status?: string;
};

const RfqListPage = (props: Props) => {
  const rfqs = useAppSelector(selectRfqs);
  console.log('hey', rfqs);

  const dispatch = useAppDispatch();

  
  const services =useAppSelector(selectServices);
  const isLoadingRfqs =useAppSelector(selectLoadingRfqs)
  

//  const [currentService, setCurrentService] = useState<any>(null);

   const suggestions = (services||[]).map((val:any) => {return {
      label: get(val,'name'),
      value: get(val,'id'),
      description: get(val,'description'),
      id: get(val,'id'),
      rfqBasicFormDetails:get(val,'rfqBasicFormDetails'),
      rfqSteps:get(val,'rfqSteps')
    }});
  

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
    <Row style={{padding:20}} gutter={10}>
      <Col>
          <Select  
          placeholder='Search w.r.t service'
          showSearch style={{ width: 300 }} 
          onSelect={(e:any)=>{
                    dispatch(reduxGetRfqByService(e));
            }}
            options={suggestions||[]}
            />
        </Col>
        <Col>    
        <Button type='primary' onClick={()=> dispatch(reduxGetAllRfqs())}>
            Refresh
        </Button>
        </Col>
   </Row>
     <Table columns={columns} dataSource={rfqs || []} loading={isLoadingRfqs} />
    </div>
  );
}

export default RfqListPage;
