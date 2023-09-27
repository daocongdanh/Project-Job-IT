import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { getJobsByIdCompany } from "../../services/jobService";
import { getCookie } from "../../helpers/cookie";
import { getCVIdCompany } from "../../services/cvService";
import { getCompanyById } from "../../services/companyService";

function Admin(){
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchApi = async () => {
      const jobByIdCompany = await getJobsByIdCompany(parseInt(getCookie("id")));
      const cvByIdCompany = await getCVIdCompany(parseInt(getCookie("id")));
      const companyById = await getCompanyById(parseInt(getCookie("id")));
      const totalJob = jobByIdCompany.reduce((total,item) => {
        if(item.status)
          return total + 1;
        return total;
      },0)
      const totalCV = cvByIdCompany.reduce((total,item) => {
        if(item.statusRead)
          return total + 1;
        return total;
      },0)
      const result = [
        {
          size: jobByIdCompany.length,
          jobTrue: totalJob,
          jobFalse: jobByIdCompany.length-totalJob
        },
        {
          size: cvByIdCompany.length,
          CVTrue: totalCV,
          CVFalse: cvByIdCompany.length-totalCV
        },
        companyById
      ];
      setData(result);
    }
    fetchApi();
  },[])
  return(
    <>
      <div className="admin">
        {data.length > 0 && (
          <>
            <h2>Tổng quan</h2>
            <Row gutter={[20,20]}>
              <Col span={8}>
                <Card title="Job">
                  <p>Số lượng job: <strong>{data[0].size}</strong></p>
                  <p>Job đang bật: <strong>{data[0].jobTrue}</strong></p>
                  <p>Job đang tắt: <strong>{data[0].jobFalse}</strong></p>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="CV">
                  <p>Số lượng CV: <strong>{data[1].size}</strong></p>
                  <p>CV chưa đọc: <strong>{data[1].CVFalse}</strong></p>
                  <p>CV đã đọc: <strong>{data[1].CVTrue}</strong></p>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Thông tin công ty">
                  <p>Tên công ty: <strong>{data[2].companyName}</strong></p>
                  <p>Email: <strong>{data[2].email}</strong></p>
                  <p>Số điện thoại: <strong>{data[2].phone}</strong></p>
                  <p>Nhân viên: <strong>{data[2].quantityPeople}</strong></p>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </div>
    </>
  )
}

export default Admin;