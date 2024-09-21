// PhoneAuth.tsx
import { startTransition, useEffect, useState, useTransition } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"; // Adjusted import
import { auth } from "../../firebase"; // Ensure this is the correct import
import toast from "react-hot-toast";

const Otp = ({ phoneNumber, setValidOtp }) => {
	const [otpCode, setOtpCode] = useState("");
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [resendCountdown, setResendCountdown] = useState(0);
	const [otpVerified, setOtpVerified] = useState(false);
	const [isPhoneVerified, setIsPhoneVerified] = useState(false);
	const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);

	const [confirmationResult, setConfirmationResult] = useState(null);

	const [isPending, setTransition] = useTransition();

	useEffect(() => {
		setValidOtp(false);
	}, [phoneNumber]);

	const verifyOtp = async () => {
		startTransition(async () => {
			setError("");
			if (!confirmationResult) {
				setError("Please Enter OTP first");
				toast.error("Please Enter OTP first");
				return;
			}

			try {
				await confirmationResult?.confirm(otpCode);
				console.log("OTP Verified");
				setIsPhoneVerified(false);
				setOtpVerified(true);
				setValidOtp(true);
				toast.success("OTP Verified");
			} catch (err) {
				toast.error("Invalid OTP");
				console.log(err);
				setIsPhoneVerified(false);
			}
		});
	};

	useEffect(() => {
		let timer;
		if (resendCountdown > 0) {
			timer = window.setInterval(() => {
				setResendCountdown((prev) => prev - 1);
			}, 1000);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [resendCountdown]);

	useEffect(() => {
		const recaptchaVerifier = new RecaptchaVerifier(
			auth,
			"recaptcha-container",
			{
				size: "invisible",
			}
		);

		setRecaptchaVerifier(recaptchaVerifier);

		return () => {
			recaptchaVerifier.clear();
		};
	}, [auth]);

	const requestOtp = async (e) => {
		e?.preventDefault();
		const toastId = toast.loading("sending otp");
		setTransition(async () => {
			setError("");
			if (!recaptchaVerifier)
				return setError("Recaptcha verifier not found");
			try {
				const confirmationResult = await signInWithPhoneNumber(
					auth,
					phoneNumber,
					recaptchaVerifier
				);
				setResendCountdown(60);
				setConfirmationResult(confirmationResult);
				toast.dismiss(toastId);
				setIsPhoneVerified(true);
				toast.success("Otp Sent Successfully");
				setSuccess("Otp Sent Successfully");
			} catch (err) {
				toast.dismiss(toastId);
				setIsPhoneVerified(false);
				console.log(err);
				setResendCountdown(0);
				if (err.code == "auth/invalid-phone-number") {
					toast.error("Invalid phone number");
				} else if (err.code == "auth/too-many-requests") {
					toast.error("Too many requests. Try again later");
				} else {
					toast.error("Something went wrong");
				}
			}
		});
	};

	return (
		<div className="flex  flex-col  justify-center">
			<div id="recaptcha-container" />
			{!otpVerified && (
				<button
					onClick={() => requestOtp()}
					type="submit"
					disabled={!phoneNumber || isPending || resendCountdown > 0}
					className="bg-blue-500 text-white px-4 py-2 rounded"
				>
					{resendCountdown > 0
						? `Resend otp in ${resendCountdown}`
						: isPending
						? "Sending OTP"
						: "Send OTP"}
				</button>
			)}

			<div id={"receptcha-container"} />

			{isPhoneVerified && (
				<>
					<input
						type="number"
						onChange={(e) => setOtpCode(e.target.value)}
						className="mt-1 mb-3 block w-full p-2 border border-gray-300 rounded-md"
					/>
					<button
						onClick={() => {
							verifyOtp();
						}}
						type="button"
						disabled={otpCode.length !== 6}
						className="w-full disabled:bg-green-700 disabled:cursor-not-allowed bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
					>
						Submit Otp
					</button>
				</>
			)}
		</div>
	);
};

export default Otp;
