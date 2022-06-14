
import React,{useState, useEffect} from 'react';
import { Modal , Row , Form , Input, Col ,Spin, Card , Button} from 'antd';
import history from '../helpers/history';
import UpdateOrderSteps from '../components/UpdateOrderSteps'

import {getRfqById , createOrUpdateRfq} from '../graphQl/queries'
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {get , isEmpty} from 'lodash';
import { useNavigate  } from "react-router-dom";

const {TextArea} = Input;
const { confirm } = Modal;



type Props = {
  userPage?: boolean;
  user:any;
};

const RfqDetailPage
 = ({userPage ,user}: Props) => {
    let navigate = useNavigate ();
    const [form] = Form.useForm();
    const idUrl = window.location.pathname.substring(window.location.pathname.lastIndexOf('/')+1);
    const [isLoading, setIsLoading] = useState(true);
    const [updatedSteps, setUpdatedSteps] = useState<any>([]);
    const [updatedFormFields, setUpdatedFormFields] = useState<any>([]);
    const [isUpdateLoading, setIsUpdateLoading] = useState(false);
    const [rfqData, setrfqData] = useState<any>({});
    const [currentStep, setCurrentStep] = useState<any>(1);
    const [comments, setComments] = useState<any>('');

    const length = (get(rfqData,'service.rfqSteps')||[]).length-1;


    useEffect(()=>{
      if(idUrl!=='rfq'){
      getRfqById(idUrl)
      .then((res)=>{setrfqData(res); 
        form.setFieldsValue({
          name: get(rfqData,'name'),
          description: get(rfqData,'description'),
          })
      
      })
      .finally(()=>setIsLoading(false));
      }
    },[idUrl]);

    useEffect(()=>{
      if(rfqData){
      let statusIndex = (get(rfqData,'service.rfqSteps')||[]).findIndex((step:any)=>get(step,'title')===get(rfqData,'status'));
      setCurrentStep(statusIndex);
      console.log('step', get(rfqData,'service.rfqSteps') , statusIndex)
      }

    },[rfqData]);

    const handleConfirm = ():any=> confirm({
    title: 'Do you Want to update Order Status?',
    icon: <ExclamationCircleOutlined />,
    onOk(){
      handleSubmit();
    },
  });

    const handleSubmit = async() => {
        const payload= {
          id:get(rfqData, 'id',undefined),
          userName:get(rfqData,'userName'),
          userId:get(rfqData,'userId'),
          additionalDetails:comments,
          status:get(rfqData,`service.rfqSteps[${currentStep}].title`)
        }

          await createOrUpdateRfq(payload)
          .then(res=>console.log('updateRes',res))
          .finally(()=>setIsUpdateLoading(false));

    }

    const rfqDetails = ()=> <Row style={{margin:'20px'}}>
    {(get(rfqData,'basicFormDetails')||[]).map((element:any)=> <Row > <Col span={10} style={{width:'100px'}}> <h4> {get(element,'label')} : </h4></Col> 
    <Col span={10} style={{width:'200px'}}> {get(element,'value')}</Col></Row>)}
    </Row>

  return (
    <div>
      {!isLoading && userPage &&
      <Row  gutter={8}>
            <Col span={18}>
             {''} 
             </Col>
            <Col>
              <Button type="link" onClick={()=> navigate({pathname: `/admin`})} size='large' style={{color:'green' , padding:'20px',float:'right'}}>
                Admin
              </Button> 
              <Button type="link" onClick={()=> navigate({pathname: `/`})} size='large' style={{color:'green' , padding:'20px',float:'right'}}>
                Home
              </Button> 
           </Col>
    </Row>
      }
      {!isLoading?
     <Card style={{width:'80%' ,margin:"20px"}}>
          <Row>
          <h3>Order Details</h3>
          </Row>
          <p>Basic Order Details received while placing order</p>
          {rfqDetails()}
          <Row style={{margin:'5%'}}>
          <UpdateOrderSteps currentStep={currentStep} setCurrentStep={setCurrentStep} getAllSteps={get(rfqData,'service.rfqSteps')||[]} userPage={userPage}/>
          </Row>
          {!userPage && <Row justify='end' gutter={8}>
            <Col span={10}>
            <TextArea rows={4} placeholder="Additional Comments" onPressEnter={(e:any)=>setComments(e.target.value)}/>
            </Col>
             <Col span={10}>
            <Button type="primary" onClick={handleConfirm} loading={isUpdateLoading}>
              {"Submit"}
            </Button>
            </Col>
          </Row>}
    </Card>   : <Spin/>   
       }
    </div>
  );
}

export default RfqDetailPage
;
