import { Button } from "antd";
import { useNavigate } from "react-router-dom";

function Goback(){
  const navigate = useNavigate();
  return(
    <>
      <Button style={{marginTop: "20px"}} onClick={() => navigate(-1)}>Trở lại</Button>
    </>
  )
}

export default Goback;