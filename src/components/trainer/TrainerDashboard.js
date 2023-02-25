import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './Trainer.scss';

const TrainerDashboard = () => {
	useEffect(() => {
		window.history.pushState(null, null, window.location.href);
		window.onpopstate = function () {
			window.history.go(1);
		};
	}, []);

	return (
		<div className="trnr-layout">
			<div className="trnr-greeting">
				<h1>Hi, Trainer!</h1>
				<span>What would you like to do?</span>
			</div>
			<div className="trnr-actions">
				<Link to="/trainer-sessions" style={{ textDecoration: 'none' }}>
					<div className="action-container">Session Calendar</div>
				</Link>
				<Link
					to="/trainer-clients-page"
					style={{ textDecoration: 'none' }}
				>
					<div className="action-container">Members</div>
				</Link>
				<Link
					to="/diet-plan-creator"
					style={{ textDecoration: 'none' }}
				>
					<div className="action-container">Diet Plans</div>
				</Link>
				<Link to="/payments" style={{ textDecoration: 'none' }}>
					<div className="action-container">View Payments</div>
				</Link>
			</div>
		</div>
	);
};

export default TrainerDashboard;
