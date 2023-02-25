import React, { useState, useEffect } from 'react';
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
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import './Trainer.scss';

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

const AddPaymentsModal = (props) => {
	const [clientNames, setClientNames] = useState(props.clients);
	const [selectedClientId, setSelectedClientId] = useState('');
	const [name, setName] = useState('');
	const [amount, setAmount] = useState('');
	const [date, setDate] = useState('');
	const [fromTime, setFromTime] = useState('');
	const [toTime, setToTime] = useState('');
	const [errors, setErrors] = useState({
		name: '',
		username: '',
		phone: '',
		address: '',
	});

	useEffect(() => {
		let names = props.clients.map((item) => item.data.name);
		setClientNames(names);
	}, [props.clients]);

	const handleSubmit = (event) => {
		event.preventDefault();

		let clientId = '';
		let clientName = '';
		const obj = props.clients.find((item) => item.data.name === name);

		if (obj) {
			clientId = obj.id;
			clientName = obj.data.name;
			// console.log('[obj]', obj);
			setSelectedClientId(clientId);
			// setClientNames(clientName);
		}
		let paymentToDb = {
			client_id: clientId,
			client_name: clientName,
			payment_date: date.format('DD-MM-YYYY'),
			payment_amount: amount,
		};
		// console.log(date.format('DD-MM-YYYY'));
		props.addPayment(paymentToDb);
		props.closeModal();
	};

	return (
		<Modal open={props.open} onClose={props.closeModal}>
			<Box sx={style}>
				<div className="addClientContainer">
					<h1>Add a new Member</h1>
					<form onSubmit={handleSubmit}>
						<FormControl>
							<InputLabel id="name-select-label">
								Member
							</InputLabel>
							<Select
								labelId="name-select-label"
								id="name-select"
								value={name}
								onChange={(event) =>
									setName(event.target.value)
								}
								sx={{ width: 200 }}
							>
								{clientNames.map((name) => (
									<MenuItem key={name} value={name}>
										{name}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<TextField
							label="Payment Amount"
							value={amount}
							onChange={(event) => setAmount(event.target.value)}
							margin="normal"
							fullWidth
						/>
						<LocalizationProvider dateAdapter={AdapterMoment}>
							<DatePicker
								label="Date"
								value={date}
								onChange={(newValue) => {
									setDate(newValue);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										sx={{ marginTop: 2 }}
									/>
								)}
							/>
						</LocalizationProvider>
						{/* <br></br> */}
						{/* <LocalizationProvider dateAdapter={AdapterMoment}>
							<TimePicker
								label="From"
								value={fromTime}
								onChange={(newValue) => {
									setFromTime(newValue);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										sx={{
											marginTop: 2,
											width: 150,
											paddingRight: 2,
										}}
									/>
								)}
							/>
						</LocalizationProvider>
						<LocalizationProvider dateAdapter={AdapterMoment}>
							<TimePicker
								label="To"
								value={toTime}
								onChange={(newValue) => {
									setToTime(newValue);
								}}
								renderInput={(params) => (
									<TextField
										{...params}
										sx={{ marginTop: 2, width: 150 }}
									/>
								)}
							/>
						</LocalizationProvider> */}
						<br></br>
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

export default AddPaymentsModal;
