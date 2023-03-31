import React, { useState, useEffect } from 'react';
import {
	collection,
	getDocs,
	addDoc,
	deleteDoc,
	doc,
} from 'firebase/firestore';
import { db } from '../../firebase-config';
import {
	Tooltip,
	IconButton,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContentText,
	DialogContent,
	Button,
	Alert,
	Table,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from '@mui/material';
import { DeleteForeverTwoTone } from '@mui/icons-material';
import '../../main.scss';
import './Trainer.scss';
import AddPaymentsModal from './AddPaymentsModal';

const Payments = () => {
	const [clients, setClients] = useState([]);
	const [payments, setPayments] = useState([]);
	const [showDeleteAlert, setShowDeleteAlert] = useState(false);
	const [deleteClientId, setdeleteClientId] = useState('');
	const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
	const [addPaymentModalOpen, setAddPaymentModalOpen] = useState(false);
	const paymentCollRef = collection(db, 'payments');
	const clientCollRef = collection(db, 'clients');

	useEffect(() => {
		getPayments();
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

	const getPayments = () => {
		getDocs(paymentCollRef)
			.then((response) => {
				const res_payments = response.docs.map((doc) => ({
					data: doc.data(),
					id: doc.id,
				}));
				setPayments(res_payments);
			})
			.catch((error) => console.error(error));
	};

	const handleAddPayment = (newPayment) => {
		// console.log('[newPayment]', newPayment);

		addDoc(collection(db, 'payments'), newPayment)
			.then(() => {
				console.log('New payment added!');
			})
			.catch((error) => {
				alert(error.message);
			});
		getPayments();
	};

	const handleAddPaymentModalOpen = () => {
		setAddPaymentModalOpen(true);
	};

	const handleAddPaymentModalClose = () => {
		setAddPaymentModalOpen(false);
	};

	const handleDelete = (id) => {
		setDeleteDialogOpen(true);
		setdeleteClientId(id);
	};

	const handleDeleteDialogClose = () => {
		setDeleteDialogOpen(false);
		setdeleteClientId('');
	};

	const showDeleteAlertFn = () => {
		setShowDeleteAlert(true);
	};

	const handleDeleteConfirm = () => {
		if (deleteClientId !== '') {
			const userDoc = doc(db, 'payments', deleteClientId);
			deleteDoc(userDoc)
				.then((res) => {
					console.log('[res]', res);
					showDeleteAlertFn(true);
					getPayments();
				})
				.catch((error) => console.log(error));
		}
		setDeleteDialogOpen(false);
	};

	return (
		<div>
			<div className="trnr-payment-container">
				<div className="payment-tbl-title">
					<h1>Payments</h1>
					<button
						className="btn-add"
						onClick={handleAddPaymentModalOpen}
					>
						Add Payment
					</button>
				</div>
				<AddPaymentsModal
					clients={clients}
					open={addPaymentModalOpen}
					closeModal={handleAddPaymentModalClose}
					addPayment={handleAddPayment}
				/>
				<Dialog
					open={deleteDialogOpen}
					onClose={handleDeleteDialogClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogTitle id="alert-dialog-title">
						{'Confirm Payment Deletion'}
					</DialogTitle>
					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							Are you sure you want to delete this payment? This
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
						sx={{ minWidth: 450, maxWidth: 650 }}
						aria-label="simple table"
					>
						<TableHead>
							<TableRow>
								<TableCell>Payment Date</TableCell>
								<TableCell>Member</TableCell>
								<TableCell>Payment Amount</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{payments?.map((payment) => (
								<TableRow key={payment.id}>
									<TableCell>
										{payment.data.payment_date}
									</TableCell>
									<TableCell>
										{payment.data.client_name}
									</TableCell>
									<TableCell>
										{payment.data.payment_amount}
									</TableCell>
									<Tooltip title="Delete">
										<IconButton
											onClick={() =>
												handleDelete(payment.id)
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

export default Payments;
