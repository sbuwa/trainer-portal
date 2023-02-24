import React from 'react';
import '../../main.scss';
import './Client.scss';

const ClientLogin = () => {
	const onLogin = (event) => {
		event.preventDefault();
		return true;
	};
	return (
		<div className="clnt-lgn-container">
			<form className="frm-container" onSubmit={onLogin}>
				<h1>Client Login</h1>
				<input className="form-item" placeholder="Username" />
				<input
					className="form-item"
					type="password"
					placeholder="Password"
				/>
				<button className="form-item" type="submit">
					Login
				</button>
			</form>
		</div>
	);
};

export default ClientLogin;
