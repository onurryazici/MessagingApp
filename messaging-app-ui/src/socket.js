import { useSelector } from "react-redux";
import  io  from "socket.io-client";

const URL    = "http://192.168.91.128:4001";
const socket = io(URL, { autoConnect:false, query:{token:"token gelecek buraya"} });
socket.onAny((event, ...args) => {
  console.log(event, args);
});



export default socket;
