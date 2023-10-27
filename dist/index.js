"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./src/infra/database/config");
const userRouter_1 = __importDefault(require("./src/interface/Routers/userRouter"));
const notificationRoute_1 = __importDefault(require("./src/interface/Routers/notificationRoute"));
const owerRouter_1 = __importDefault(require("./src/interface/Routers/owerRouter"));
const adminRoute_1 = __importDefault(require("./src/interface/Routers/adminRoute"));
const organizationRoute_1 = __importDefault(require("./src/interface/Routers/organizationRoute"));
const StadiumRoute_1 = __importDefault(require("./src/interface/Routers/StadiumRoute"));
const chatRouts_1 = require("./src/interface/Routers/chatRouts");
const messageRoute_1 = require("./src/interface/Routers/messageRoute");
const cors = require("cors");
const app = (0, express_1.default)();
(0, config_1.db)();
app.use(express_1.default.json());
app.use(cors({
    origin: ["http://localhost:3000", "https://stadgo-client-side.vercel.app"],
    methods: ["GET", "POST"],
    credentials: true,
}));
app.use("/", userRouter_1.default);
app.use("/owner", owerRouter_1.default);
app.use("/admin", adminRoute_1.default);
app.use("/org", organizationRoute_1.default);
app.use("/stadium", StadiumRoute_1.default);
app.use("/chat", chatRouts_1.chatRouter);
app.use("/message", messageRoute_1.messageRouter);
app.use("/notification", notificationRoute_1.default);
const port = process.env.PORT || 3001;
const server = app.listen(port, () => {
    console.log("server running");
});
const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: ["http://localhost:3000", "https://stadgo-client-side.vercel.app"],
    },
});
io.on("connection", (socket) => {
    console.log("socket io connected ");
    socket.on("setup", (userId) => {
        console.log(userId, "userid");
        socket.join(userId);
        socket.emit("connected");
    });
    socket.on('join-chat', (room) => {
        socket.join(room);
        console.log("user joind to room :", room);
    });
    socket.on('newMessage', (newMessageReceived) => {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        console.log(newMessageReceived, "getting");
        let chat = newMessageReceived.chat;
        console.log(newMessageReceived, "new message");
        console.log("chattttttttttttttttttttttttttttttttttttttttttttttt", chat);
        const sender = newMessageReceived.User ? newMessageReceived.User : newMessageReceived.Owner;
        console.log("sender", sender);
        console.log("newMessageReceived ===========", newMessageReceived);
        console.log(newMessageReceived.chat, "ppp");
        if ((sender === null || sender === void 0 ? void 0 : sender._id) === ((_a = newMessageReceived.chat.User) === null || _a === void 0 ? void 0 : _a._id)) {
            console.log("user is the sender");
            console.log('fssfdddgddlllllllllllllllllllllllllllllllllllllllllllll=', (_b = chat.Owner) === null || _b === void 0 ? void 0 : _b._id);
            socket.in((_c = chat.Owner) === null || _c === void 0 ? void 0 : _c._id).emit('message Received', newMessageReceived);
        }
        if ((sender === null || sender === void 0 ? void 0 : sender._id) === ((_d = newMessageReceived.chat.Owner) === null || _d === void 0 ? void 0 : _d._id)) {
            console.log("owner is the sender");
            console.log('Ownrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr=', (_e = chat.User) === null || _e === void 0 ? void 0 : _e._id);
            socket.in((_f = chat.User) === null || _f === void 0 ? void 0 : _f._id).emit("message Received", newMessageReceived);
        }
        if (chat._id === ((_g = newMessageReceived.User) === null || _g === void 0 ? void 0 : _g._id))
            return console.log("not a dumb");
        socket.in((_h = chat.User) === null || _h === void 0 ? void 0 : _h._id).emit("message Received", newMessageReceived);
        if (chat._id === ((_j = newMessageReceived.Owner) === null || _j === void 0 ? void 0 : _j._id))
            return console.log("dumb ");
        socket.in((_k = chat.Owner) === null || _k === void 0 ? void 0 : _k._id).emit('message Received', newMessageReceived);
    });
});
