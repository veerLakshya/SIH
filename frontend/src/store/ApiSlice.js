import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authActions } from "./AuthSlice";
import { userActions } from "./UserSlice";
import { useSelector } from "react-redux";
const baseQuery = fetchBaseQuery({
	baseUrl: "http://localhost:5000",
	credentials: "include",
	prepareHeaders: (headers, { getState }) => {
		const token = getState().auth.token;
		if (token) {
			headers.set("authorization", `Bearer ${token}`);
		}

		return headers;
	},
});
const baseQueryWithReAuth = async (args, api, extraOptions) => {
	let result = await baseQuery(args, api, extraOptions);
	// console.log(result)
	const isDoctor = localStorage.getItem('isDoctor')
	let url = "";
	if (isDoctor === "true") {
		url = "/api/v1/users/RefreshTokenDoctor";
	} else {
		url = "/api/v1/users/RefreshTokenPatient";
	}

	if (result?.error?.originalStatus === 401) {
		console.log(url);
		const refreshResult = await baseQuery(url, api, extraOptions);
		console.log(refreshResult)
		if (refreshResult?.data) {

			api.dispatch(
				authActions.setCredentials({
					AccessToken: refreshResult.data.data.AccessToken,
				})
			);
			api.dispatch(
				userActions.AddUser({ curruser: refreshResult.data.data.currUser })
			);
			result = await baseQuery(args, api, extraOptions);
		} else {
			api.dispatch(authActions.logout());
			api.dispatch(userActions.Logout());
		}
	}
	return result;
};
export const apiSlice = createApi({
	baseQuery: baseQueryWithReAuth,
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (body) => ({
				url: "/api/v1/users/login",
				method: "POST",
				body,
			}),
		}),
		Patinetsignup: builder.mutation({
			query: (body) => ({
				url: "/api/v1/users/registerPatient",
				method: "POST",
				body,
			}),
		}),

		refreshAccessTokenPatient: builder.query({
			query: () => ({
				url: "/api/v1/users/RefreshTokenPatient",
				method: "GET",
			}),
		}),
		refreshAccessTokenDoctor: builder.query({
			query: () => ({
				url: "/api/v1/users/RefreshTokenDoctor",
				method: "GET",
			}),
		}),
		logoutPatient: builder.query({
			query: () => ({
				url: "/api/v1/users/logoutPatient",
				method: "GET",
			}),
		}),
		logoutDoctor: builder.query({
			query: () => ({
				url: "/api/v1/users/logoutDoctor",
				method: "GET",
			}),
		}),
		getPatientDetails: builder.query({
			query: () => ({
				url: "/api/v1/treatment/getPatientDetails",
				method: "GET",
				credentials: "include",
			}),
		}),

		createTreatment: builder.mutation({
			query: (data) => ({
				url: '/api/v1/treatment/createTreatment',
				method: "POST",
				credentials: "include",
				body: data
			})
		}),
		addReports: builder.mutation({
			query: (data) => ({
				url: '/api/v1/treatment/addReport',
				method: "POST",
				credentials: "include",
				body: data,

			}),

		}),
		getTreatment: builder.query({
			query: ({ TreatmentId }) => ({
				url: `/api/v1/treatment/getTreatmentDetails/${TreatmentId}`,
				method: "GET",
				credentials: "include",
			}),
		}),
	}),
});
export const { useLoginMutation, usePatinetsignupMutation, useCreateTreatmentMutation, useAddReportsMutation, useGetTreatmentQuery } = apiSlice;
