import { Button, Layout} from "antd";
import "./LayoutDefault.css"
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {LoginOutlined, UserOutlined} from "@ant-design/icons"
import { isLogin } from "../../components/actions/Login";
import { getCookie, setCookie } from "../../helpers/cookie";
const {Footer, Content } = Layout;
function LayoutDefault(){
  const Login = useSelector(state => state.loginReducer);
  const dispatch = useDispatch();
  const handleClick = () => {
    setCookie("token",getCookie("token"),0);
    setCookie("id",getCookie("id"),0);
    dispatch(isLogin(false));
  }
  return(
    <> 
      <Layout className="layout-default">
        <header className="header">
          <div className="container">
            <div className="inner-header">
              <Link to="/" className="header__left">
                IT Jobs
              </Link>
              <div className="header__right">
              {Login ? (
                <>
                  <Link to="/admin"><Button style={{marginRight: "20px"}} icon={<UserOutlined />}>Quản lý</Button></Link>
                  <Link to="/"><Button onClick={handleClick} icon = {<LoginOutlined />}>Đăng xuất</Button></Link>
                </>
              ) : (
                  <>
                    <Link to="/login"><Button style={{marginRight: "20px"}}>Đăng nhập</Button></Link>
                    <Link to="/register"><Button type="primary">Đăng kí</Button></Link>
                  </>
              )}
              </div>
            </div>
          </div>
        </header>
        <Content className="content">
          <Outlet />
        </Content>
        <Footer className="footer">
          Copyright @ 2022 Danh
        </Footer>
      </Layout>
    </>
  )
}

export default LayoutDefault;