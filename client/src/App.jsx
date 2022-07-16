import React from 'react';
import { useState } from 'react';
import './app.css';
import Card from './components/card/Card';
import Navbar from './components/navbar/Navbar';
import Login from './pages/Login';
import { posts } from './data';
import { io } from 'socket.io-client';
import { useEffect } from 'react';

const App = () => {
	const [username, setUsername] = useState('');
	const [user, setUser] = useState('');
	const [socket, setSocket] = useState(null);

	useEffect(() => {
		// set Socket
		setSocket(io('http://localhost:5000'));

		/* receive event from server */
		// socket.on('firstEvent', (msj) => {
		// 	console.log(msj);
		// });
	}, []);

	useEffect(() => {
		// send event to server
		socket?.emit('newUser', user);
	}, [socket, user]);

	return (
		<>
			{user ? (
				<div className='container'>
					<Navbar socket={socket} />
					{posts.map((p) => (
						<Card key={p.id} post={p} socket={socket} user={user} />
					))}
					<span className='username'>{user}</span>
				</div>
			) : (
				<Login
					setUsername={setUsername}
					username={username}
					setUser={setUser}
				/>
			)}
		</>
	);
};

export default App;
