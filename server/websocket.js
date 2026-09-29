import { WebSocketServer } from "ws";

const wss = new WebSocketServer({
    port: 8080
})

console.log("web socket running of port 8080");

wss.on("connection", (socket)=>{
    console.log("client connected");

    socket.send("welcome to websocket server");

    socket.on("message", (socket)=>{
        console.log("Message from Client", message.toString());

        socket.send(`server received: ${message}`);
    })

    socket.on("close", ()=>{
        console.log("client dissconnected")
    })
})