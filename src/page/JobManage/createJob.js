import { Button, Col, Form, Input, Row, Select, Switch, message } from "antd";
import Goback from "../../components/Goback";
import { useEffect, useState } from "react";
import { getTags } from "../../services/tagsService";
import { createJob } from "../../services/jobService";
import { getCookie } from "../../helpers/cookie";
import { useForm } from "antd/es/form/Form";
import { getTimeCurrent } from "../../helpers/getTimeCurrent";
const { TextArea } = Input;

function CreateJob(){
  const [tags, setTags] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getTags();
      const data = [];
      result.forEach(item => {
        data.push({
          label: item.value,
          value: item.value
        })
      });
      setTags(data);
    }
    fetchApi();
  },[])
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = useForm();
  const rules = [
    {
      required: true,
      message: "Bắt buộc"
    }
  ]
  const handleSubmit = async (e) => {
    const response = await createJob({
      ...e,
      createAt: getTimeCurrent(),
      idCompany: parseInt(getCookie("id"))
    });
    if(response){
      form.resetFields();
      messageApi.open({
        type: 'success',
        content: 'Tạo job mới thành công',
      });
    }
    else{
      messageApi.open({
        type: 'error',
        content: 'Tạo job mới thất bại',
      });
    }
  }
  return(
    <>
      {contextHolder}
      <Goback />
      <h2>Tạo job mới</h2>
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Row gutter={[10,0]}>
          <Col span={24}>
            <Form.Item
              name="name"
              label="Tên job"
              rules={rules}               
            >
              <Input/>
            </Form.Item>
          </Col>
          <Col span={16}>
            <Form.Item
              name="tags"
              label="Tags"
              rules={rules}
            >
              <Select
                mode="multiple"
                options={tags}
                showSearch
                allowClear
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="salary"
              label="Mức lương"
              rules={rules}
              
            >
              <Input addonAfter={"$"} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="city"
              label="Thành phố"
              rules={rules}
            >
              <Select
                mode="multiple"
                showSearch
                allowClear
                options={[
                  {
                    label: "Hồ Chí Minh",
                    value: "Hồ Chí Minh"
                  },
                  {
                    label: "Hà Nội",
                    value: "Hà Nội"
                  },
                  {
                    label: "Đà Nẵng",
                    value: "Đà Nẵng"
                  }
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="description"
              label="Mô tả"
            >
              <TextArea rows={6} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="status"
              label="Trạng thái"
              valuePropName="checked"
            >
              <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
            </Form.Item>
          </Col>
          <Button htmlType="submit" type="primary">Tạo mới</Button>
        </Row>
      </Form>
    </>
  )
}
export default CreateJob;