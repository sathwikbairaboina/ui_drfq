
import React, {useState , useEffect} from 'react';
import { Table, Button, Row } from 'antd';
import {get, isEmpty} from 'lodash';
import { useNavigate  } from "react-router-dom";
import ReactJson from 'react-json-view'
import {defaultFormFields} from './defaultJson'
import { EyeOutlined } from '@ant-design/icons';
import RfqFormFields from './RfqFormFields';



type Props = {
  rfqBasicFormDetails?: any;
  setUpdatedFormFields: any
  
};

const ServicesFormFieldTable = ({rfqBasicFormDetails , setUpdatedFormFields}: Props) => {
   let stringToJsonObject = {};
    if(rfqBasicFormDetails){
    var arrayToString = JSON.stringify(Object.assign({}, rfqBasicFormDetails));  // convert array to string
    stringToJsonObject = JSON.parse(arrayToString);  // convert string to json object
    }
    const [isPreviewVisible,setPreviewVisible] = useState(false);
    const [updatedJson, setUpdatedJson] = useState(isEmpty(stringToJsonObject) ? defaultFormFields: stringToJsonObject);
    const [updatedArray, setUpdatedArray] = useState([]);

     console.log('updatedJson',updatedJson);

    useEffect(()=>{
          var result:any = [];
          for(var i in updatedJson){
            result[i]=get(updatedJson,`[${i}]`);
          }
          setUpdatedArray(result);
          setUpdatedFormFields(result);
    },[updatedJson])




    console.log('updatedArray',updatedArray);

    const handlePreviewCancel =()=>{
            setPreviewVisible(false);
      }



  return (
    <div>
        {!isEmpty(updatedArray)&&<RfqFormFields
          isVisible={isPreviewVisible}
          onCancel={handlePreviewCancel}
          getAllFields={updatedArray || []}
        />}
      <Row justify='end' align='top' style={{marginBottom :'20px'}}>
         <Button type="default" onClick={() => setPreviewVisible(true)} icon={<EyeOutlined />}>
          Preview RFQ Dynamic Form Fields
         </Button> 
       </Row>
       <ReactJson src={updatedJson} onEdit={(e:any)=> setUpdatedJson(get(e,'updated_src')||{})}
       onDelete ={(e:any)=>  setUpdatedJson(get(e,'updated_src')||{})}/>
    </div>
  );
}

export default ServicesFormFieldTable;
