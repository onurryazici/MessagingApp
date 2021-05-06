import socketIOClient from "socket.io-client";

const ENDPOINT = "192.168.91.128:4001";
export const MessengerSocket = socketIOClient(ENDPOINT,{query:"token gelecek buraya"});

export const AddToBubbleMe = (message,date) =>{

}

export const AddToBubbleSender  = (message,date) =>{

}