import { Menu } from 'antd';
import {DashboardOutlined, UnorderedListOutlined, BookOutlined, UserOutlined} from "@ant-design/icons";
import { Link } from 'react-router-dom';
function MenuSider(){
  const items = [
    {
      key: "Tổng quan",
      label: <Link to = {"/admin"}>Tổng quan</Link>,
      icon: <DashboardOutlined />
    },
    {
      key: "Thông tin công ty",
      label: <Link to = {"/infor-company"}>Thông tin công ty</Link>,
      icon: <UserOutlined />,
    },
    {
      key: "Quản lý việc làm",
      label: <Link to={"/job-manage"}>Quản lý việc làm</Link>,
      icon: <UnorderedListOutlined />,
    },
    {
      key: "Quản lý CV",
      label: <Link to={"/cv-manage"}>Quản lý CV</Link>,
      icon: <BookOutlined />
    }
  ]
  return(
    <>
      <Menu
        mode="inline"
        items={items}
        defaultSelectedKeys = {["Tổng quan"]}
      />
    </>
  )
}

export default MenuSider;