import { Button, Col, Form, Input, Row, message } from "antd";
import { createCompany, getCompanyByEmail, getCompanyByPhone } from "../../services/companyService";
import { useNavigate } from "react-router-dom";
import { getToken } from "../../helpers/generateToken";

function Register(){
  const rules=[
    {
      required: true,
      message: 'Bắt buộc',
    },
  ];
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const handleSubmit = async (e) => {
    const companyByPhone = await getCompanyByPhone(e.phone);
    const companyByEmail = await getCompanyByEmail(e.email);
    if(companyByPhone.length > 0 || companyByEmail.length > 0){
      messageApi.open({
        type: 'error',
        content: 'Số điện thoại hoặc email đã tồn tại',
      });
    }
    else{
      const response = createCompany({
        ...e,
        token: getToken()
      });
      if(response){
        navigate("/login");
      }
    }
  }
  return(
    <>
      {contextHolder}
      <Form onFinish={handleSubmit} layout = "vertical" style={{border: "1px solid #ddd", borderRadius: "10px", padding: "20px", maxWidth: "450px", marginLeft: "auto", marginRight: "auto"}}>
        <h2>Đăng kí tài khoản</h2>
        <Row gutter={[10,10]}>
            <Col span={24} >
              <Form.Item
                  label="Tên công ty"
                  name="companyName"
                  rules={rules}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Bắt buộc',
                      type: "email"
                    },
                  ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                  label="Số điện thoại"
                  name="phone"
                  rules={rules}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                  label="Password"
                  name="password"
                  rules={rules}
              >
                <Input.Password />
              </Form.Item>
            </Col>
            <Button type="primary" htmlType="submit">Đăng kí</Button>
        </Row>
      </Form>
    </>
  )
}
export default Register;