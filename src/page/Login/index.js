import { Button, Col, Form, Input, Row, message } from "antd";
import { getCompanyByPassAndEmail } from "../../services/companyService";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookie";
import {useDispatch} from "react-redux";
import { isLogin } from "../../components/actions/Login";
function Login(){
  const rules=[
    {
      required: true,
      message: 'Bắt buộc',
    },
  ];
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    const response = await getCompanyByPassAndEmail(e.password,e.email);
    if(response.length > 0){
      setCookie("token",response[0].token,1);
      setCookie("id",response[0].id,1);
      dispatch(isLogin(true));
      navigate("/");
    }
    else{
      messageApi.open({
        type: 'error',
        content: 'Email hoặc password sai',
      });
    }
  }
  return(
    <>
      {contextHolder}
      <Form onFinish={handleSubmit} layout = "vertical" style={{border: "1px solid #ddd", borderRadius: "10px", padding: "20px", maxWidth: "450px", marginLeft: "auto", marginRight: "auto"}}>
        <h2>Đăng nhập</h2>
        <Row gutter={[10,10]}>
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
                  label="Password"
                  name="password"
                  rules={rules}
              >
              <Input.Password />
              </Form.Item>
            </Col>
            <Button type="primary" htmlType="submit">Đăng nhập</Button>
        </Row>
      </Form>
    </>
  )
}
export default Login;