import React, { useState, useReducer } from "react";
import AppTable from "./AppTable";
import {
  DatePicker,
  Row,
  Col,
  Layout,
  Menu,
  Icon,
  Breadcrumb,
  Dropdown,
  message
} from "antd";
import "./Style.css";
import "antd/dist/antd.css";
import Data from "./Data";
import { reducer } from "./reducers";
// import moment from "moment";
export const MyContext = React.createContext();

const initialState = [...Data];

const App = () => {
  const [dataSource, dispatch] = useReducer(reducer, initialState);

  const [collapsed, setCollapsed] = useState(false);

  const { Header, Footer, Sider, Content } = Layout;

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const handleMenuClick = e => {
    message.info("Click on menu item.");
    console.log("click", e);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1">
        <Icon type="user" />
        Edit Profile
      </Menu.Item>
      <Menu.Item key="2">
        <Icon type="logout" />
        Sign out
      </Menu.Item>
    </Menu>
  );
  return (
    <MyContext.Provider
      value={{ myDataSource: dataSource, myDispatch: dispatch }}
    >
      <Layout>
        <Sider
          width={200}
          style={{ background: "#fff" }}
          trigger={null}
          collapsible
          collapsedWidth={0}
          collapsed={collapsed}
        >
          <div className="logo">
            <h2>
              <a href="http://www.e-technostar.com/" target="_blank">
                <img
                  alt="/"
                  width={160}
                  src="http://www.e-technostar.com/beta2016/wp-content/uploads/2019/04/technostar_logo_w210.png"
                />
              </a>
            </h2>
          </div>
          <Menu mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Icon type="form" />
              <span>Input Daily Data</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="area-chart" />
              <span>Weekly Review</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="area-chart" />
              <span>Monthly Review</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="calendar" />
              <span>Daily History</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Layout>
            <Header>
              <Row type="flex" justify="space-between">
                <Col span={3}>
                  <Icon
                    className="trigger"
                    type={collapsed ? "menu-unfold" : "menu-fold"}
                    onClick={toggle}
                  />
                </Col>
                <Col span={3} offset={18}>
                  <Dropdown.Button overlay={menu} icon={<Icon type="user" />}>
                    User's Name
                  </Dropdown.Button>
                </Col>
              </Row>
            </Header>
          </Layout>
          <Layout style={{ padding: "0 15px 15px" }}>
            <Breadcrumb style={{ margin: "16px 0" }} />
            <Content
              style={{
                padding: "20px 50px",
                borderRadius: "2px",
                position: "relative",
                transition: "all .3s"
              }}
            >
              <Row type="flex" justify="end">
                <Col span={2}>
                  <DatePicker
                    // defaultValue={moment(`${moment()}`)}
                    onChange={onChange}
                  />
                </Col>
              </Row>

              <AppTable />
            </Content>
          </Layout>
          <Footer>
            <h3 style={{ margin: "20px 20px" }}>Made with ❤ by Akiyama</h3>
          </Footer>
        </Layout>
      </Layout>
    </MyContext.Provider>
  );
};

export default App;
