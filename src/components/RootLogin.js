import React from 'react';
import './RootLogin.scss';
import { Link } from 'react-router-dom';

const RootLogin = () => {
	return (
		<div className="rootContainer">
			<div className="circle" />
			<Link to="/trainer-login" style={{ textDecoration: 'none' }}>
				<div className="lgn-box">Trainer Login</div>
			</Link>
		</div>
	);
};

export default RootLogin;
