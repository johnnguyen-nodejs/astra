import {acceptAgengcySocket, cancelAgengcySocket, deleteAgengcySocket, requireAgencyRegisterSocket} from "./notiSocket";
/**
 * @param io from socket.io libs
 */
let initSockets = (io) => {
    acceptAgengcySocket(io);
    cancelAgengcySocket(io);
    deleteAgengcySocket(io);
    requireAgencyRegisterSocket(io);
};

module.exports = initSockets;