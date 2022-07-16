import { Server } from 'socket.io';

const io = new Server({
	cors: {
		origin: 'http://localhost:3000',
	},
});

let onlineUsers = [];

const addNewUser = (username, socketId) => {
	!onlineUsers.some((user) => user.username === username) &&
		onlineUsers.push({
			username,
			socketId,
		});
};

const removeOnlineUser = (socketId) => {
	onlineUsers = onlineUsers.filter((u) => u.socketId !== socketId);
};

const getUser = (username) => {
	return onlineUsers.find((u) => u.username === username);
};

io.on('connection', (socket) => {
	/* send event to every client  */
	// io.emit("firstEvent", "Hello test");

	// receive event from client
	socket.on('newUser', (username) => {
		if (username) {
			addNewUser(username, socket.id);
		}
	});

	// receive event from client
	socket.on('sendNotification', ({ senderName, receiverName, type }) => {
		const receiver = getUser(receiverName);
		// send event to one client
		io.to(receiver.socketId).emit('getNotification', {
			senderName,
			type,
		});
	});

	socket.on('disconnect', () => {
		removeOnlineUser(socket.id);
	});
});

io.listen(5000);
