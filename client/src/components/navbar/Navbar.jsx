import React, { useEffect, useState } from 'react';
import './navbar.css';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SmsIcon from '@mui/icons-material/Sms';
import SettingsIcon from '@mui/icons-material/Settings';

const Navbar = ({ socket }) => {
	const [notifications, setNotifications] = useState([]);
	const [notiOpen, setNotiOpen] = useState(false);

	useEffect(() => {
		// receive event from server
		socket.on('getNotification', (data) => {
			setNotifications((prev) => [...prev, data]);
		});
	}, [socket]);

	const DisplayNotification = ({ senderName, type }) => {
		let action;

		if (type === 'like') {
			action = 'liked';
		} else if (type === 'comment') {
			action = 'commented';
		} else if (type === 'share') {
			action = 'shared';
		}

		return (
			<span className='notification'>{`${senderName} ${action} your post`}</span>
		);
	};

	const handleRead = () => {
		setNotifications([]);
		setNotiOpen(false);
	};

	return (
		<div className='navbar'>
			<span className='logo'>Instagram</span>
			<div className='icons'>
				<div className='icon' onClick={() => setNotiOpen(!notiOpen)}>
					<NotificationsIcon />
					{notifications.length > 0 && (
						<div className='counter'>{notifications.length}</div>
					)}
				</div>
				<div className='icon' onClick={() => setNotiOpen(!notiOpen)}>
					<SmsIcon />
				</div>
				<div className='icon'>
					<SettingsIcon />
				</div>
			</div>
			{notiOpen && (
				<div className='notifications'>
					{notifications.map((noti, index) => (
						<DisplayNotification
							key={index}
							senderName={noti.senderName}
							type={noti.type}
						/>
					))}
					<button onClick={handleRead} className='markRead'>
						Mark as read
					</button>
				</div>
			)}
		</div>
	);
};

export default Navbar;
