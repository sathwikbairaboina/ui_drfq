// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { useState } from 'react';
import { Layout, Menu, Row } from 'antd';
import {Link} from 'react-router-dom';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  CloudServerOutlined,
  SnippetsOutlined,
} from '@ant-design/icons';
import styles from './styles.module.css';


const { Header, Sider, Content } = Layout;

type Props = {
  HeaderElement?: any;
  Component: any;
};

const AdminLayout = ({Component, HeaderElement}: Props) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme='light'>


        <div className={styles.logo} />
        <Row style={{padding:'20px'}}>
            
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}

        </Row>
        <Menu
         theme='light'
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
             label: (
                 <Link to={`/admin`} >
                    Home
                 </Link>
              ),
            },
            {
              key: '2',
              icon: <CloudServerOutlined />,
             label: (
                 <Link to={`/admin/services`} >
                    Services
                 </Link>
              ),
            },
            {
              key: '3',
              icon: <SnippetsOutlined />,
             label: (
                 <Link to={`/admin/orders`} >
                    Orders
                 </Link>
              ),
            },
          ]}
        />
      </Sider>
      <Layout className={styles.sitelayout}>
        <Header className={styles.sitelayoutbackground} style={{ padding: 0 }}>
          {HeaderElement} 
       </Header>
        <Content
          className={styles.sitelayoutbackground}
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Component/>
        </Content>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
