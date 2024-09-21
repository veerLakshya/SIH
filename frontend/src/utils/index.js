import toast from "react-hot-toast";
// import {
// 	ConfirmationResult,
// 	RecaptchaVerifier,
// 	signInWithPhoneNumber,
// } 

import { auth } from "../firebase";  // Ensure this is the correct import

export const validatePatient = (data) => {
	if (!data.Name) {
		toast.error("Name is required");
		return false;
	}
	if (!data.Age) {
		toast.error("Age is required");
		return false;
	}
	if (!data.PhoneNumber) {
		toast.error("PhoneNumber is required");
		return false;
	}
	if (!data.Gender) {
		toast.error("Gender is required");
		return false;
	}

	if (!data.AadharNumber) {
		toast.error("Aadhar Number is required");
		return false;
	}
	return true;
};

export const validateDoctor = (data) => {
	if (!data.Name) {
		toast.error("Name is required");
		return false;
	}
	if (!data.Age) {
		toast.error("Age is required");
		return false;
	}
	if (!data.PhoneNumber) {
		toast.error("PhoneNumber is required");
		return false;
	}
	if (!data.Gender) {
		toast.error("Gender is required");
		return false;
	}

	if (!data.AadharNumber) {
		toast.error("Aadhar Number is required");
		return false;
	}
	if (!data.Imrid) {
		toast.error("IMR Registration Number is required");
		return false;
	}
	return true;
};

export const dateParser = (date) => {
	const d = new Date(date);
	return d.toDateString();
};

const loginOtpVarifier = async (
	phoneNumber,
	setValidOtp
) => { };
