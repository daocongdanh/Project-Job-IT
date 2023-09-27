import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";

function PrivateRoute() {
  const isLogin = getCookie("token");
  return(
    <>
      {isLogin ? (<Outlet />) : (<Navigate to="/login"/>)}
    </>
  )
}

export default PrivateRoute;