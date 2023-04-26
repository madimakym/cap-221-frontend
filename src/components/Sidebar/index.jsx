import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { MenuOutlined, LoginOutlined } from "@ant-design/icons";
import "./styles/style.scss";
import { getUser } from "../../utils/global-var";

const { Sider } = Layout;

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const userData = getUser();

  const handleLogout = () => {
    navigate("/login");
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
          {userData.role === "admin" ? (
            <>
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

              <Menu.Item key="/articles">
                <MenuOutlined />
                <span>
                  <a
                    href="https://www.blog.cap221.com/wp-admin/edit.php?post_type=post"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Articles
                  </a>
                </span>
              </Menu.Item>
            </>
          ) : (
            ""
          )}

          {userData.role === "user" ? (
            <>
              <Menu.Item key="/posts">
                <NavLink to={"/posts/2"}>
                  <MenuOutlined />
                  <span>Articles</span>
                </NavLink>
              </Menu.Item>
            </>
          ) : (
            ""
          )}

          <Menu.Item>
            <span onClick={() => handleLogout()} className="logout-link">
              <LoginOutlined />
              <span style={{ fontSize: "17px" }}>Deconnexion</span>
            </span>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
}

export default Sidebar;
