import { useParams } from "react-router-dom";
import Goback from "../../../components/Goback"
import { useEffect, useState } from "react";
import { getCVById } from "../../../services/cvService";
function CVDetail(){
  const param = useParams();
  const {id} = param;
  const [cvById, setCVById] = useState("");
  useEffect(() => {
    const fetchApi = async () => {
      const result = await getCVById(parseInt(id));
      setCVById(result);
    }
    fetchApi();
  },[])
  return(
    <>
      <Goback />
      <h1>Thông tin chi tiết</h1>
      <p>Họ và tên: <strong>{cvById.name}</strong></p>
      <p>Số điện thoại: <strong>{cvById.phone}</strong></p>
      <p>Email: <strong>{cvById.email}</strong></p>
      <p>Link Project: <strong>{cvById.linkProject}</strong></p>
      <p>Mô tả:</p>
      <p>{cvById.description}</p>
    </>
  )
}

export default CVDetail;