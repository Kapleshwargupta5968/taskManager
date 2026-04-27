import React from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import CreateTask from '../task/CreateTask';
import ViewTask from '../task/ViewTask';
const { Header, Content, Footer, Sider } = Layout;
const items = [UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
  (icon, index) => ({
    key: String(index + 1),
    icon: React.createElement(icon),
    label: `nav ${index + 1}`,
  }),
);

const menuItems = [
    {key:1,label:"Dashboard",path:"/dashboard"},
    {key:2,label:"Create Task",path:"/createTask"},
    {key:3,label:"View Tasks",path:"/viewTasks"},
    {key:4,label:"Profile",path:"/profile"},
]

const Dashboard = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const currentYear = new Date().getFullYear();
  const [selectedKey, setSelectedKey] = React.useState("1");

  const renderContent = () => {
    switch(selectedKey){
        case "1":
            return <div>Dashboard</div>;
        case "2":
            return <div><CreateTask/></div>;
        case "3":
            return <div><ViewTask/></div>;
        case "4":
            return <div>Profile</div>;
        default:
            return <div>Dashboard</div>;
    }
  }
  
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={broken => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={menuItems} onClick={(e) => setSelectedKey(e.key)} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          Ant Design ©{currentYear} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default Dashboard;