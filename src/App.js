import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './main.scss';
import ClientLogin from './components/client/ClientLogin';
import RootLogin from './components/RootLogin';
import TrainerLogin from './components/trainer/TrainerLogin';
import TrainerDashboard from './components/trainer/TrainerDashboard';
import TrainerSessions from './components/trainer/TrainerSessions';
import TrainerClientsPage from './components/trainer/TrainerClientsPage';
import DietPlanCreator from './components/trainer/DietPlanCreator';
import Payments from './components/trainer/Payments';

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<RootLogin />} />
					<Route path="trainer-login" element={<TrainerLogin />} />
					<Route
						path="trainer-dashboard"
						element={<TrainerDashboard />}
					/>
					<Route
						path="trainer-sessions"
						element={<TrainerSessions />}
					/>
					<Route
						path="trainer-clients-page"
						element={<TrainerClientsPage />}
					/>
					<Route path="client-login" element={<ClientLogin />} />
					<Route
						path="diet-plan-creator"
						element={<DietPlanCreator />}
					/>
					<Route path="payments" element={<Payments />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
