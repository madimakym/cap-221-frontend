import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { MenuOutlined, LoginOutlined } from "@ant-design/icons";
import "./styles/style.scss";

const { Sider } = Layout;

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <>
      <Sider className="sidebar">
        <div className="logo">CAP221</div>
        <br />
        <Menu
          selectedKeys={[location.pathname]}
          defaultSelectedKeys={["/"]}
          mode="inline"
        >
          <Menu.Item key="/dashboard">
            <NavLink to="/dashboard">
              <MenuOutlined />
              <span>Dashboard</span>
            </NavLink>
          </Menu.Item>

          <Menu.Item key="/metiers">
            <NavLink to={"/metiers"}>
              <MenuOutlined />
              <span>Metiers</span>
            </NavLink>
          </Menu.Item>

          <Menu.Item>
            <span onClick={() => handleLogout()} className="logout-link">
              <LoginOutlined />
              <span>Deconnexion</span>
            </span>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
}

export default Sidebar;
