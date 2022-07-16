import React from 'react';
import './card.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import ShareIcon from '@mui/icons-material/Share';
import InfoIcon from '@mui/icons-material/Info';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Card = ({ post, socket, user }) => {
	const [liked, setLiked] = useState(false);

	const handleNotification = (type) => {
		setLiked(true);
		// send event to server
		socket.emit('sendNotification', {
			senderName: user,
			receiverName: post.username,
			type,
		});
	};

	const handleDislike = () => {
		setLiked(false);
	};

	return (
		<div className='card'>
			<div className='info'>
				<img className='userImg' src={post.userImg} alt='' />
				<span>{post.fullname}</span>
			</div>
			<img className='postImg' src={post.postImg} alt='' />
			<div className='interaction'>
				{liked ? (
					<FavoriteIcon onClick={handleDislike} className='cardIcon heart' />
				) : (
					<FavoriteBorderIcon
						onClick={() => handleNotification('like')}
						className='cardIcon'
					/>
				)}
				<QuestionAnswerIcon
					className='cardIcon'
					onClick={() => handleNotification('comment')}
				/>
				<ShareIcon
					className='cardIcon'
					onClick={() => handleNotification('share')}
				/>
				<InfoIcon className='cardIcon infoIcon' />
			</div>
		</div>
	);
};

export default Card;
