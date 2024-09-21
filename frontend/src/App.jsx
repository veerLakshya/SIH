import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import _Home from "./pages/_Home";

import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Navbar from "./components/NavBar";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import LanguagePopup from "./components/LanguagePopup";
import Footer from "./components/Footer/Footer";
import Otp from "./pages/Auth/Otp";
import { Toaster } from "react-hot-toast";
import ProtectRoute from "./components/ProtectRoute/ProtectRoute";
import { useSelector } from "react-redux";
import { useState } from "react";
import useInitialAuth from "./hooks/useInitialAuth";
import DashboardPagePatient from "./pages/DashboardPagePatient";
import DashboardPageDoctor from "./pages/DashboardPageDoctor";
import { Navigate } from "react-router-dom";
import usePatient from "./hooks/usePatienth";
import TreatmentHistory from "./pages/TreatmentHistory";
function App() {
	const [isloading, setloading] = useState(true);
	useInitialAuth(setloading);
	const token = useSelector((store) => store.auth.token);
	const user = useSelector((store) => store.currUser.user);
	usePatient();
	console.log(token);
	console.log(user);
	if (isloading) {
		return <></>;
	}
	return (
		<>
			<Router>
				<Navbar />

				<Routes>
					<Route element={<ProtectRoute token={token} />}>
						<Route
							path="/"
							element={
								user && user.isDoctor ? (
									<DashboardPageDoctor />
								) : (
									<Navigate to="/patientdashboard" replace />
								)
							}
						/>
						<Route
							path="/patientdashboard"
							element={<DashboardPagePatient />}
						/>
						<Route
							path="/treatmentHistory/:patientId"
							element={
								user && user.isDoctor ? (
									<TreatmentHistory />
								) : (
									<Navigate to="/patientdashboard" replace />
								)
							}
						/>
					</Route>
					<Route
						element={
							<ProtectRoute token={!token} redirect="/home" />
						}
					>
						{" "}
						<Route path="/home" element={<_Home />} />
					</Route>
					<Route>
						<Route path="/login" element={<Login />} />
						<Route path="/signup" element={<Signup />} />
					</Route>
				</Routes>
				<Footer />
			</Router>
			<Toaster />
		</>
	);
}

export default App;
