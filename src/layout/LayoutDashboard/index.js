import { Button, Layout} from "antd";
import "./LayoutDashboard.css"
import {MenuFoldOutlined, MenuUnfoldOutlined, HomeOutlined, LoginOutlined} from "@ant-design/icons";
import { useState } from "react";
import MenuSider from "../../components/MenuSider";
import { Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCookie, setCookie } from "../../helpers/cookie";
import { isLogin } from "../../components/actions/Login";
const {Sider, Content } = Layout;
function LayoutDashboard(){
  const [collapsed, setCollapsed] = useState(false);
  const handleClick = () => {
    setCollapsed(!collapsed);
  }
  const dispatch = useDispatch();
  const handleLogout = () => {
    setCookie("token",getCookie("token"),0);
    setCookie("id",getCookie("id"),0);
    dispatch(isLogin(false));
  }
  return(
    <> 
      <Layout className="layout">
        <header className="header">
          <div className={collapsed ? ("header__logo header__logo--collapsed") : ("header__logo")} >
            {collapsed ? (
              <Link to={"/admin"}>IT</Link>
            ) : (
              <Link to={"/admin"}>IT Admin</Link>
            )}
          </div>
          <div className="header__nav">
            <div className="header__nav-left">
              <div className="header__collapsed header--hover" onClick = {handleClick}>
                {collapsed ? (
                  <MenuUnfoldOutlined />
                ) : (
                  <MenuFoldOutlined />
                )}
              </div>
            </div>
            <div className="header__nav-right">
              <Link to="/"><Button style={{marginRight: "20px"}} icon={<HomeOutlined />}>Trang chủ</Button></Link>
              <Link to="/"><Button onClick={handleLogout} icon = {<LoginOutlined />}>Đăng xuất</Button></Link>
            </div>
          </div>
        </header>

        <Layout>
          <Sider className="sider" collapsed={collapsed} theme="light">
            <MenuSider />
          </Sider>

          <Content className="content">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  )
}

export default LayoutDashboard;