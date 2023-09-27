
import { useParams } from "react-router-dom";
import Goback from "../../components/Goback";
import { useEffect, useState } from "react";
import { getJobsById } from "../../services/jobService";
import { Tag } from "antd";
function JobDetail(){
  const param = useParams();
  const {id} = param;
  const [job, setJob] = useState();
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getJobsById(parseInt(id));
      setJob(result);
    }
    fetchApi();
  },[]);
  return(
    <>
      <Goback />
      {job && (
        <>
          <h2>Tên job: {job.name}</h2>
          <p>Trạng thái: {job.status ? (<Tag color="green">Đang bật</Tag>) : (<Tag color="red">Đang tắt</Tag>)}</p>
          <p>Tags: {job.tags.map((item,index) => <Tag color="blue" key={index}>{item}</Tag>)}</p>
          <p>Mức lương: <strong>{job.salary}$</strong></p>
          <p>Ngày tạo: <strong>{job.createAt}</strong></p>
          <p>Cập nhật: <strong>{job.updateAt}</strong></p>
          <p>Thành phố: {job.city.map((item,index) => <Tag color="orange" key={index}>{item}</Tag>)}</p>
          <p>Mô tả:</p>
          <p>{job.description}</p>
        </>
      )}
    </>
  )
}
export default JobDetail;