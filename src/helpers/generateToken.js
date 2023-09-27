export const getToken = () => {
  var root = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVNM0123456789";
  var token = "";
  for(let i=0;i<20;i++){
    token += root[Math.floor(Math.random()*root.length)];
  }
  return token;
}