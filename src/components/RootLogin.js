import React from 'react';
import './RootLogin.scss';
import { Link } from 'react-router-dom';

const RootLogin = () => {
	return (
		<div className="rootContainer">
			<div className="circle" />
			<Link to="/trainer-login">
				<div className="lgn-box">Trainer Login</div>
			</Link>
			<Link to="/client-login">
				<div className="lgn-box">Client Login</div>
			</Link>
		</div>
	);
};

export default RootLogin;