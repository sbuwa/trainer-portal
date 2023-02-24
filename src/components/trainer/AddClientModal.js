import React, { useState } from 'react';
import {
	Modal,
	Button,
	TextField,
	FormControl,
	Select,
	InputLabel,
	MenuItem,
	Box,
} from '@mui/material';
import './Trainer.scss';
import { useEffect } from 'react';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '1px solid #8e8e8e',
	boxShadow: 24,
	p: 4,
};

const AddClientModal = (props) => {
	const [name, setName] = useState('');
	const [username, setUsername] = useState('');
	const [dob, setDob] = useState('');
	const [gender, setGender] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [errors, setErrors] = useState({
		name: '',
		username: '',
		phone: '',
		address: '',
	});

	useEffect(() => {
		console.log(props.clientData);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		let isValid = true;
		const newErrors = { ...errors };
		if (!isValidName(name)) {
			newErrors.name =
				'Name should not be empty and should only contains letters';
			isValid = false;
		} else {
			newErrors.name = '';
		}
		if (!isValidUsername(username)) {
			newErrors.username =
				'Username should be at least 6 characters and should contain only letters and numbers';
			isValid = false;
		} else {
			newErrors.username = '';
		}
		if (!isValidPhone(phone)) {
			newErrors.phone = 'Phone number is not in a valid format';
			isValid = false;
		} else {
			newErrors.phone = '';
		}
		if (!isValidAddress(address)) {
			newErrors.address = 'Address should not be empty';
			isValid = false;
		} else {
			newErrors.address = '';
		}
		setErrors(newErrors);
		if (isValid) {
			const newClient = {
				name: name,
				username: username,
				dob: dob,
				gender: gender,
				phone: phone,
				address: address,
			};
			props.addClient(newClient);
			props.closeModal();
		}
	};

	const isValidName = (name) => {
		// Example: check if name is not empty and only contains letters
		return name !== '' && /^[a-zA-Z ]+$/.test(name);
	};

	const isValidUsername = (username) => {
		// Example: check if username is at least 6 characters and contains only letters and numbers
		return username.length >= 6 && /^[a-zA-Z0-9]+$/.test(username);
	};

	const isValidPhone = (phone) => {
		// Example: check if phone number is valid format
		return /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(phone);
	};

	const isValidAddress = (address) => {
		// Example: check if address is not empty
		return address !== '';
	};

	return (
		<Modal open={props.open} onClose={props.closeModal}>
			<Box sx={style}>
				<div className="addClientContainer">
					<h1>Add a new Member</h1>
					<form onSubmit={handleSubmit}>
						<TextField
							label="Name"
							value={name}
							onChange={(event) => setName(event.target.value)}
							margin="normal"
							fullWidth
							error={errors.name !== ''}
							helperText={errors.name}
						/>
						<TextField
							label="Username"
							value={username}
							onChange={(event) =>
								setUsername(event.target.value)
							}
							margin="normal"
							fullWidth
							error={errors.username !== ''}
							helperText={errors.username}
						/>
						<TextField
							label="Date of birth"
							InputLabelProps={{ shrink: true }}
							type="date"
							value={dob}
							onChange={(event) => setDob(event.target.value)}
							margin="normal"
							fullWidth
						/>
						<FormControl>
							<InputLabel id="gender-select-label">
								Gender
							</InputLabel>
							<Select
								labelId="gender-select-label"
								id="gender-select"
								value={gender}
								onChange={(event) =>
									setGender(event.target.value)
								}
								sx={{ width: 200 }}
							>
								<MenuItem value="male">Male</MenuItem>
								<MenuItem value="female">Female</MenuItem>
								<MenuItem value="other">Other</MenuItem>
							</Select>
						</FormControl>
						<TextField
							label="Phone Number"
							value={phone}
							onChange={(event) => setPhone(event.target.value)}
							margin="normal"
							fullWidth
							error={errors.phone !== ''}
							helperText={errors.phone}
						/>
						<TextField
							label="Address"
							value={address}
							onChange={(event) => setAddress(event.target.value)}
							margin="normal"
							error={errors.address !== ''}
							helperText={errors.address}
							fullWidth
						/>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							sx={{ marginTop: 2 }}
						>
							Add Client
						</Button>
					</form>
				</div>
			</Box>
		</Modal>
	);
};

export default AddClientModal;
