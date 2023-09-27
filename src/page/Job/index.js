import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobsById } from "../../services/jobService";
import { Button, Col, Form, Input, Row, Select, Tag, message } from "antd";
import { useForm } from "antd/es/form/Form";
import Goback from "../../components/Goback";
import { createCV } from "../../services/cvService";
import { getCompanyById } from "../../services/companyService";
import { getTimeCurrent } from "../../helpers/getTimeCurrent";

function Job(){
  const param = useParams();
  const { TextArea } = Input;
  const {id} = param;
  const [job, setJob] = useState("");
  const [city, setCity] = useState("");
  useEffect(() => {
    const fetchApi = async () => {
      let result = await getJobsById(id);
      const company = await getCompanyById(result.idCompany);
      result = {
        ...result,
        address: company.address
      }
      setJob(result);
      const data = [];
      result.city.forEach(item => {
        data.push({
          value: item,
          label: item
        })
      });
      setCity(data);
    }
    fetchApi();
  },[])
  const rules=[
    {
      required: true,
      message: 'Bắt buộc',
    },
  ];
  const [form] = useForm();
  const handleClick = () => {
    form.scrollToField("form");
  }
  const [messageApi, contextHolder] = message.useMessage();
  const handleSubmit = async (e) => {
    const response = await createCV({
      ...e,
      idCompany: job.idCompany,
      idJob: parseInt(id),
      createAt: getTimeCurrent()
    })
    if(response){
      form.resetFields();
      messageApi.open({
        type: 'success',
        content: 'Nhà tuyển dụng sẽ liên hệ với bạn trong thời gian sớm nhất',
      });
    }
    else{
      messageApi.open({
        type: 'error',
        content: 'Hệ thống đang gặp lỗi, vui lòng gửi lại yêu cầu',
      });
    }
  }
  return(
    <>
      {contextHolder}
      <div className="container" style={{fontSize: "18px"}}>
          <Goback/>
          {job && (
            <>
              <h1>{job.name}</h1>
              <Button type="primary" onClick={handleClick}>Ứng tuyển ngay</Button>
              <p>Tags: {job.tags.map((item, index) => (
                <Tag color="blue" key={index}>{item}</Tag>
              ))}</p>
              <p>Thành phố: {job.city.map((item, index) => (
                <Tag color="orange" key={index}>{item}</Tag>
              ))}</p>
              <p>Mức lương: <strong>{job.salary} $</strong></p>
              <p>Địa chỉ công ty: <strong>{job.address}</strong></p>
              <p>Thời gian đăng bài: <strong>{job.createAt}</strong></p>
              <p>Mô tả công việc:</p>
              <p>{job.description}</p>
            </>
          )}
          <Form id="form" form={form} onFinish={handleSubmit} layout = "vertical" style={{border: "1px solid #ddd", borderRadius: "10px", padding: "20px"}}>
            <h2>Ứng tuyển ngay</h2>
            <Row gutter={[20,20]}>
                <Col span={6}>
                  <Form.Item
                     label="Họ tên"
                     name="name"
                     rules={rules}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                     label="Số điện thoại"
                     name="phone"
                     rules={rules}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                     label="Email"
                     name="email"
                     rules={rules}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                     label="Thành phố"
                     name="city"
                     rules={rules}
                  >
                    <Select
                      showSearch
                      options={city}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                     label="Giới thiệu bản thân"
                     name="description"
                     rules={rules}
                  >
                    <TextArea rows={6}/>
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                     label="Danh sách link project đã làm"
                     name="linkProject"
                     rules={rules}
                  >
                    <TextArea  rows={6}/>
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Form.Item>
                      <Button htmlType="submit" type="primary">Gửi yêu cầu</Button>
                  </Form.Item>
                </Col>
            </Row>
          </Form>
      </div>
    </>
  )
}

export default Job;