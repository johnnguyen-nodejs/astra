let newInvester = (io) => {
    io.on("connection", (socket)=>{
        socket.on("new-invester", (data)=>{
            console.log(data);
            console.log(socket.request.user)
        });
        
    });
}

module.exports = newInvester;