import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';
import '../../main.scss';
import './Trainer.scss';

const TrainerLogin = () => {
	const navigate = useNavigate();
	const [trainerStore, setTrainerStore] = useState([]);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const trainerCollRef = collection(db, 'trainer_login');

	useEffect(() => {
		const getTrainers = async () => {
			const data = await getDocs(trainerCollRef);
			setTrainerStore(
				data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		};

		getTrainers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const setError = () => {};

	const onLogin = (event) => {
		event.preventDefault();
		let isValid = trainerStore.filter((el) => {
			return el.username === username && el.password === password;
		});
		isValid.length ? navigate('/trainer-dashboard') : setError();
		return true;
	};
	return (
		<div className="trnr-lgn-container">
			<form className="frm-container" onSubmit={onLogin}>
				<h1>Trainer Login</h1>
				<TextField
					id="outlined-basic"
					className="form-item"
					label="Username"
					variant="outlined"
					onChange={(e) => setUsername(e.target.value)}
				/>
				<TextField
					id="standard-password-input"
					className="form-item"
					label="Password"
					type="password"
					autoComplete="current-password"
					variant="outlined"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button variant="contained" className="form-item" type="submit">
					Login
				</Button>
			</form>
		</div>
	);
};

export default TrainerLogin;
