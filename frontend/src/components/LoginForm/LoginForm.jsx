import { useState } from "react";

const LoginForm = () => {
	const [currentForm, setCurrentForm] = useState("login");

	return (
		<div className="flex w-full h-screen justify-center items-center bg-gray-100">
			<div className="flex w-2/3 h-5/6 justify-center rounded-xl p-6 ">
				<div className="w-1/2 bg-blue-600 flex felx-col justify-center items-center">
					<h1 className="text-white font-main text-2xl font-bold">
						Welcome to Satvik
					</h1>
				</div>
				<div className="w-1/2 bg-white">
					<div className="flex justify-center items-center">
						<button
							className={`px-4 py-2 bg-blue-500 rounded-l-xl text-white font-bold ${
								currentForm == "signin"
									? "bg-blue-500"
									: "bg-slate-200"
							} `}
							onClick={() => setCurrentForm("signin")}
						>
							Sign in
						</button>

						<button
							className={`px-4 py-2 bg-slate-200 rounded-r-xl text-white font-bold ${
								currentForm == "login"
									? "bg-blue-500"
									: "bg-slate-200"
							} `}
							onClick={() => setCurrentForm("login")}
						>
							Log in
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
