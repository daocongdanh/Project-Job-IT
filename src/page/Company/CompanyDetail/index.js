import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {getCompany, getCompanyById} from "../../../services/companyService";
import { getJobsByIdCompany } from "../../../services/jobService";
import { Card, Col, Row, Tag } from "antd";
function CompanyDetail() {
  const [companyDetail, setCompanyDetail] = useState([]);
  const [jobs, setJobs] = useState([]);
  const param = useParams();
  const {id} = param;
  useEffect(() =>{
    const fetchApi = async () => {
      const result = await getCompanyById(id);
      setCompanyDetail(result);
      const job = await getJobsByIdCompany(id);
      const company = await getCompany();
      const data = [];
      job.forEach(item => {
        data.push({
          ...company.find(itemCp => itemCp.id === item.idCompany),
          ...item
        })
      });
      setJobs(data);
    }
    fetchApi();
  },[])
  console.log(jobs);
  return(
    <>
      <div className="container" style={{fontSize: "18px"}}>
        <h1>{companyDetail.companyName}</h1>
        <p>Địa chỉ: <strong>{companyDetail.address}</strong></p>
        <p>Số lượng nhân sự: <strong>{companyDetail.quantityPeople}</strong></p>
        <p>Thời gian làm việc: <strong>{companyDetail.workingTime}</strong></p>
        <p>Link website: <strong>{companyDetail.website}</strong></p>
        <p>Mô tả ngắn: </p>
        <p>{companyDetail.description}</p>
        <p>Mô tả chi tiết: </p>
        <p>{companyDetail.detail}</p>
        <p>Danh sách các job:</p>
        <Row gutter={[20,20]}>
          {jobs.length > 0  && jobs.map(item => (
            <Col span={8} key={item.id}>
              <Card>
                <Link to={`/job/${item.id}`}>{item.name}</Link>
                <p>Ngôn ngữ: {item.tags.map((itemTag,index) => (
                  <Tag color="blue" key={index+item.id}>{itemTag}</Tag>
                ))}</p> 
                <p>Thành phố: {item.city.map((itemCity,index) => (
                  <Tag color="orange" key={index+item.id}>{itemCity}</Tag>
                ))}</p>
                <p>Lương: <strong>{item.salary} $</strong></p>
                <p>Công ty: <strong>{item.companyName}</strong></p>
                <p>Ngày tạo: <strong>{item.createAt}</strong></p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  )
}

export default CompanyDetail;