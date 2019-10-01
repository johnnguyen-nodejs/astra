import newInvester from "./notiSocket";
/**
 * @param io from socket.io libs
 */
let initSockets = (io) => {
    newInvester(io);
};

module.exports = initSockets;