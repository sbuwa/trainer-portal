import React, { useEffect, useState } from 'react';
import {
	collection,
	getDocs,
	addDoc,
	deleteDoc,
	doc,
} from 'firebase/firestore';
import { db } from '../../firebase-config';
import {
	Table,
	TableContainer,
	TableHead,
	Dialog,
	TableRow,
	TableCell,
	TableBody,
	DialogActions,
	DialogTitle,
	DialogContentText,
	DialogContent,
	Button,
	Alert,
	IconButton,
	Tooltip,
} from '@mui/material';
import { BorderColorTwoTone, DeleteForeverTwoTone } from '@mui/icons-material';
import '../../main.scss';
import './Trainer.scss';
import AddSessionModal from './AddSessionModal';

const TrainerSessions = () => {
	const [clients, setClients] = useState([]);
	const [sessions, setSessions] = useState([]);
	const [deleteClientId, setdeleteClientId] = useState('');
	const [showDeleteAlert, setShowDeleteAlert] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [addSessionModalOpen, setAddSessionModalOpen] = useState(false);
	const sessionCollRef = collection(db, 'trainer_sessions');
	const clientCollRef = collection(db, 'clients');

	useEffect(() => {
		getSessions();
		getClients();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// useEffect(() => {
	// 	console.log(sessions);
	// }, [sessions]);

	const getClients = () => {
		getDocs(clientCollRef)
			.then((response) => {
				const res_clients = response.docs.map((doc) => ({
					data: doc.data(),
					id: doc.id,
				}));
				setClients(res_clients);
			})
			.catch((error) => console.error(error));
	};

	const getSessions = () => {
		getDocs(sessionCollRef)
			.then((response) => {
				const res_sessions = response.docs.map((doc) => ({
					data: doc.data(),
					id: doc.id,
				}));
				setSessions(res_sessions);
			})
			.catch((error) => console.error(error));
	};

	// const addSession = () => {
	// 	sessions.map((session) => console.log(session.data));
	// };

	const handleAddSessionModalOpen = () => {
		setAddSessionModalOpen(true);
	};

	const handleAddSessionModalClose = () => {
		setAddSessionModalOpen(false);
	};

	// const handleAddSession = (selectedId, date, fromTime, toTime) => {
	// 	console.log('[selectedId]', selectedId);
	// 	console.log('[date]', date.format('DD-MM-YYYY'));
	// 	console.log('[fromTime]', fromTime.format('hh:mm A'));
	// 	console.log('[toTime]', toTime.format('hh:mm A'));

	// 	let sessionToDb = {
	// 		client_id: selectedId,
	// 		session_date: date,
	// 		session_start: fromTime,
	// 		session_end: toTime,
	// 	};
	// 	addDoc(collection(db, 'trainer_sessions'), sessionToDb)
	// 		.then(() => {
	// 			console.log('New session added!');
	// 		})
	// 		.catch((error) => {
	// 			alert(error.message);
	// 		});
	// 	getSessions();
	// };

	const handleAddSession = (newSession) => {
		addDoc(collection(db, 'trainer_sessions'), newSession)
			.then(() => {
				console.log('New session added!');
			})
			.catch((error) => {
				alert(error.message);
			});
		getSessions();
	};

	const handleDelete = (id) => {
		setDeleteDialogOpen(true);
		setdeleteClientId(id);
	};

	const handleDeleteConfirm = () => {
		if (deleteClientId !== '') {
			const userDoc = doc(db, 'sessions', deleteClientId);
			deleteDoc(userDoc)
				.then(() => {
					showDeleteAlertFn(true);
					getSessions();
				})
				.catch((error) => console.log(error));
		}
		setDeleteDialogOpen(false);
	};

	const handleDeleteDialogClose = () => {
		setDeleteDialogOpen(false);
		setdeleteClientId('');
	};

	const showDeleteAlertFn = () => {
		setShowDeleteAlert(true);
	};

	const getClientNameFromId = (id) => {
		const obj = clients.find((item) => item.data.id === id);

		if (obj) {
			const name = obj.data.name;
			console.log('[name]', name);
			return name;
		}
	};

	const getTime = (isoTime) => {
		let time = new Date(isoTime);
		var ampm = time.getHours() >= 12 ? 'pm' : 'am';
		let hours = time.getHours();
		let minutes = time.getMinutes();
		if (hours < 10) {
			hours = '0' + hours;
		}
		if (minutes < 10) {
			minutes = '0' + minutes;
		}
		return hours + ':' + minutes + ampm;
	};

	const getDate = (isoTime) => {
		let date = new Date(isoTime);
		let year = date.getFullYear();
		let month = date.getMonth() + 1;
		let dt = date.getDate();

		if (dt < 10) {
			dt = '0' + dt;
		}
		if (month < 10) {
			month = '0' + month;
		}

		return dt + '/' + month + '/' + year;
	};

	return (
		<div>
			<div className="trnr-ssn-container">
				<div className="ssn-tbl-title">
					<h1>Trainer Sessions</h1>
					<button
						className="btn-add"
						onClick={handleAddSessionModalOpen}
					>
						Add Session
					</button>
				</div>
				<AddSessionModal
					clients={clients}
					open={addSessionModalOpen}
					closeModal={handleAddSessionModalClose}
					addSession={handleAddSession}
				/>
				<Dialog
					open={deleteDialogOpen}
					onClose={handleDeleteDialogClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						{'Confirm User Deletion'}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Are you sure you want to delete this session? This
							action cannot be undone.
						</DialogContentText>
					</DialogContent>
					<DialogActions>
						<Button
							onClick={handleDeleteDialogClose}
							color="primary"
						>
							Cancel
						</Button>
						<Button
							onClick={handleDeleteConfirm}
							color="secondary"
							autoFocus
						>
							Delete
						</Button>
					</DialogActions>
				</Dialog>
				{showDeleteAlert && (
					<div className="add-client-alert">
						<Alert
							onClose={() => setShowDeleteAlert(false)}
							severity="error"
							sx={{ width: 500 }}
						>
							Session Deleted
						</Alert>
					</div>
				)}
				<TableContainer>
					<Table
						sx={{ minWidth: 650, maxWidth: 900 }}
						aria-label="simple table"
					>
						<TableHead>
							<TableRow>
								<TableCell>Session Date</TableCell>
								<TableCell>Member</TableCell>
								<TableCell>From</TableCell>
								<TableCell>To</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{sessions?.map((session) => (
								<TableRow key={session.id}>
									{/* <TableCell>
										{getClientNameFromId(
											session.data.client_id
										)}
									</TableCell> */}
									<TableCell>
										{session.data.session_date}
									</TableCell>
									<TableCell>
										{session.data.client_name}
									</TableCell>
									<TableCell>
										{session.data.session_start}
									</TableCell>
									<TableCell>
										{session.data.session_end}
									</TableCell>
									<Tooltip title="Delete">
										<IconButton
											onClick={() =>
												handleDelete(session.id)
											}
										>
											<DeleteForeverTwoTone />
										</IconButton>
									</Tooltip>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
};

export default TrainerSessions;
