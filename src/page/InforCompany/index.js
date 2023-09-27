import { Button, Col, Form, Input, Row, message } from "antd";
import { useEffect, useState } from "react";
import { getCompanyById, updateCompany } from "../../services/companyService";
import { getCookie } from "../../helpers/cookie";
const { TextArea } = Input;
function InforCompany(){
  const [company, setCompany] = useState("");
  const [disabled, setDisabled] = useState(true);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCompanyById(parseInt(getCookie("id")));
      setCompany(result);
    }
    fetchApi();
  },[])
  const [messageApi, contextHolder] = message.useMessage();
  const handleSubmit = async (e) => {
    const response = await updateCompany(parseInt(getCookie("id")),e);
    if(response){
      setDisabled(true);
      messageApi.open({
        type: 'success',
        content: 'Cập nhật thành công',
      });
    }
    else{
      messageApi.open({
        type: 'error',
        content: 'Cập nhật thất bại',
      });
    }
  }
  return(
    <>
      {contextHolder}
      <div className="infor">
        {company && (
          <>
            <div className="header" style={{display: "flex", justifyContent: "space-between"}}>
              <h2>Thông tin công ty</h2>
              <Button onClick={() => setDisabled(!disabled)}>{disabled ? ("Chỉnh sửa") : ("Hủy")}</Button>
            </div>
            <Form layout="vertical" initialValues={company} disabled = {disabled} onFinish={handleSubmit}>
              <Row gutter={[10]}>
                <Col span={24}>
                  <Form.Item
                    name="companyName"
                    label="Tên công ty"
                    rules={[
                      {
                        required: true,
                        message: "Bắt buộc"
                      }
                    ]}
                  >
                    <Input/>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: "Bắt buộc",
                        type : "email"
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="phone"
                    label="Số điện thoại"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="address"
                    label="Địa chỉ"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="quantityPeople"
                    label="Số lượng nhân sự"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="workingTime"
                    label="Thời gian làm việc"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="website"
                    label="Link website"
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="description"
                    label="Mô tả ngắn"
                  >
                    <TextArea rows={4} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="detail"
                    label="Mô tả chi tiết"
                  >
                    <TextArea rows={8} />
                  </Form.Item>
                </Col>
                {disabled ? (
                  <></>
                ) : (
                  <>
                    <Button htmlType="submit" type="primary" style={{marginRight: "20px"}}>Cập nhật</Button>
                    <Button onClick={() => setDisabled(true)}>Hủy</Button>
                  </>
                )}
              </Row>
            </Form>
          </>
        )}
      </div>
    </>
  )
}

export default InforCompany;