import { useEffect, useState } from "react";
import { getCompany } from "../../services/companyService";
import { Card, Col, Row } from "antd";
import { useNavigate } from "react-router-dom";

function Company(){
  const [company, setCompany] = useState([]);
  useEffect(() => {
    const fectchApi = async () => {
      const result = await getCompany();
      setCompany(result);
    }
    fectchApi();
  },[])
  const navigate = useNavigate();
  const handleClick = (id) => {
    navigate(`/company/${id}`);
  }
  return(
    <>
      <div className="container">
        <h1>Danh sách các công ty</h1>
        <Row gutter={[20,20]}>
          {company && company.map(item => (
            <Col span={8} key={item.id}>
              <Card onClick={() => handleClick(item.id)} style={{cursor: "pointer"}}>
                <p>Công ty: <strong>{item.companyName}</strong></p>
                <p>Số điện thoại: <strong>{item.phone}</strong></p>
                <p>Số nhân sự: <strong>{item.quantityPeople}</strong></p>
                <p>Website: <strong>{item.website}</strong></p>
                <p>Địa chỉ: <strong>{item.address}</strong></p>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  )
}

export default Company;