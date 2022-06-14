
import React,{useState , useEffect} from 'react';
import { Table, Button, Row ,Modal,Col} from 'antd';
import {get, isEmpty} from 'lodash';
import { useNavigate  } from "react-router-dom";
import AddOrUpdateStep from './AddOrUpdateStep';
import RfqProcessSteps from './RfqProcessSteps'
import { EyeOutlined } from '@ant-design/icons';



type Props = {
  rfqSteps?: any;
  setUpdatedSteps:any;
};

const ServiceStepsTable = ({rfqSteps, setUpdatedSteps}: Props) => {
  let navigate = useNavigate ();
  const [isCCModalVisible, setCCModalVisible] = useState(false);
  const [isPreviewVisible,setPreviewVisible] = useState(false);
  const [editObj, setEditObj] = useState({});
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);
  const [locSteps, setLocSteps] = useState(rfqSteps||[]);

    useEffect(()=>{
     setUpdatedSteps(locSteps)
    },[locSteps])








  const renderViewService = (id:string) => {
    return  (<Button type="link" onClick={()=> navigate({pathname: `/admin/services/${id}`})} >
        View Service
      </Button>)
    }
  
  const confirmDelete = ({id}:{id:string}) =>
    Modal.confirm({
      title: `Delete  Step ?`,
      content: 'Are you sure you want to delete this Step?',
      okText: 'Ok',
      centered: true,
      onOk: () => handleDelete(id),
    });

  const handleDelete =  async (id:string) => {
    console.log('sasa',id)
    setIsUpdateLoading(true);
    const temp:any = [...locSteps];
    const index = temp.findIndex((item:any) => item.id === id);

    if (index > -1) {
      temp.splice(index, 1);
    }
    setLocSteps(temp);
    
    // await updateCCAndDispatchRedux(temp);
  };

  const renderEditDeleteOptions =  (record:any) => {
    return  (
    <Row> 
    <Button type="link" onClick={()=>handleEdit(record)}>
        Edit
    </Button>
    <Button type="link" danger  onClick={()=> confirmDelete(record)}>
        Delete
    </Button>
    </Row>   
      )
    }


    const columns:any = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      width:'40%'
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'title',
      width:'40%'

    },
    {
      render: renderEditDeleteOptions
    },
 ];

  const handleCancel = () => {
    setCCModalVisible(false);
    setEditObj({});
  };

  const handlePreviewCancel =()=>{
        setPreviewVisible(false);
  }

  const handleEdit = (item:any) => {
    setEditObj(item);
    setCCModalVisible(true);
  };

    const handleSubmit = ({title, description, isEdit}:{title:string, description:string, isEdit:boolean}) => {
    setIsUpdateLoading(true);
    let temp:any = [...locSteps];
    if (isEdit) {
      const id = get(editObj, 'id');
      const index = temp.findIndex((item:any) => item.id === id);
      if (index > -1) {
        temp[index] = {id: id, title: title, description};
      }
    } else {
      temp.push({
        id: temp.length,
        title,
        description,
      });
    }
    // updateCCAndDispatchRedux(temp);
    setLocSteps(temp);
    setIsUpdateLoading(false);
    setCCModalVisible(false);
    setEditObj({});
  };


  return (
    <div>
        <AddOrUpdateStep
          isVisible={isCCModalVisible}
          editObj={editObj}
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          isLoading={isUpdateLoading}
          getAllRows={locSteps}
        />
        {!isEmpty(locSteps)&&<RfqProcessSteps 
          isVisible={isPreviewVisible}
          onCancel={handlePreviewCancel}
          getAllSteps={locSteps}
        />}
      <Row gutter={20} justify='end' align='top' style={{marginBottom :'20px'}}>
         <Col>
         <Button type="default" onClick={() => setPreviewVisible(true)} icon={<EyeOutlined />}>
          Preview Rfq Process Steps
         </Button> 
         </Col>        
        <Col>
         <Button type="primary" onClick={() => setCCModalVisible(true)}>
          Add New Step
         </Button>
         </Col>

       </Row>
     <Table columns={columns} dataSource={locSteps} />
    </div>
  );
}

export default ServiceStepsTable;
