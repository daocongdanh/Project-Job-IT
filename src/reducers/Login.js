import { getCookie } from "../helpers/cookie";


export const loginReducer = (state = false, action) => {
  switch(action.type){
    case "LOGIN":
      return action.login;
    default:
      return getCookie("token");
  }
}