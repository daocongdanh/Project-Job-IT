import { Button, Table, Tag, Tooltip } from "antd";
import {PlusOutlined, EyeOutlined} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getJobsByIdCompany } from "../../services/jobService";
import { getCookie } from "../../helpers/cookie";
import { Link } from "react-router-dom";
import UpdateJob from "./updateJob";
import DeleteJob from "./deleteJob";
function JobManage(){
  const [jobs, setJobs] = useState();
  const [reLoad, setReLoad] = useState(false);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getJobsByIdCompany(parseInt(getCookie("id")));
      setJobs(result.reverse());
    }
    fetchApi();
  },[reLoad])
  const onReLoad = () => {
    setReLoad(!reLoad);
  }
  const columns = [
    {
      title: 'Tên job',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      render: (_,record) => {
        return <>
          {record.tags.map((item, index) => (
            <Tag key={index} color="blue">{item}</Tag>
          ))}
        </>
      }
    },
    {
      title: 'Mức lương ($)',
      dataIndex: 'salary',
      key: 'salary',
    },
    {
      title: 'Thời gian',
      dataIndex: 'createAt',
      key: 'createAt',
      render: (_,record) => {
        return <>
          <p>Ngày tạo: {record.createAt}</p>
          <p>Cập nhật: {record.updateAt}</p>
        </>
      }
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_,record) => {
        return <>
          {record.status ? (
            <Tag color="green">Đang bật</Tag>
          ) : (
            <Tag color="red">Đang tắt</Tag>
          )}
        </>
      }
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (_,record) => {
        return <>
          <Link to={`/job-detail/${record.id}`} ><Tooltip title="Xem chi tiết"><Button icon={<EyeOutlined />}></Button></Tooltip></Link>
          <UpdateJob record = {record} onReLoad = {onReLoad}/>
          <DeleteJob record = {record} onReLoad = {onReLoad}/>
        </>
      }
    },
  ];
  return(
    <>
      <h2>Danh sách việc làm</h2>
      <Link to={"/create-job"}><Button icon = {<PlusOutlined />} style={{marginBottom: "20px"}}>Tạo việc mới</Button></Link>
      <Table bordered columns={columns} dataSource={jobs} rowKey={'id'}/>
    </>
  )
}

export default JobManage;