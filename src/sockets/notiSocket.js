import UserModel from "./../models/userModel"

let acceptAgengcySocket = (io) => {
    let clients = {};
    io.on("connection", (socket)=>{
        let currentUserId = socket.request.user._id;
        if(clients[currentUserId]){
            clients[currentUserId].push(socket.id)
        } else {
            clients[currentUserId] = [socket.id];
        } 
        socket.on("accept-agency", async (targetId)=>{
            let userAccept = await UserModel.findUserById(targetId);
            if(clients[targetId]){
                clients[targetId].forEach(socketId => {
                    io.sockets.connected[socketId].emit("send-accept-agency-to-user", userAccept);
                });
            }
            if(clients[currentUserId]){
                clients[currentUserId].forEach(socketId => {
                    io.sockets.connected[socketId].emit("append-accept-agency", userAccept);
                });
            }
        });
        socket.on("disconnect", ()=> {
            clients[currentUserId] = clients[currentUserId].filter((socketId)=>{
                return socketId !== socket.id;
            });
            if(!clients[currentUserId].length){
                delete clients[currentUserId];
            }
        });
    });
}
let cancelAgengcySocket = (io) => {
    let clients = {};
    io.on("connection", (socket)=>{
        let currentUserId = socket.request.user._id;
        if(clients[currentUserId]){
            clients[currentUserId].push(socket.id)
        } else {
            clients[currentUserId] = [socket.id];
        } 
        socket.on("cancel-agency", async (targetId)=>{
            let userCancel = await UserModel.findUserById(targetId);
            io.sockets.emit("append-cancel-agency", userCancel);
        });
        
    });
}
let deleteAgengcySocket = (io) => {
    let clients = {};
    io.on("connection", (socket)=>{
        let currentUserId = socket.request.user._id;
        if(clients[currentUserId]){
            clients[currentUserId].push(socket.id)
        } else {
            clients[currentUserId] = [socket.id];
        } 
        socket.on("delete-agency", async (targetId)=>{
            let userDelete = await UserModel.findUserById(targetId);
            io.sockets.emit("append-delete-agency", userDelete);
        });
        
    });
}

let requireAgencyRegisterSocket = (io) => {
    let clients = {};
    io.on("connection", (socket)=>{ 
        let currentUserId = socket.request.user._id;
        if(clients[currentUserId]){
            clients[currentUserId].push(socket.id)
        } else {
            clients[currentUserId] = [socket.id];
        } 
        socket.on("send-agency-require", async (agencyRegisterData)=>{
            let currentUser = socket.request.user; 
            let adminId = await UserModel.findByRole("admin");
            if(clients[adminId._id]){
                clients[adminId._id].forEach(socketId => {
                    io.sockets.connected[socketId].emit("send-require-agency-to-admin", currentUser);
                });
            }
            if(clients[currentUserId]){
                clients[currentUserId].forEach( (socketId) => {
                    io.sockets.connected[socketId].emit("success-require-agency", currentUser);
                });
            }
        }); 
        socket.on("disconnect", ()=> {
            clients[currentUserId] = clients[currentUserId].filter((socketId)=>{
                return socketId !== socket.id;
            });
            if(!clients[currentUserId].length){
                delete clients[currentUserId];
            }
        });
    });
    
}

module.exports = {
    acceptAgengcySocket: acceptAgengcySocket,
    cancelAgengcySocket: cancelAgengcySocket,
    deleteAgengcySocket: deleteAgengcySocket,
    requireAgencyRegisterSocket: requireAgencyRegisterSocket
};