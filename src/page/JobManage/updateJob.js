import { Button, Col, Form, Input, Modal, Row, Select, Spin, Switch, Tooltip, message } from "antd";
import {EditOutlined} from "@ant-design/icons"
import { useEffect, useState } from "react";
import { getTags } from "../../services/tagsService";
import { useForm } from "antd/es/form/Form";
import { updateJob } from "../../services/jobService";
import {getTimeCurrent} from "../../helpers/getTimeCurrent";
const {TextArea} = Input;
function UpdateJob(props){
  const {record, onReLoad} = props;
  const [showModal, setShowModal] = useState(false);
  const [form] = useForm();
  const [tags, setTags] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
  const handleCancel = () => {
    form.resetFields();
    setShowModal(false);
  };
  const handleClick = () => {
    setShowModal(true);
  }
  const rules = [
    {
      required: true,
      message: "Bắt buộc"
    }
  ]
  const [messageApi, contextHolder] = message.useMessage();
  const handleSubmit = async (e) => {
    const reponse = await updateJob(record.id,{
      ...e,
      updateAt: getTimeCurrent()
    })
    setIsLoading(true);
    setTimeout(() => {
      if(reponse){
        setShowModal(false);
        onReLoad();
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
      setIsLoading(false)
    }, 2000);
  }
  return(
    <>
      {contextHolder}
      <div>
      <Tooltip title="Chỉnh sửa bản ghi">
        <Button onClick={handleClick} type="primary" ghost icon={<EditOutlined />}></Button>
      </Tooltip>
      </div>
      <Modal title="Chỉnh sửa" open={showModal} onCancel={handleCancel} footer = {null}>
        <Spin tip="Loading" size="large" spinning={isLoading}>
          <Form layout="vertical" onFinish={handleSubmit} initialValues={record} form={form}>
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
              <Button htmlType="submit" type="primary">Cập nhật</Button>
            </Row>
          </Form>
        </Spin>
      </Modal>
    </>
  )
}

export default UpdateJob;