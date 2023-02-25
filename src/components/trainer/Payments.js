import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import {
	Table,
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
} from '@mui/material';
import '../../main.scss';
import './Trainer.scss';
import AddPaymentsModal from './AddPaymentsModal';

const Payments = () => {
	const [clients, setClients] = useState([]);
	const [payments, setPayments] = useState([]);
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
