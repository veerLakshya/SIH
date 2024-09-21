import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { validateDoctor, validatePatient } from "../../../utils/index";
import Otp from "../Otp";
import toast from "react-hot-toast";
const Signup = () => {
	const [isDoctor, setIsDoctor] = useState(false);
	const nameRef = useRef(null);
	const ageRef = useRef(null);
	const phoneNumberRef = useRef(null);
	const genderRef = useRef(null);
	const aadharRef = useRef(null);
	const imrRef = useRef(null);
	const [isValidOtp, setValidOtp] = useState(false);

	const [currentPhoneNumber, setCurrentPhoneNumber] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		console.log("clicked");
		if (isValidOtp) {
			if (!isDoctor) {
				console.log("inside doc clicked");
				const data = {
					Name: nameRef.current.value,
					Age: ageRef.current.value,
					PhoneNumber: phoneNumberRef.current.value,
					Gender: genderRef.current.value,
					AadharNumber: aadharRef.current.value,
				};
				if (validatePatient(data)) {
					try {
						axios
							.post(
								`${
									import.meta.env.VITE_BASE_URL
								}/api/v1/users/registerPatient`,
								data
							)
							.then((res) => {
								console.log(res);
								toast.success("Registered Successfully");
							})
							.catch((err) => {
								const htmlContent = err.response.data;
								const parser = new DOMParser();
								const doc = parser.parseFromString(
									htmlContent,
									"text/html"
								);
								const preTagContent =
									doc.querySelector("pre").innerHTML;
								const errorMessage = preTagContent
									.split("<br>")[0]
									.replace("Error:", "")
									.trim();
								toast.error(errorMessage);
							});
					} catch (err) {
						console.log(err);
					}
				} else return;
			} else {
				const data = {
					Name: nameRef.current.value,
					Age: ageRef.current.value,
					PhoneNumber: phoneNumberRef.current.value,
					Gender: genderRef.current.value,
					AadharNumber: aadharRef.current.value,
					Imrid: imrRef.current.value,
				};
				if (validateDoctor(data)) {
					try {
						axios
							.post(
								`${
									import.meta.env.VITE_BASE_URL
								}/api/v1/users/registerDoctor`,
								data
							)
							.then((res) => {
								console.log(res);
								toast.success("Registered Successfully");
							})
							.catch((err) => {
								const htmlContent = err.data;
								const parser = new DOMParser();
								const doc = parser.parseFromString(
									htmlContent,
									"text/html"
								);
								const preTagContent =
									doc.querySelector("pre").innerHTML;
								const errorMessage = preTagContent
									.split("<br>")[0]
									.replace("Error:", "")
									.trim();
								toast.error(errorMessage);
							});
					} catch (err) {
						console.log(err);
					}
				}
			}
		}
	};
	return (
		<div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 p-4">
			{/* Left: Form Section */}
			<div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg md:mr-8">
				<h1 className="text-3xl font-bold text-green-600 mb-6 text-center">
					Sign Up
				</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					{/* Name Input */}
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-gray-700"
						>
							Name
						</label>
						<input
							ref={nameRef}
							type="text"
							id="name"
							name="name"
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
							required
						/>
					</div>

					{/* Phone Number Input */}
					<div>
						<label
							htmlFor="phone"
							className="block text-sm font-medium text-gray-700"
						>
							Phone Number
						</label>
						<input
							value={currentPhoneNumber}
							onChange={(e) =>
								setCurrentPhoneNumber(e.target.value)
							}
							disabled={isValidOtp}
							ref={phoneNumberRef}
							type="tel"
							id="phone"
							name="phone"
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
							required
						/>
					</div>
					<Otp
						setValidOtp={setValidOtp}
						phoneNumber={currentPhoneNumber || ""}
					/>

					{/* Age Input */}
					<div>
						<label
							htmlFor="age"
							className="block text-sm font-medium text-gray-700"
						>
							Age
						</label>
						<input
							ref={ageRef}
							type="number"
							id="age"
							name="age"
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
							required
						/>
					</div>

					{/* Gender Input */}
					<div>
						<label
							htmlFor="gender"
							className="block text-sm font-medium text-gray-700"
						>
							Gender
						</label>
						<select
							ref={genderRef}
							id="gender"
							name="gender"
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
							required
						>
							<option value="">Select Gender</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
							<option value="other">Other</option>
						</select>
					</div>

					{/* Aadhar Number Input */}
					<div>
						<label
							htmlFor="aadhar"
							className="block text-sm font-medium text-gray-700"
						>
							Aadhar Number
						</label>
						<input
							ref={aadharRef}
							type="text"
							id="aadhar"
							name="aadhar"
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
							required
						/>
					</div>

					{/* Are you a doctor? */}
					<div className="flex items-center">
						<input
							checked={isDoctor}
							type="checkbox"
							id="doctor"
							name="doctor"
							className="form-checkbox h-4 w-4"
							onChange={() => setIsDoctor((prev) => !prev)}
						/>
						<label
							htmlFor="doctor"
							className="ml-2 text-sm text-gray-700"
						>
							Are you a doctor?
						</label>
					</div>

					<div className={`${isDoctor ? " block " : " hidden "}`}>
						<label
							htmlFor="imr"
							className="block text-sm font-medium text-gray-700"
						>
							IMR Registration No
						</label>
						<input
							ref={imrRef}
							type="text"
							id="imr"
							name="imr"
							className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
						/>
					</div>

					{/* Submit Button */}
					<button
						disabled={!isValidOtp}
						type="submit"
						className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
					>
						Register
					</button>
				</form>

				<Link
					to={"/login"}
					className="text-green-500 text-center mt-4 block hover:text-green-600 transition-all duration-300"
				>
					Already a user?
				</Link>
			</div>

			{/* Right: Information Section */}
			<div className="bg-green-100 p-8 rounded-lg shadow-lg w-full max-w-lg mt-8 md:mt-0">
				<div className="flex flex-col items-center space-y-4">
					{/* Government Logo */}
					<img
						src="/gov-logo.png"
						alt="Government Logo"
						className="h-20"
					/>

					<h2 className="text-xl font-semibold text-gray-800 text-center">
						Patient Medical History Portal
						<br />
						Government of India
					</h2>

					{/* Logos */}
					<div className="flex justify-center space-x-4">
						<img
							src="/institute-logo.png"
							alt="Institute Logo"
							className="h-16"
						/>
						<img
							src="/digital-india-logo.png"
							alt="Digital India Logo"
							className="h-16"
						/>
					</div>

					{/* Info Text */}
					<p className="text-center text-sm text-gray-600">
						This portal allows doctors to securely access and manage
						the medical treatment history of patients using their
						Aadhar card. Established by the Government of India in
						2024, this initiative aims to streamline healthcare
						records and ensure continuity of care across medical
						facilities.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Signup;
