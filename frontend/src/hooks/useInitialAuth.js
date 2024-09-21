import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/AuthSlice";
import { apiSlice } from "../store/ApiSlice";
import axios from "axios";
import { userActions } from "../store/UserSlice";
const useInitialAuth = (setloading) => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.auth.token);
	const isDoctor = localStorage.getItem("isDoctor");
	// const [refreshAccessTokenDoctor] = useRefreshAccessTokenDoctorQuery();
	// const [refreshAccessTokenPatient] = useRefreshAccessTokenPatientQuery();

	console.log(isDoctor);
	// console.log(token)
	useEffect(() => {
		const refreshAccessToken = async () => {
			if (!token) {
				if (isDoctor === 'false') {
					try {
						console.log("refreshing token");
						const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/RefreshTokenPatient`, { withCredentials: true });
						console.log("result", result.data.data.currUser);
						if (result?.data) {
							dispatch(
								authActions.setCredentials({
									AccessToken: result.data.data.AccessToken,
								})
							);
							dispatch(
								userActions.AddUser({
									curruser: result.data.data.currUser,
								})
							);
							setloading(false);
						} else {
							dispatch(authActions.logout());
							setloading(false);
						}
					} catch (error) {
						setloading(false);
						console.log(error);
						dispatch(authActions.logout());
					}
				} else {
					try {
						const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/RefreshTokenDoctor`, { withCredentials: true });
						console.log("result", result.data.data.currUser);
						if (result?.data) {
							dispatch(
								authActions.setCredentials({
									AccessToken: result.data.data.AccessToken,
								})
							);
							dispatch(
								userActions.AddUser({
									curruser: result.data.data.currUser,
								})
							);
							setloading(false);
						} else {
							dispatch(authActions.logout());
							dispatch(userActions.Logout());
							setloading(false);
						}
					} catch (error) {
						setloading(false);
						dispatch(authActions.logout());
						dispatch(userActions.Logout());
					}
				}
			}
		};
		refreshAccessToken();
	}, []);
};
export default useInitialAuth;
