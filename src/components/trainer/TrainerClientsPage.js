import React, { useEffect, useState } from 'react';
import {
	collection,
	doc,
	getDocs,
	addDoc,
	updateDoc,
	deleteDoc,
} from 'firebase/firestore';
import { db } from '../../firebase-config';
import {
	Table,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Alert,
	AlertTitle,
	IconButton,
	Tooltip,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContentText,
	DialogContent,
	Button,
} from '@mui/material';
import { BorderColorTwoTone, DeleteForeverTwoTone } from '@mui/icons-material';
import '../../main.scss';
import './Trainer.scss';
import AddClientModal from './AddClientModal';
import UpdateClientModal from './UpdateClientModal';

const TrainerClientsPage = () => {
	const [clients, setClients] = useState([]);
	const [addClientModalOpen, setAddClientModalOpen] = useState(false);
	const [updateClientModalOpen, setUpdateClientModalOpen] = useState(false);
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [deleteClientId, setdeleteClientId] = useState('');
	const [updateClientId, setUpdateClientId] = useState([]);
	const [updateClientData, setUpdateClientData] = useState('');
	const [showAlert, setShowAlert] = useState(false);
	const [showDeleteAlert, setShowDeleteAlert] = useState(false);
	const [showUpdateAlert, setShowUpdateAlert] = useState(false);
	const [alertData, setAlertData] = useState({});

	const clientCollRef = collection(db, 'clients');

	useEffect(() => {
		getClients();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// useEffect(() => {
	// 	console.log('[tempclients]', tempclients);
	// }, [tempclients]);

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

	const handleAddClient = (newClient) => {
		let randomPassword = randomString();
		let clientToDb = { ...newClient, password: randomPassword };
		addDoc(collection(db, 'clients'), clientToDb)
			.then(() => {
				console.log('New member added!');
			})
			.catch((error) => {
				alert(error.message);
			});
		getClients();
		setAlertData({
			username: newClient.username,
			password: randomPassword,
		});
		setShowAlert(true);
	};

	const handleAddClientModalOpen = () => {
		setAddClientModalOpen(true);
	};

	const handleAddClientModalClose = () => {
		setAddClientModalOpen(false);
	};

	const handleUpdateClientModalOpen = () => {
		setUpdateClientModalOpen(true);
	};

	const handleUpdateClientModalClose = () => {
		setUpdateClientModalOpen(false);
	};

	const handleDelete = (id) => {
		setDeleteDialogOpen(true);
		setdeleteClientId(id);
	};

	const handleDeleteConfirm = () => {
		if (deleteClientId !== '') {
			const userDoc = doc(db, 'clients', deleteClientId);
			deleteDoc(userDoc)
				.then(() => {
					showDeleteAlertFn(true);
					getClients();
				})
				.catch((error) => console.log(error));
		}
		setDeleteDialogOpen(false);
	};

	// const handleUpdateButtonClicked = (id) => {
	// 	// console.log(id);
	// 	setUpdateClientId(id);
	// 	const userData = clients.find((data) => {
	// 		return (data.id = id);
	// 	});
	// 	setUpdateClientData(userData);
	// 	handleUpdateClientModalOpen(true);
	// };

	const handleUpdateClient = (newFields) => {
		const userDoc = doc(db, 'clients', updateClientId);
		console.log('[newFields]', newFields);
		// updateDoc(userDoc, newFields).then().catch();
	};

	const handleDeleteDialogClose = () => {
		setDeleteDialogOpen(false);
		setdeleteClientId('');
	};

	const showDeleteAlertFn = () => {
		setShowDeleteAlert(true);
	};

	const randomString = () => {
		let result = '';
		const characters =
			'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
		const charactersLength = characters.length;
		for (let i = 0; i < 8; i++) {
			result += characters.charAt(
				Math.floor(Math.random() * charactersLength)
			);
		}
		return result;
	};

	return (
		<div>
			<div className="trnr-clients-container">
				<div className="clients-tbl-title">
					<h1>Members</h1>
					<button
						className="btn-add"
						onClick={handleAddClientModalOpen}
					>
						Add Member
					</button>
				</div>
				<AddClientModal
					open={addClientModalOpen}
					closeModal={handleAddClientModalClose}
					addClient={handleAddClient}
				/>
				<UpdateClientModal
					open={updateClientModalOpen}
					closeModal={handleUpdateClientModalClose}
					updateClient={handleUpdateClient}
					clientData={updateClientData}
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
							Are you sure you want to delete this user? This
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
				{showAlert && (
					<div className="add-client-alert">
						<Alert
							onClose={() => setShowAlert(false)}
							severity="success"
							sx={{ width: 500 }}
						>
							<AlertTitle>New Member added!</AlertTitle>
							Member created with username:{' '}
							<b>{alertData.username}</b> and password:{' '}
							<i>{alertData.password}</i>
						</Alert>
					</div>
				)}
				{showDeleteAlert && (
					<div className="add-client-alert">
						<Alert
							onClose={() => setShowDeleteAlert(false)}
							severity="error"
							sx={{ width: 500 }}
						>
							Member Deleted
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
								<TableCell>Username</TableCell>
								<TableCell>Name</TableCell>
								<TableCell>Date of Birth</TableCell>
								<TableCell>Gender</TableCell>
								<TableCell>Phone Number</TableCell>
								<TableCell>Address</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{clients?.map((client) => (
								<TableRow key={client.id}>
									<TableCell>
										{client.data.username}
									</TableCell>
									<TableCell>{client.data.name}</TableCell>
									<TableCell>{client.data.dob}</TableCell>
									<TableCell>{client.data.gender}</TableCell>
									<TableCell>{client.data.phone}</TableCell>
									<TableCell>{client.data.address}</TableCell>
									<Tooltip title="Delete">
										<IconButton
											onClick={() =>
												handleDelete(client.id)
											}
										>
											<DeleteForeverTwoTone />
										</IconButton>
									</Tooltip>
									{/* <Tooltip title="Update">
										<IconButton
										// onClick={() =>
										// 	handleUpdateButtonClicked(
										// 		client.id
										// 	)
										// }
										>
											<BorderColorTwoTone />
										</IconButton>
									</Tooltip> */}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</div>
	);
};

export default TrainerClientsPage;
