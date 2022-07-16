import React from 'react';

const Login = ({ setUsername, setUser, username }) => {

	// login in as john and monica

	return (
		<div className='login'>
			<input
				type='text'
				placeholder='username'
				onChange={(e) => setUsername(e.target.value)}
			/>
			<button onClick={() => setUser(username)}>Login</button>
		</div>
	);
};

export default Login;
