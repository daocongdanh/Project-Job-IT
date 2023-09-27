import { Button, Table, Tag, Tooltip } from "antd";
import { useEffect, useState } from "react";
import { getJobs } from "../../services/jobService";
import { getCookie } from "../../helpers/cookie";
import { getCVIdCompany, updateCV } from "../../services/cvService";
import {EyeOutlined} from "@ant-design/icons"
import DeleteCV from "./deleteCV";
import { Link } from "react-router-dom";

function CVManage(){
  const [cv, setCV] = useState("");
  const [isRead, setIsRead] = useState(false);
  const fetchApi = async () => {
    const cvByIdCompany = await getCVIdCompany(parseInt(getCookie("id")));
    const listJob = await getJobs();
    const result = [];
    cvByIdCompany.forEach(item => {
      result.push({
        ...item,
        jobName: listJob.find(job => job.id ===item.idJob).name
      })
    });
    setCV(result.reverse());
  }
  useEffect(() => {
    fetchApi();
  },[isRead])
  const onReload = () => {
    fetchApi();
  }
  const handleClick = async (id) => {
    const response = await updateCV(id, {
      statusRead: true
    });
    if(response){
      setIsRead(true);
    }
  }
  const columns = [
    {
      title: 'Tên job',
      dataIndex: 'jobName',
      key: 'jobName',
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Ngày gửi',
      dataIndex: 'createAt',
      key: 'createAt',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      render: (_,record) => {
        return<>
          {record.statusRead ? (
            <Tag color="green">Đã đọc</Tag>
          ) : (
            <Tag color="gray">Chưa đọc</Tag>
          )}
        </>
      }
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      key: 'action',
      render: (_,record) => {
        return<>
          <div>
            <Link to={`/cv-detail/${record.id}`}><Tooltip title="Xem chi tiết"><Button onClick={() => handleClick(record.id)} icon= {<EyeOutlined />} ></Button></Tooltip></Link>
          </div>
          <DeleteCV record={record}  onReload = {onReload}/>
        </>
      }
    },
  ];
  return(
    <>
      <h2>Danh sách CV</h2>
      <Table columns={columns} bordered dataSource={cv} rowKey={"id"}/>
    </>
  )
}

export default CVManage;